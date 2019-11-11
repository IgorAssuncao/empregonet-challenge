### Run this inside a mongo container
config = { "_id": "${mongo-set-name}", "members": [ {"_id": 0, "host": "${mongo-container-name}"} ] }

rs.initiate(config)

###### Remember that `member` is an array of objects that should contain an object with an `_id` and a `host` for each mongo instance running
