# What is?

This project provides two classes for building models with data stored in localstorage.

Definitions:
```ts
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

```




# Try out 

```
# clone and cd into directory

# install dependencies
npm install

# build project and load test server
npm start
```

# Basic example

```
class User extends Model {

    constructor(id?: number) {
        super(
            "User",
            [
                "firstname",
                "lastname",
                "username",
                "age",
            ],
            id
        )
    }

    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }
}

```





# To do:
[] basic ORM features
[] undo save
[x] instead of supplying an id, an id should be automatically determined
[] joins
