import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers/index'
import App from './components/App'
import { fetchMessagesAction } from './actions/index'
import initSockets from './others/sockets'
import StatePersistence from './others/StatePersistence'
import { fixNotSyncedMessages } from './others/syncStatusCheck'

(function initializeReact() {
	const fetchNewMessages = (store) => {
		store.getState().conversations.forEach(({ keysPair, lastSyncDate }) => {
			store.dispatch(fetchMessagesAction(keysPair, lastSyncDate))
		})
		store.getState().keys.forEach(keysPair => {
			store.dispatch(fetchMessagesAction(keysPair, undefined))
		})
	}
	
	const statePersistence = StatePersistence('appState')
	const store = createStore(
		mainReducer,
		statePersistence.getInitialState(),
		applyMiddleware(thunkMiddleware)
	)
	store.subscribe(() => statePersistence.saveState(store.getState()))
	fixNotSyncedMessages(store.getState().conversations, store.dispatch)
	initSockets(store, 'http://localhost:8080')
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