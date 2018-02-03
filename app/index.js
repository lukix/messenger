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
		keysPair: {
			publicKey: 'testpub1',
			privateKey: 'testpriv1',
		},
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
		].map(message => ({ ...message, synced: true })),
		pinned: false,
	},
	{
		publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAho2eL19+4qSC1qDJthHpJJYO1Hb9Ed41/K29X485WfHdjVip3jhmdBNhPrlheZJhYB3dP5RbxwS9X3vYcpE8TSmbdQ0DBHL05Astg7R/+QQO7YmD/pIhZEgEnceo6K8m6qAK5qZZDDwlbjnaEQ0i9l4ntuYmv53Un5LyYwgZtfz/Z2U0LdpPjtQy9vV2M+2AflCt3uJoYpY3xI0JzUVw/dLj/qck+zSR4Goj0SD57FFan5KKws+CEKOr79CLDa7bOODSkCG9M5lrbGQkENOydBEQfjjvAIqnMz5wyazM1zfBhxzCBEe0xKhSwW8cMIUKOTNCIVnoBdtLpT2sTyiThQIDAQAB',
		keysPair: {
			publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAho2eL19+4qSC1qDJthHpJJYO1Hb9Ed41/K29X485WfHdjVip3jhmdBNhPrlheZJhYB3dP5RbxwS9X3vYcpE8TSmbdQ0DBHL05Astg7R/+QQO7YmD/pIhZEgEnceo6K8m6qAK5qZZDDwlbjnaEQ0i9l4ntuYmv53Un5LyYwgZtfz/Z2U0LdpPjtQy9vV2M+2AflCt3uJoYpY3xI0JzUVw/dLj/qck+zSR4Goj0SD57FFan5KKws+CEKOr79CLDa7bOODSkCG9M5lrbGQkENOydBEQfjjvAIqnMz5wyazM1zfBhxzCBEe0xKhSwW8cMIUKOTNCIVnoBdtLpT2sTyiThQIDAQAB', 
			privateKey: 'MIIEowIBAAKCAQEAho2eL19+4qSC1qDJthHpJJYO1Hb9Ed41/K29X485WfHdjVip3jhmdBNhPrlheZJhYB3dP5RbxwS9X3vYcpE8TSmbdQ0DBHL05Astg7R/+QQO7YmD/pIhZEgEnceo6K8m6qAK5qZZDDwlbjnaEQ0i9l4ntuYmv53Un5LyYwgZtfz/Z2U0LdpPjtQy9vV2M+2AflCt3uJoYpY3xI0JzUVw/dLj/qck+zSR4Goj0SD57FFan5KKws+CEKOr79CLDa7bOODSkCG9M5lrbGQkENOydBEQfjjvAIqnMz5wyazM1zfBhxzCBEe0xKhSwW8cMIUKOTNCIVnoBdtLpT2sTyiThQIDAQABAoIBAQCF+e1Qbl4Bfp1o6KDw0dS7wU7y76f9aq2G89hkllAc52AbpfU+eBpL6iAiPKR6UO70rcfnzumzuVx2/vH+4e6RRqSsYFBo1a5Sg27GfawPX6MdkpgDm630FGHEWVIunni5lrJEB88TB7CdmK0x3Uq61fXlgDWFBrr4SXFgemhfdB+0476up6BX2b5rPTMYaqbXdPRWB8JiJrqpt2OV1YlwZaU0O+ncAOANh/43mYgFeAsCsjnw1yPay6aOuQFx10NmyWNNn6bmYT1jqpZsTRxRmqpIgP0sfcqooXjXuM0B1RyiTnS1wAXx3Wb06kmtOD7EzPQ6ulclSom0RfUZbynhAoGBAM2EOiGVnlZqdTpvJCipB81cEruRqKk6/7r3RWgKLYFs56Jmi01gaHJtAWQpDQwY2P46755LRQxVBZL2HgYEwKljrmNvu8d0ADhgd6LXrM9j2TgeX2zOHtyjIQTSBHgA1WC//1kpH6N+fPUpjM6bvWVYyMObh5BOqsTSGco9pXuHAoGBAKea6JZN5FpPK7It41LrKT2/vmsGSA5kV9Nzm4AxJzD6h68V/Gcf2uuURKRqsQoLVWWsC8qHWqzF4dGxW9YOs8y4jlGJBW+m5gtTkuUfh1Ps8khnNkn/eRn4i4LnjRJK98W2F7OYsqUmBNqmWOCuKXvmjXvDHtF8vuuShYuDc3OTAoGAB81VR6Eeeblg6e7+OGzyVuF/9I77EDGlM7vfbqu0Po2b3ZZ3A2D9lhp9Swgj7qmi00P5hNDmtikkJQgi66eSiNu36x56yn+k4n8HC6+UZ+sqe+7rQH4yvb2Tq1MtyEB/2URwtTnScaqDo+sH5XAUKJzOQl7NLrVN1lsDj6H3flECgYB5MM3VQOVJV83kvMGPB3N+rtLlWFlp7qyCvSlHfEM2azEJLQChIKuPhFpN+Mei16ccKVctTsoF+9/ZXEFneqIP+bMOyeEgZrIYpomlGzMjQEXAjMD4qL3MRae7M+sRuxuF3rEsr9EdEWyZHYdOjyB38rGDOAdkuqric8QUqSwl+QKBgBU1S42wIZwYRD6/47K2px8XgKjdUBDV3Te0bWCTIjhVVGB2ZO0Y9AxGknhq2NI8Mi60gyPM+qsQhrdshKyhfwf89ZJzaSZnj4HD/NvHvs8jAKee4UzNvZrys5KszkAl/3dXGz37S4KHfgKtCKA6k+5yTIN7UWdsXOQDbPKOQE6X',
		},
		name: '',
		messages: [
			{ text: 'Hi!', date: new Date('2018-01-22 20:21:48'), isYours: false },
			{ text: 'Hullo', date: new Date('2018-01-22 20:23:24'), isYours: true },
			{ text: 'Whats up', date: new Date('2018-01-22 20:23:32'), isYours: true },
			{ text: 'Nothing. Bye.', date: new Date('2018-01-22 20:25:17'), isYours: false },
		].map(message => ({ ...message, synced: true })),
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