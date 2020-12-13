// could use store.transact to enforce types?
import dlv from "@paxperscientiam/dlv.ts";
import store from "store2";
import { objFilter, registry } from "./util";
export class Model {
    constructor(namespace, struct, id) {
        this._modelStore = store;
        this._namespace = namespace;
        this._struct = struct;
        if (null == id) {
            this._id = registry.getUniq(this._namespace + "_registry");
            this.updateRegistry();
        }
        else {
            this._id = id;
        }
    }
    updateRegistry() {
        if (Number.isInteger(this._id * 1)) {
            registry.push(this._id, this._namespace + "_registry");
        }
    }
    save(data, overwrite = false) {
        const cleanInputData = objFilter(this._struct, data);
        let currentData;
        let saveData;
        if ("" !== this._namespace) {
            currentData = this._modelStore.namespace(this._namespace).get(this._id);
            if (true != overwrite) {
                saveData = Object.assign(Object.assign({ id: this._id }, currentData), cleanInputData);
            }
            else {
                saveData = cleanInputData;
            }
            this._modelStore.namespace(this._namespace).set(this._id, saveData);
        }
        else {
            currentData = this._modelStore.get(this._id);
            if (overwrite) {
                saveData = Object.assign(Object.assign({ id: this._id }, currentData), cleanInputData);
            }
            else {
                saveData = cleanInputData;
            }
            this._modelStore.set(this._id, saveData);
        }
        this._struct.forEach((item) => {
            Object.defineProperty(this, item, { get: () => cleanInputData[item], configurable: true });
        }, this);
    }
    getItem(key) {
        return dlv(this._modelStore.namespace(this._namespace).get(this._id), key);
    }
    get id() {
        return this._id;
    }
    erase() {
        this._modelStore.namespace(this._namespace).clearAll();
    }
    dump() {
        return Object.assign({}, this._modelStore.namespace(this._namespace).get(this._id));
    }
}
export class Collection {
    constructor(namespace) {
        this._modelStore = store;
        this._namespace = namespace;
    }
    total() {
        const registry = this._modelStore.namespace(this._namespace + "_registry").get("registry");
        if (null == registry) {
            return 0;
        }
        return (registry.filter((item) => {
            if (Number.isFinite(item) && item !== 0) {
                return true;
            }
            return false;
        }).length);
    }
}
