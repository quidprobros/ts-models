// could use store.transact to enforce types?

import dlv from "@paxperscientiam/dlv.ts"

import store from "store2"

import {objFilter, registry} from "./util"

interface IStruct {
    [prop:string]: string
}



class Model {
    protected _id!: number
    private _modelStore: store.StoreAPI = store
    private _struct!: string[]
    private _namespace!: string

    constructor(namespace: string, struct: string[], id?: number) {
        this._namespace = namespace
        this._struct = struct

        if (null == id) {
            this._id = registry.getUniq(this._namespace)
            this.updateRegistry()
        } else {
            this._id = id
        }
    }

    private updateRegistry() {
        registry.push(this._id, this._namespace)
    }

    save(data: IStruct, overwrite: boolean = false) {
        const cleanInputData = objFilter(this._struct, data)
        let currentData
        let saveData
        if ("" !== this._namespace) {
            currentData = this._modelStore.namespace(this._namespace).get(this._id)
            if (true != overwrite) {
                saveData = {
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
            id: this._id, 
            ...this._modelStore.namespace(this._namespace).get(this._id)
        }
    }
}


class User extends Model {

    constructor(id?: number) {
        super(
            "User",
            [
                "firstname",
                "lastname",
                "username",
                "age",
            ],
            id
        )
    }

    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }
}

// class User_collection extends Collection {
//     constructor() {
//         super()
//     }

// }



globalThis.Model = Model
globalThis.store = store


globalThis.User = User
