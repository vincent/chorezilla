/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3554030554")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.id != null"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3554030554")

  // update collection data
  unmarshal({
    "createRule": "id = @request.auth.households.id"
  }, collection)

  return app.save(collection)
})
