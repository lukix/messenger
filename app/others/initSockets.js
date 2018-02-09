import io from 'socket.io-client'
import { fetchMessagesAction } from '../actions/index'

export default function initSockets(store, url) {
	const socket = io(url)
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
}