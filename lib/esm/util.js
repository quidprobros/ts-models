import store from "store2";
// https://stackoverflow.com/a/58042070
export function objFilter(arrFilter, data) {
    return Object.fromEntries(Object.entries(data).filter(([key, value]) => arrFilter.includes(key)));
}
export const registry = {
    getUniq(namespace) {
        let registry = store.namespace(namespace).get("registry");
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
        let registry = store.namespace(namespace).get("registry");
        if (false === Array.isArray(registry)) {
            if (Number.isInteger(registry * 1)) {
                registry = [registry];
            }
            else {
                registry = [];
            }
        }
        registry.push(input);
        store.namespace(namespace).set("registry", registry);
    },
};
