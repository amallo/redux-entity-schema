import { createStore } from 'redux'
import rootReducer from "./entities"
const initialState = {
    entities: {}
}
const store = createStore(rootReducer, initialState)
export default store