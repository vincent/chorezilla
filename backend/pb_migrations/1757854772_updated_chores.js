/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1145403802")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != null",
    "deleteRule": "household.id = @request.auth.households.id",
    "listRule": "household.id = @request.auth.households.id",
    "updateRule": "household.id = @request.auth.households.id",
    "viewRule": "household.id = @request.auth.households.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1145403802")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
