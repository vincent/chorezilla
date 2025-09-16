/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3554030554")

  // update collection data
  unmarshal({
    "listRule": "household = @request.auth.households.id || household.household_members_via_household.user = @request.auth.households.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3554030554")

  // update collection data
  unmarshal({
    "listRule": "household = @request.auth.households.id"
  }, collection)

  return app.save(collection)
})
