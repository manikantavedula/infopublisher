import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
// import other reducers as needed

const rootReducer = combineReducers({
  form: formReducer,
  // add other reducers here
});

export default rootReducer;
