import tv4 from "tv4";
import stateSchema from "./stateSchema";

// getState returns all states within the redux store
export default ({ dispatch, getState }) => next => action => {
  // For state validation, call next to pass action in to hit reducers first.
  // This retrieves the updated state, which can then be passed through the middleware stack.
  next(action);
  // Validate the data
  if (!tv4.validate(getState(), stateSchema)) {
    console.warn("Invalid state schema detected");
  }
};
