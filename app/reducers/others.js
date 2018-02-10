import {
	START_CREATING_NEW_KEY,
	FINISH_CREATING_NEW_KEY,
	CHANGE_MESSAGE_SOUND_ON,
} from '../actionTypes/index'

const othersReducer = (others = {}, action) => {
	switch(action.type) {
		case START_CREATING_NEW_KEY:
			return Object.assign({}, others, { keyRequestInProgress: true })
		case FINISH_CREATING_NEW_KEY:
			return Object.assign({}, others, { keyRequestInProgress: false })
		case CHANGE_MESSAGE_SOUND_ON:
			return Object.assign({}, others, { messageSoundOn: action.on })
		default:
			return others
	}
}

export default othersReducer