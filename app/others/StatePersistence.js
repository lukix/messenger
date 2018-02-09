import { serialize, deserialize } from './serialization'

const defaultEmptyState = {
	keys: [],
	notifications: [],
	conversations: [],
	settings: {},
	others: {
		keyRequestInProgress: false,
	},
}
const readStateFromLocalStorage = (objectName) => {
	return JSON.parse(localStorage.getItem(objectName))
}
export default function StatePersistance(localStorageObjectName) {
	return {
		getInitialState() {
			const localStorageState = readStateFromLocalStorage(localStorageObjectName)
			if(localStorageState) {
				return deserialize(localStorageState)
			} else {
				return defaultEmptyState
			}
		},
		saveState(state) {
			localStorage.setItem(
				localStorageObjectName,
				JSON.stringify(serialize(state))
			)
		},
	} 
}
