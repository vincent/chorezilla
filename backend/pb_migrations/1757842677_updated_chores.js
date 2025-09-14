/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1145403802")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation3490420651",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "assigned_users",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation1319357245",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "approved_by",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "date457172035",
    "max": "",
    "min": "",
    "name": "approved_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1145403802")

  // remove field
  collection.fields.removeById("relation3490420651")

  // remove field
  collection.fields.removeById("relation1319357245")

  // remove field
  collection.fields.removeById("date457172035")

  return app.save(collection)
})
