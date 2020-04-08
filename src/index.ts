import objectPath from "object-path"
// @ts-ignore
import dset from "dset"

import { LocalStorage } from "node-localstorage";
const localStorage = new LocalStorage('./scratch')
// storage
// model

// here's where i set different storage media

export function push(referencePropComplex: string[], value: any) {
    const reference = referencePropComplex[0]
    const property = referencePropComplex[1]

    // @ts-ignore Localstorage node
    let obj = JSON.parse(localStorage.getItem(reference))
    // google
    //   let obj = JSON.parse(Application.userProperties.getProperty(reference))
    if (obj == null) {
        obj = {}
    }
    if (!!property) {
        dset(obj, property, value)
    } else {
        obj = value
    }
    // @ts-ignore
    localStorage.setItem(reference, JSON.stringify(obj))
    // google
    // Application.userProperties.setProperty(reference, JSON.stringify(obj))
}

export function fetch(reference: string, property?: any) {
    // @ts-ignore
    // let obj = JSON.parse(Application.userProperties.getProperty(reference))
    let obj = JSON.parse(localStorage.getItem(reference))
    if (obj == null) {
        obj = {}
        localStorage.setItem(reference, "{}")
        //  Application.userProperties.setProperty(reference, "{}")
        return null
    }
    if (property == null) {
        return obj
    }
    return objectPath.withInheritedProps.get(obj, property)
}

push(["Application", "a.b"], 69)
push(["Application", "a.c"], 69)

console.log(fetch("Application"))
