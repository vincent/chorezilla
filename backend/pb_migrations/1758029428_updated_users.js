/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "listRule": "id = @request.auth.id ||  households.id = @request.auth.households.id",
    "viewRule": "id = @request.auth.id ||  households.id = @request.auth.households.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "listRule": "id = @request.auth.id ||  households = @request.auth.households.id",
    "viewRule": "id = @request.auth.id ||  households = @request.auth.households.id"
  }, collection)

  return app.save(collection)
})
