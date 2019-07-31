// Create a middleware function
// dispatch
// next is a reference to the next middleware in the middleware stack
// action object returned by action creator, contains a type and possibly a payload
export default ({ dispatch }) => next => action => {
  // Check to see if the action has a promise on its 'payload' property.
  // If it does, then wait for it to resolve.
  // If it doesn't, then send the action to the next middleware.
  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  // There is a promise.
  // Wait for the promise to resolve (retrieve data),
  // then create a new action with that data and dispatch it.
  action.payload.then(function(response) {
    const newAction = { ...action, payload: response };
    // Take new action and pass it through all middlewares in the stack.
    dispatch(newAction);
  });
};
