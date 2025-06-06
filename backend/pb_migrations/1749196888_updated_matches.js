/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2541054544")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id = creator",
    "deleteRule": "@request.auth.id = creator",
    "listRule": "@request.auth.id != null",
    "updateRule": "@request.auth.id = creator",
    "viewRule": "@request.auth.id != null"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2541054544")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": null,
    "listRule": "",
    "updateRule": null,
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
