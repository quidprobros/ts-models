import store from "store2"

// https://stackoverflow.com/a/58042070
export function objFilter(arrFilter: any[], data) {
    return Object.fromEntries(Object.entries(data).filter(([key, value])=> arrFilter.includes(key)))
}

export const registry = {
    getUniq(namespace: string) {
        let registry = store.namespace(namespace).get("registry")
        if (false === Array.isArray(registry)) {
            registry = [registry]
        }
        return Math.max(...registry) + 1
    },
    push(input: any, namespace: string) {
        let registry = store.namespace(namespace).get("registry")
        if (false === Array.isArray(registry)) {
            registry = [registry]
        }
        registry.push(input)
        store.namespace(namespace).set("registry", registry)
    },
}
