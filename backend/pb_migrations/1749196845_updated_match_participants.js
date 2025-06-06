/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_784575987")

  // update collection data
  unmarshal({
    "createRule": "user = @request.auth.id",
    "deleteRule": "user = @request.auth.id || match.creator = @request.auth.id",
    "listRule": "@request.auth.id != null",
    "updateRule": "user = @request.auth.id || match.creator = @request.auth.id",
    "viewRule": "@request.auth.id != null"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_784575987")

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
