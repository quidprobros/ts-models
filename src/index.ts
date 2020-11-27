// could use store.transact to enforce types?

import $ from "jquery"

import dlv from "@paxperscientiam/dlv.ts"

import store, { set } from "store2"

import {objFilter} from "./util"

const x = document.getElementById("body");

x!.style.backgroundColor = "yellow"

//store.clearAll()

interface IStruct {
    [prop:string]: string
}

class Model {
    protected _id!: number
    private _modelStore: store.StoreAPI = store
    private _struct!: string[]
    private _namespace!: string

    constructor(namespace: string, struct: string[]) {
        this._namespace = namespace
        this._struct = struct
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
            console.log(saveData)
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
            Object.defineProperty(this, item, { get: () => cleanInputData[item], configurable: true })
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
        return this._modelStore.namespace(this._namespace).get(this._id)
    }
}


class User extends Model {
//    private userStore!: store.StoreAPI
    private originalData!: {}

    constructor(id?: number) {
        super(
            "User",
            [
                "name",
                "username",
                "age",
            ]
        )

        if (null == id) {
            throw 'id required!';
        } else {
            this._id = id
        }
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
