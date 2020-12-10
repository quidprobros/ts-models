import { Collection, Model } from "./index";
import store from "store2";
declare class User extends Model {
    firstname: string;
    lastname: string;
    constructor(id?: number);
    get fullname(): string;
}
declare class UserCollection extends Collection {
    constructor();
}
declare global {
    interface Window {
        User: new () => User;
        UserCollection: new () => UserCollection;
        store: store.StoreAPI;
    }
}
export {};
