(defproject graphql-clj-starter "0.1.0-SNAPSHOT"
  :description "graphql-clj starter project"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [compojure "1.5.0"]
                 [ring "1.5.0"]
                 [ring/ring-defaults "0.2.1"]
                 [ring/ring-json "0.4.0"]
                 [ring-cors "0.1.8"]
                 [graphql-clj "0.2.5"]]
  :main ^:skip-aot graphql-clj-starter.core
  :target-path "target/%s"
  :resource-paths ["build"]
  :profiles {:uberjar {:aot :all}
             :dev {; :ring {:stacktrace-middleware prone.middleware/wrap-exceptions}  ; http://localhost:3000/prone/latest
                   :resource-paths ["build"]
                   :dependencies [[prone "1.1.1"]]}}
  :plugins [[lein-ring "0.9.7"]]
  :ring {:handler graphql-clj-starter.handler/app
         :auto-reload? true
         :port 3002})
