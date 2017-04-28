This project is a Demo project for [graphql-clj](https://github.com/tendant/graphql-clj) and [GraphiQL](https://github.com/graphql/graphiql). You can start trying Clojure with GraphQL in a few minutes.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Start server

    lein ring server-headless

### Access graphiql from

    http://localhost:3002/index.html

#### Sample queries

```
query {
  human (id:"1002") {
    id
    name
    friends {
      id
      name
      friends {
        id
      }
    }
  }
}
```

#### Sample mutations

```
mutation{
  createHuman (name:"testname", friends:[]) {
    id
  }
}
```

### Build Application (HTML & JS)

_Note: Not required, unless you want to make changes to Javascript code_

    npm install

    npm run build

