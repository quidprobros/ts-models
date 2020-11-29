"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registry = exports.objFilter = void 0;
const store2_1 = __importDefault(require("store2"));
// https://stackoverflow.com/a/58042070
function objFilter(arrFilter, data) {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => arrFilter.includes(key)));
}
exports.objFilter = objFilter;
exports.registry = {
    getUniq(namespace) {
        let registry = store2_1.default.namespace(namespace).get("registry");
        if (false === Array.isArray(registry)) {
            if (Number.isInteger(registry * 1)) {
                registry = [registry];
            }
            else {
                registry = [];
            }
        }
        return Math.max(...registry) + 1;
    },
    push(input, namespace) {
        let registry = store2_1.default.namespace(namespace).get("registry");
        if (false === Array.isArray(registry)) {
            if (Number.isInteger(registry * 1)) {
                registry = [registry];
            }
            else {
                registry = [];
            }
        }
        registry.push(input);
        store2_1.default.namespace(namespace).set("registry", registry);
    },
};
