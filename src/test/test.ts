import {Collection, Model} from "../index"
import store from "store2"

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

class UserCollection extends Collection {
    constructor() {
        super("User")
    }
}

globalThis.User = User
globalThis.UserCollection = UserCollection
globalThis.store = store
