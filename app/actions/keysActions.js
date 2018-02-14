import webworkify from 'webworkify'
import KeyGeneratorWorker from '../others/keyGeneratorWorker'
import { registerPublicKeyListener } from '../others/sockets'
import { 
	ADD_NEW_KEY,
	START_CREATING_NEW_KEY,
	FINISH_CREATING_NEW_KEY,
	REMOVE_FREE_KEY,
} from '../actionTypes/index'

export const addNewKeyAction = (privateKey, publicKey, date) => {
	registerPublicKeyListener(publicKey)
	return {
		type: ADD_NEW_KEY,
		privateKey,
		publicKey,
		date,
	}
}
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
			dispatch(addNewKeyAction(privateKey, publicKey, new Date()))
			dispatch(finishCreatingNewKey())
		})
	}
}
export const removeFreeKey = (publicKey) => ({
	type: REMOVE_FREE_KEY,
	publicKey,
})