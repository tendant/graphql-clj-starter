(ns graphql-clj-starter.graphql
  (:require [graphql-clj.parser :as parser]
            [graphql-clj.type :as type]
            [graphql-clj.resolver :as resolver]
            [graphql-clj.executor :as executor]
            [graphql-clj.introspection :as introspection]
            [clojure.core.match :as match]))

(def starter-schema "
enum Episode { NEWHOPE, EMPIRE, JEDI }

interface Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
}

type Human : Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  homePlanet: String
}

type Droid : Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  primaryFunction: String
}

type Query {
  hero(episode: Episode): Character
  human(id: String!): Human
  droid(id: String!): Droid
}
")

(def starter-resolver-fn nil)

(def parsed-schema (parser/parse starter-schema))

(def introspection-schema (parser/parse introspection/introspection-schema))

(defn execute
  [query variables]
  (let  [type-schema (type/create-schema parsed-schema introspection-schema)
         context nil]
    (executor/execute context type-schema starter-resolver-fn query variables)))
