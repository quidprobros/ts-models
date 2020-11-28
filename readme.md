
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
