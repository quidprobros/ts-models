interface LooseObject {
    namespace: string
    [key: string]: any
    data: any
}

export class GenericModel implements LooseObject {
    namespace: string = "GenericNamespace"

    constructor() {

    }

    set(val: any, path: string) {
//        window.localStorage.setItem(this.namespace, )
    }

    fetch(prop: string) {

    }
}
