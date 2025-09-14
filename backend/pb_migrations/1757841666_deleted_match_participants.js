/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_784575987");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": "user = @request.auth.id",
    "deleteRule": "user = @request.auth.id || match.creator = @request.auth.id",
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
        "collectionId": "pbc_2541054544",
        "hidden": false,
        "id": "relation2052834565",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "match",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation2375276105",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "user",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "date2745685176",
        "max": "",
        "min": "",
        "name": "joined_at",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text2063623452",
        "max": 0,
        "min": 0,
        "name": "status",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
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
    "id": "pbc_784575987",
    "indexes": [
      "CREATE UNIQUE INDEX `idx_HfQkviOxD1` ON `match_participants` (\n  `match`,\n  `user`\n)"
    ],
    "listRule": "@request.auth.id != null",
    "name": "match_participants",
    "system": false,
    "type": "base",
    "updateRule": "user = @request.auth.id || match.creator = @request.auth.id",
    "viewRule": "@request.auth.id != null"
  });

  return app.save(collection);
})
