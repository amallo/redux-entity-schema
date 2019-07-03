# add entity
```Javascript

import {createEntityReducer, addEntity, createSchema} from "redux-entity"

const ProgramSchema = createSchema({
})
const programReducer =  createEntityReducer(ProgramSchema)(initialState)
addEntity(ProgramSchema)({
  id: 'PROG_1',
  title: 'this is a program,
})
```

# chain reducers
```Javascript

import {createEntityReducer,  chainReducers} from "redux-entity"

const initialState = {
  byId: {},
  allIds: {}
  byDate: {},
  byTitle: {}
}
const byDateProgram = (nextReducer) => (state, action){
  
}
const byTitleProgram = (nextReducer) => (state, action){
  
}
const programReducer =  createEntityReducer(ProgramSchema)(initialState)

export default chainReducers(byDateProgram, byTitleProgram, programReducer)
```
