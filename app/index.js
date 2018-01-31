import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import mainReducer from './reducers/index'
import App from './components/App'

//sampleConversations is temporary (for testing purposes)
const sampleConversations = [
	{
		publicKey: 'lY81Y6Ib8f36myPce4nT3mA424',
		name: 'Roger Federer',
		messages: [
			{ text: 'Aliquam libero nunc', date: new Date('2018-01-23 19:54:50'), isYours: false },
			{ text: 'mattis pretium nisi!', date: new Date('2018-01-23 19:55:36'), isYours: true },
			{ text: 'pharetra lacinia', date: new Date('2018-01-23 19:55:44'), isYours: false },
			{ text: 'dui sed', date: new Date('2018-01-23 19:56:46'), isYours: true },
			{ text: 'ultricies', date: new Date('2018-01-23 19:57:23'), isYours: true },
			{ text: 'Nam ac laoreet arcu.', date: new Date('2018-01-23 19:59:46'), isYours: false },
			{ text: 'nulla vulputate dolor', date: new Date('2018-01-23 19:59:48'), isYours: true },
			{ text: 'Vestibulum an primis', date: new Date('2018-01-23 20:00:41'), isYours: true },
			{ text: 'rutrum ', date: new Date('2018-01-23 20:01:13'), isYours: false },
		],
		pinned: false,
	},
	{
		publicKey: 'MoPqoCtdmiKtocKm9Is1ILjvZN',
		name: '',
		messages: [
			{ text: 'Hi!', date: new Date('2018-01-22 20:21:48'), isYours: false },
			{ text: 'Hullo', date: new Date('2018-01-22 20:23:24'), isYours: true },
			{ text: 'Whats up', date: new Date('2018-01-22 20:23:32'), isYours: true },
			{ text: 'Nothing. Bye.', date: new Date('2018-01-22 20:25:17'), isYours: false },
		],
		pinned: true,
	},
];

(function initializeReact() {
	const readStateFromLocalStorage = (objectName) => {
		return JSON.parse(localStorage.getItem(objectName))
	}
		
	const localStorageObjectName = 'appState'
	const defaultEmptyState = {
		keys: [],
		notifications: [],
		conversations: sampleConversations,
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