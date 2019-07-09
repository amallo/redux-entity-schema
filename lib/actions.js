function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createEntityActions(schema) {
  const addEntityType = "ADD_" + schema.key.toUpperCase() + "_ENTITY";
  const Types = {
    [addEntityType]: addEntityType
  };
  const Creators = {
    ["add" + capitalizeFirstLetter(schema.key) + "Entity"]: payload => {
      return {
        type: addEntityType,
        payload
      };
    }
  };
  return { Creators, Types };
}
