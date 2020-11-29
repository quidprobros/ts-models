"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
class User extends index_1.Model {
    constructor(id) {
        super("User", [
            "firstname",
            "lastname",
            "username",
            "age",
        ], id);
    }
    get fullname() {
        return `${this.firstname} ${this.lastname}`;
    }
}
class UserCollection extends index_1.Collection {
    constructor() {
        super("User");
    }
}
// class User_collection extends Collection {
//     constructor() {
//         super()
//     }
// }
globalThis.Model = index_1.Model;
globalThis.store = store;
globalThis.User = User;
globalThis.UserCollection = UserCollection;
