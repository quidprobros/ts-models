import {fetch, push as pushy} from "./txn"

interface LooseObject {
    namespace: string
    [key: string]: any
    data: any
}

export class GenericModel implements LooseObject {
    namespace: string = "GenericNamespace"
    handler: ProxyHandler<object>
    proxy: any  //ProxyConstructor

    constructor() {
        this.handler = {
            get: function(obj: any, prop: string) {
                return prop in obj ?
                    obj[prop] :
                    37;
            }
        }
        this.proxy = new Proxy({}, this.handler)
    }

    set(val: any, path: string) {
        pushy([this.namespace, path], val)

    }

    fetch(prop: string) {
        return this.proxy[prop]
    }

    // get get(path: string) {
    //     return fetch(this.namespace, "application.input.user_address_key")
    // }

    data(){}

    // set data(args: [string, any]) {
    //     pushy([this.namespace, args[0]], args[1])
    // }

    // get dump() {
    //     return fetch(this.namespace)
    // }
}
