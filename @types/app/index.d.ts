declare class Model {
    constructor(namespace: string, struct: string[], id?: number)
    protected _id: number
    private _modelStore: any
    private _struct: string[]
    private _namespace: string
    
    private updateRegistry(): void

    id: number // getter

    save(a: any, overwrite: boolean): void

    erase(): void
    dump(): any
}
