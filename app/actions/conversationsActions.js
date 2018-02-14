import webworkify from 'webworkify'
import KeyGeneratorWorker from '../others/keyGeneratorWorker'
import { registerPublicKeyListener } from '../others/sockets'
import { 
	CHANGE_PIN_STATE,
	START_ADDING_CONVERSATION,
	FINISH_ADDING_CONVERSATION,
	CHANGE_CONVERSATION_NAME,
} from '../actionTypes/index'

export const startCreatingNewConversation = (publicKey) => ({
	type: START_ADDING_CONVERSATION,
	publicKey,
})
export const finishCreatingNewConversation = (publicKey, keysPair) => {
	registerPublicKeyListener(keysPair.publicKey)
	return {
		type: FINISH_ADDING_CONVERSATION,
		publicKey,
		keysPair,
	}
}
export const addConversationAction = (publicKey) => {
	return function (dispatch) {
		return new Promise((resolve, reject) => {
			dispatch(startCreatingNewConversation(publicKey))
			const worker = webworkify(KeyGeneratorWorker)
			worker.addEventListener('message', function ({ data: keysPair }) {
				dispatch(finishCreatingNewConversation(publicKey, keysPair))
				resolve(keysPair)
			})
		})
	}
}
export const changePinStateAction = (publicKey, pinned, pinChangeDate) => ({
	type: CHANGE_PIN_STATE,
	publicKey,
	pinned,
	pinChangeDate,
})
export const changeConversationName = (publicKey, newName) => ({
	type: CHANGE_CONVERSATION_NAME,
	publicKey,
	newName,
})