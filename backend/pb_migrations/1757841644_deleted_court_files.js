/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_50713717");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_2585276769",
        "hidden": false,
        "id": "relation1672354111",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "court",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "file2359244304",
        "maxSelect": 1,
        "maxSize": 0,
        "mimeTypes": [
          "image/png"
        ],
        "name": "file",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": [
          "100x100",
          "500x500"
        ],
        "type": "file"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_50713717",
    "indexes": [],
    "listRule": null,
    "name": "court_files",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
})
