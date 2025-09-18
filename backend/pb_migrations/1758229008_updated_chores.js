/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1145403802")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date1436569724",
    "max": "",
    "min": "",
    "name": "starts_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1145403802")

  // remove field
  collection.fields.removeById("date1436569724")

  return app.save(collection)
})
