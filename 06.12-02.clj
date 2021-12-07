(def input "3,1,4,2,1,1,1,1,1,1,1,4,1,4,1,2,1,1,2,1,3,4,5,1,1,4,1,3,3,1,1,1,1,3,3,1,3,3,1,5,5,1,1,3,1,1,2,1,1,1,3,1,4,3,2,1,4,3,3,1,1,1,1,5,1,4,1,1,1,4,1,4,4,1,5,1,1,4,5,1,1,2,1,1,1,4,1,2,1,1,1,1,1,1,5,1,3,1,1,4,4,1,1,5,1,2,1,1,1,1,5,1,3,1,1,1,2,2,1,4,1,3,1,4,1,2,1,1,1,1,1,3,2,5,4,4,1,3,2,1,4,1,3,1,1,1,2,1,1,5,1,2,1,1,1,2,1,4,3,1,1,1,4,1,1,1,1,1,2,2,1,1,5,1,1,3,1,2,5,5,1,4,1,1,1,1,1,2,1,1,1,1,4,5,1,1,1,1,1,1,1,1,1,3,4,4,1,1,4,1,3,4,1,5,4,2,5,1,2,1,1,1,1,1,1,4,3,2,1,1,3,2,5,2,5,5,1,3,1,2,1,1,1,1,1,1,1,1,1,3,1,1,1,3,1,4,1,4,2,1,3,4,1,1,1,2,3,1,1,1,4,1,2,5,1,2,1,5,1,1,2,1,2,1,1,1,1,4,3,4,1,5,5,4,1,1,5,2,1,3")
(def iterations 256)

(def parsed-input (apply vector-of :int ((comp (partial map #(Integer/parseInt %)) (partial re-seq #"\d+")) input)))

(def states (apply (partial vector-of :int) (repeat 9 0)))

(def initial-state
    (reduce
        (fn [acc fish]
            (assoc acc fish (+ (acc fish) 1)))
        states
        parsed-input))

(def indices (take 9 (iterate (partial + 1) 0)))

(def final-state (loop
    [state initial-state
     generation iterations]
    (if (= generation 0)
        state
        (recur
            (map
                #(if
                    (= % 8)
                    (nth state 0)
                    (if
                        (= % 6)
                        (+ (nth state 0) (nth state 7))
                        (nth state (+ % 1))))
                indices)
            (- generation 1)))))

(def final-fish (apply + final-state))

(printf "There are %d lantern fish after %d days" final-fish iterations)
