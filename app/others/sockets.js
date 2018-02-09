import io from 'socket.io-client'
import { fetchMessagesAction } from '../actions/index'

let socket = null
const registeredKeys = []
export default function initSockets(store, url) {
	socket = io(url)
	socket.on('connect', function () {
		const state = store.getState()
		state.conversations.forEach(({ keysPair }) => {
			registerPublicKeyListener(keysPair.publicKey)
		})
		state.keys.forEach((keysPair) => {
			registerPublicKeyListener(keysPair.publicKey)
		})
	})
	socket.on('message', function (publicKey) {
		const state = store.getState()
		const conversation = state.conversations.find(
			({ keysPair }) => keysPair.publicKey === publicKey
		)
		if(conversation !== undefined) {
			const { keysPair, lastSyncDate } = conversation
			store.dispatch(fetchMessagesAction(keysPair, lastSyncDate))
		} else {
			const keysPair = state.keys.find(
				(keysPair) => keysPair.publicKey === publicKey
			)
			if(keysPair !== undefined) {
				store.dispatch(fetchMessagesAction(keysPair, undefined))
			}
		}
	})
	socket.on('disconnect', function () {})
}
export function registerPublicKeyListener(publicKey) {
	if(registeredKeys.find(key => key === publicKey) === undefined) {
		socket.emit('listen', publicKey)
		registeredKeys.push(publicKey)
	}
}