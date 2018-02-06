import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers/index'
import App from './components/App'
import { fetchMessagesAction } from './actions/index'

(function initializeReact() {
	const fetchNewMessages = (store) => {
		store.getState().conversations.forEach(({ keysPair, lastSyncDate }) => {
			store.dispatch(fetchMessagesAction(keysPair, lastSyncDate))
		})
		store.getState().keys.forEach(keysPair => {
			store.dispatch(fetchMessagesAction(keysPair, undefined))
		})
	}
	const readStateFromLocalStorage = (objectName) => {
		return JSON.parse(localStorage.getItem(objectName))
	}
		
	const localStorageObjectName = 'appState'
	const defaultEmptyState = {
		keys: [],
		notifications: [],
		conversations: [],
		settings: {},
		others: {
			keyRequestInProgress: false,
		},
	}
	const initialState = readStateFromLocalStorage(localStorageObjectName) || defaultEmptyState
	const store = createStore(mainReducer, initialState, applyMiddleware(thunkMiddleware))
	store.subscribe(function handleStateChange() {
		localStorage.setItem(
			localStorageObjectName,
			JSON.stringify(store.getState())
		)
	})
	fetchNewMessages(store)
	const Root = ({ store }) => (
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Route exact path="/" component={App} />
				</div>
			</BrowserRouter>
		</Provider>
	)
	ReactDOM.render(
		<Root store={store} />,
		document.getElementById('root')
	)
})()