import objectPath from "object-path"

// @ts-ignore
import dset from "dset"

export function push(referencePropComplex: string[], value: any) {
    const reference = referencePropComplex[0]
    const property = referencePropComplex[1]

    // @ts-ignore
    let obj = {}
 //   let obj = JSON.parse(Application.userProperties.getProperty(reference))
    if (obj == null) {
        obj = {}
    }
    if (!!property) {
        dset(obj, property, value)
    } else {
        obj = value
    }
   // Application.userProperties.setProperty(reference, JSON.stringify(obj))
}

export function fetch(reference: string, property?: any) {
    // @ts-ignore
    let obj = JSON.parse(Application.userProperties.getProperty(reference))
    if (obj == null) {
        obj = {}
      //  Application.userProperties.setProperty(reference, "{}")
        return null
    }
    if (property == null) {
        return obj
    }
    return objectPath.withInheritedProps.get(obj, property)
}
