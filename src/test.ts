import {Collection, Model} from "./index"
import store from "store2"


class User extends Model {
    firstname!: string
    lastname!: string

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

    get fullname(): string {
        return `${this.firstname} ${this.lastname}`
    }
}

class UserCollection extends Collection {
    constructor() {
        super("User")
    }
}

declare global {
    interface Window {
        User: new () => User
        UserCollection: new () => UserCollection
        store: store.StoreAPI
    }
}

window.User = User
window.UserCollection = UserCollection
window.store = store
