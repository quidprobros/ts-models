// could use store.transact to enforce types?

import dlv from "@paxperscientiam/dlv.ts"

import store from "store2"
 
import {objFilter, registry} from "./util"

interface IStruct {
    [prop:string]: string
}

export class Model<Model> {
    protected _id!: number
    private _modelStore: store.StoreAPI = store
    private _struct!: string[]
    private _namespace!: string

    constructor(namespace: string, struct: string[], id?: number) {
        this._namespace = namespace
        this._struct = struct

        if (null == id) {
            this._id = registry.getUniq(this._namespace + "_registry")
            this.updateRegistry()
        } else {
            this._id = id
        }
    }

    private updateRegistry() {
        if (Number.isInteger(this._id * 1)) {
            registry.push(this._id, this._namespace + "_registry")
        }
    }

    save(data: IStruct, overwrite: boolean = false) {
        const cleanInputData = objFilter(this._struct, data)
        let currentData
        let saveData
        if ("" !== this._namespace) {
            currentData = this._modelStore.namespace(this._namespace).get(this._id)
            if (true != overwrite) {
                saveData = {
                    id: this._id,
                    ...currentData,
                    ...cleanInputData,
                }
            } else {
                saveData = cleanInputData
            }
            this._modelStore.namespace(this._namespace).set(this._id, saveData)
        } else {
            currentData = this._modelStore.get(this._id)
            if (overwrite) {
                saveData = {
                    id: this._id,
                    ...currentData,
                    ...cleanInputData,
                }
            } else {
                saveData = cleanInputData
            }
            this._modelStore.set(this._id, saveData)
        }

        this._struct.forEach((item: string) => {
            Object.defineProperty(this, item, { get: () => cleanInputData[item], configurable: true})
        }, this)

    }

    getItem(key:string) {
        return dlv(this._modelStore.namespace(this._namespace).get(this._id), key)
    }

    get id() {
        return this._id
    }

    erase() {
        this._modelStore.namespace(this._namespace).clearAll()
    }

    dump() {
        return {
            ...this._modelStore.namespace(this._namespace).get(this._id)
        }
    }
}

export class Collection {
    private _modelStore: store.StoreAPI = store
    private _namespace!: string

    constructor(namespace: string) {
        this._namespace = namespace
    }

    total(): number {
        const registry: any[] = this._modelStore.namespace(this._namespace + "_registry").get("registry")
        if (null == registry) {
            return 0
        }
        return ((registry.filter((item) => {
            if (Number.isFinite(item) && item !== 0) {
                return true
            } 
            return false
        }) as any[]).length)
    }
}

