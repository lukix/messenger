import webworkify from 'webworkify'
import KeyGeneratorWorker from '../others/keyGeneratorWorker'
import {
	ADD_CONVERSATION,
	SEND_MESSAGE,
	CHANGE_PIN_STATE,
	ADD_NEW_KEY,
	START_CREATING_NEW_KEY,
	FINISH_CREATING_NEW_KEY,
} from '../actionTypes/index'

export const addConversationAction = (publicKey) => ({
	type: ADD_CONVERSATION,
	publicKey,
})
export const sendMessageAction = (publicKey, message) => ({
	type: SEND_MESSAGE,
	publicKey,
	message,
})
export const changePinStateAction = (publicKey, pinned) => ({
	type: CHANGE_PIN_STATE,
	publicKey,
	pinned,
})
export const addNewKeyAction = (privateKey, publicKey) => ({
	type: ADD_NEW_KEY,
	privateKey,
	publicKey,
})
export const startCreatingNewKey = () => ({
	type: START_CREATING_NEW_KEY,
})
export const finishCreatingNewKey = () => ({
	type: FINISH_CREATING_NEW_KEY,
})
export const createNewKeyAction = () => {
	return function (dispatch) {
		dispatch(startCreatingNewKey()) //Creating key started
		const worker = webworkify(KeyGeneratorWorker)
		worker.addEventListener('message', function (event) {
			const { publicKey, privateKey } = event.data
			dispatch(addNewKeyAction(privateKey, publicKey))
			dispatch(finishCreatingNewKey())
		})
	}
}