import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../reducers/reducer';
import thunk from 'redux-thunk';

compose(
  applyMiddleware(thunk),
  (window as any).devToolsExtension
    ? (window as any).devToolsExtension()
    : (f: any) => f
);
const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);

export default store;
