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

# compose reducers
```Javascript

import {createEntityReducer,  composeReducer} from "redux-entity"

const byDateProgram = (nextReducer) => (state, action){
  
}
const byTitleProgram = (nextReducer) => (state, action){
  
}
const programReducer =  createEntityReducer(ProgramSchema)(initialState)

export default composeReducer(byDateProgram, byTitleProgram)(programReducer)
```
