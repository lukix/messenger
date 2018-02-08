import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers/index'
import App from './components/App'
import { fetchMessagesAction } from './actions/index'
import io from 'socket.io-client'

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
	const socket = io('http://localhost:8080')
	socket.on('connect', function () {
		store.getState().conversations.forEach(({ keysPair }) => {
			socket.emit('listen', keysPair.publicKey)
		})
	})
	socket.on('message', function (publicKey) {
		const conversation = store.getState().conversations.find(
			({ keysPair }) => keysPair.publicKey === publicKey
		)
		if(conversation !== undefined) {
			const { keysPair, lastSyncDate } = conversation
			store.dispatch(fetchMessagesAction(keysPair, lastSyncDate))
		}
	})
	socket.on('disconnect', function () {})

	const store = createStore(
		mainReducer,
		initialState,
		applyMiddleware(thunkMiddleware)
	)
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