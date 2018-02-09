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
			return readStateFromLocalStorage(localStorageObjectName) || defaultEmptyState
		},
		saveState(state) {
			localStorage.setItem(
				localStorageObjectName,
				JSON.stringify(state)
			)
		},
	} 
}