# add entity
```Javascript

import {createEntityReducer, addEntity, createSchema} from "redux-entity"

const ProgramSchema = createSchema({
})
const programReducer =  createEntityReducer(ProgramSchema)(initialState)
addEntity(ProgramSchema, {validate: true})({
  id: 'PROG_1',
  title: 'this is a program,
})
```
