# add entity
```Javascript

import {createEntityReducer, addEntity, entitiesState} from "redux-entity"

const programReducer =  createEntityReducer(ProgramSchema)(initialState)
const programSelectors = createEntitySelector(ProgramSchema)(entitiesState)
addEntity(ProgramSchema, {validate: true})({
  id: 'PROG_1',
  title: 'this is a program,
})
```
