import { START_CREATING_NEW_KEY, FINISH_CREATING_NEW_KEY } from '../actionTypes/index'

const othersReducer = (others = {}, action) => {
	switch(action.type) {
		case START_CREATING_NEW_KEY:
			return Object.assign({}, others, { keyRequestInProgress: true })
		case FINISH_CREATING_NEW_KEY:
			return Object.assign({}, others, { keyRequestInProgress: false })
		default:
			return others
	}
}

export default othersReducer