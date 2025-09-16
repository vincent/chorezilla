/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3554030554")

  // update collection data
  unmarshal({
    "deleteRule": "household = @request.auth.households.id",
    "listRule": "household = @request.auth.households.id",
    "updateRule": "household = @request.auth.households.id",
    "viewRule": "household = @request.auth.households.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3554030554")

  // update collection data
  unmarshal({
    "deleteRule": "id = @request.auth.households.id",
    "listRule": "id = @request.auth.households.id",
    "updateRule": "id = @request.auth.households.id",
    "viewRule": "id = @request.auth.households.id"
  }, collection)

  return app.save(collection)
})
