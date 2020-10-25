import { combineReducers } from "redux";
import { UserReducers } from "src/redux/reducers/reducer-user";

// import reducers

export const WorkoutReducers = combineReducers({
    userReducer: UserReducers
});
