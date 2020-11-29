"use strict";
// could use store.transact to enforce types?
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = exports.Model = void 0;
const dlv_ts_1 = __importDefault(require("@paxperscientiam/dlv.ts"));
const store2_1 = __importDefault(require("store2"));
const util_1 = require("@app/util");
class Model {
    constructor(namespace, struct, id) {
        this._modelStore = store2_1.default;
        this._namespace = namespace;
        this._struct = struct;
        if (null == id) {
            this._id = util_1.registry.getUniq(this._namespace + "_registry");
            this.updateRegistry();
        }
        else {
            this._id = id;
        }
    }
    updateRegistry() {
        if (Number.isInteger(this._id * 1)) {
            console.log(this._id);
            util_1.registry.push(this._id, this._namespace + "_registry");
        }
    }
    save(data, overwrite = false) {
        const cleanInputData = util_1.objFilter(this._struct, data);
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
        return dlv_ts_1.default(this._modelStore.namespace(this._namespace).get(this._id), key);
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
exports.Model = Model;
class Collection {
    constructor(namespace) {
        this._modelStore = store2_1.default;
        this._namespace = namespace;
    }
    total() {
        const registry = this._modelStore.namespace(this._namespace + "_registry").get("registry");
        return registry.filter((item) => {
            if (Number.isFinite(item) && item !== 0) {
                return true;
            }
            return false;
        }).length;
    }
}
exports.Collection = Collection;
