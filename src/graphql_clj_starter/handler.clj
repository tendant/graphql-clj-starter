(ns graphql-clj-starter.handler
  (:require [compojure.core :refer [GET POST defroutes]]
            [compojure.route :as route]
            [ring.util.response :as response :refer [redirect]]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.middleware.json :refer [wrap-json-params]]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.defaults :refer :all]
            [cheshire.core :as json]
            [graphql-clj-starter.graphql :as graphql]))

(defroutes routes
  (GET "/" [] (redirect "index.html"))
  (GET "/graphql" [schema query variables :as request]
       (println "GET query: " query)
       (response/response
        (graphql/execute query variables)))
  (POST "/graphql" [schema query variables :as request]
        (println "POST query: " query)
        ;; (println "Post variables: " (json/parse-string variables))
        (response/response
         (try
           (graphql/execute query (json/parse-string variables))
           (catch Throwable e
             (println e)))))
  (route/resources "/" {:root ""})
  (route/not-found "<h1>Page not found</h1>"))

(def app
  (-> routes
      wrap-json-response
      (wrap-cors :access-control-allow-origin [#"http://localhost:8080" #"http://.*"]
                 :access-control-allow-methods [:get :put :post :delete])
      (wrap-defaults api-defaults)
      (wrap-json-params)))


