/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1145403802")

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "date3232428699",
    "max": "",
    "min": "",
    "name": "last_notified_push",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1145403802")

  // remove field
  collection.fields.removeById("date3232428699")

  return app.save(collection)
})
