(ns graphql-clj-starter.graphql
  (:require [graphql-clj.parser :as parser]
            [graphql-clj.type :as type]
            [graphql-clj.resolver :as resolver]
            [graphql-clj.executor :as executor]
            [graphql-clj.introspection :as introspection]
            [clojure.core.match :as match]))

(def starter-schema "enum Episode { NEWHOPE, EMPIRE, JEDI }

interface Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
}

type Human implements Character {
  id: String!
  name: String
  friends: [Character]
  appearsIn: [Episode]
  homePlanet: String
}

type Droid implements Character {
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

(def luke {:id "1000",
           :name "Luke Skywalker"
           :friends ["1002" "1003" "2000" "2001" ]
           :appearsIn [ 4, 5, 6 ],
           :homePlanet "Tatooine"})

(def vader {:id "1001",
            :name "Darth Vader"
            :friends [ "1004" ]
            :appearsIn [ 4, 5, 6 ]
            :homePlanet "Tatooine"})

(def han {
          :id "1002",
          :name "Han Solo",
          :friends [ "1000", "1003", "2001" ],
          :appearsIn [ 4, 5, 6 ],
})

(def leia {
           :id "1003",
           :name "Leia Organa",
           :friends [ "1000", "1002", "2000", "2001" ],
           :appearsIn [ 4, 5, 6 ],
           :homePlanet "Alderaan",
})

(def tarkin {
             :id "1004",
             :name "Wilhuff Tarkin",
             :friends [ "1001" ],
             :appearsIn [ 4 ],
             })

(def humanData  {
                 "1000" luke
                 "1001" vader
                 "1002" han
                 "1003" leia
                 "1004" tarkin
                 })

(def threepio {
               :id "2000",
               :name "C-3PO",
               :friends [ "1000", "1002", "1003", "2001" ],
               :appearsIn [ 4, 5, 6 ],
               :primaryFunction "Protocol",
               })

(def artoo {
            :id "2001",
            :name "R2-D2",
            :friends [ "1000", "1002", "1003" ],
            :appearsIn [ 4, 5, 6 ],
            :primaryFunction "Astromech",
            })

(def droidData {"2000" threepio
                "2001" artoo})

(defn get-character [id]
  (or (get humanData id) ; BUG: String should be parsed as string instead of int
      (get droidData id)))

(defn get-friends [character]
  (map get-character (:friends character)))

(defn get-hero [episode]
  (if (= episode 5)
    luke
    artoo))

(defn get-human [id]
  (get humanData (str id))) ; BUG: String should be parsed as string instead of int

(defn get-droid [id]
  (get droidData (str id))) ; BUG: String should be parsed as string instead of int

(defn starter-resolver-fn [type-name field-name]
  (match/match
   [type-name field-name]
   ["Query" "hero"] (fn [context parent & rest]
                      (let [args (first rest)]
                        (get-hero (:episode args))))
   ["Query" "human"] (fn [context parent & rest]
                       (let [args (first rest)]
                         (get-human (str (get args "id")))))
   ["Query" "droid"] (fn [context parent & rest]
                       (let [args (first rest)]
                         (get-droid (str (get args "id")))))
   ;; Hacky!!! Should use resolver for interface
   ["Human" "friends"] (fn [context parent & rest]
                         (get-friends parent))
   ["Droid" "friends"] (fn [context parent & rest]
                         (get-friends parent))
   ["Character" "friends"] (fn [context parent & rest]
                             (get-friends parent))
   :else nil))

(def parsed-schema (parser/parse starter-schema))

(def introspection-schema (parser/parse introspection/introspection-schema))

(defn execute
  [query variables]
  (let  [type-schema (type/create-schema parsed-schema introspection-schema)
         context nil]
    (executor/execute context type-schema starter-resolver-fn query variables)))
