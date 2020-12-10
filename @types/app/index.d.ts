interface IStruct {
    [prop: string]: string;
}
export declare class Model {
    protected _id: number;
    private _modelStore;
    private _struct;
    private _namespace;
    constructor(namespace: string, struct: string[], id?: number);
    private updateRegistry;
    save(data: IStruct, overwrite?: boolean): void;
    getItem(key: string): any;
    get id(): number;
    erase(): void;
    dump(): any;
}
export declare class Collection {
    private _modelStore;
    private _namespace;
    constructor(namespace: string);
    total(): number;
}
export {};
