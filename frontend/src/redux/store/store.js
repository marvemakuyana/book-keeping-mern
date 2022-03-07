import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBookReducer } from '../reducers/books/createBookReducer';
import { bookListReducer } from '../reducers/books/bookListREducers';

const middleware = [thunk];

const reducer = combineReducers({
    bookCreated: createBookReducer,
    booksList: bookListReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export { store }