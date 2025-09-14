/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2123300356")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != null",
    "deleteRule": "id = @request.auth.households.id",
    "listRule": "id = @request.auth.households.id",
    "updateRule": "id = @request.auth.households.id",
    "viewRule": "id = @request.auth.households.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2123300356")

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
