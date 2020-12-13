![Travis (.org)](https://img.shields.io/travis/paxperscientiam/ts-models?style=for-the-badge)

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

## Create your model 
In this example I've created a model to represent a user. When instantiating the parent class (`Model`), two parameters are required: a namespace (`"User"`) and the structure of model. The `Model` limits saves (more on that later) to the properties specified in the structure parameter.

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

## Instantiation
Creating a new user would be done like this:
```ts 
const user = new User()
```
Fetching an existing user 
```ts 
const user = new User(userID) // userID: number
```
## Saving (to localstorage)
Setting properties would be done like this:
```ts 
user.save([
    firstname: 'Isaac',
    lastname: 'Asimov',
    username: 'asimov1969',
    age: 33
])
```
The id of this new user instance can be accessed like this:
```ts 
user.id // => some integer 
```




# To do:
[] expand ORM features
[] undo save
[x] instead of supplying an id, an id should be automatically determined
[] joins
