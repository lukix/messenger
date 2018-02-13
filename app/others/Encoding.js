export function encodeMessage(message, clientGeneratedId) {
	return {
		...message,
		clientGeneratedId,
	}
}
export function decodeMessage(message) {
	return {
		...message,
		date: new Date(message.date),
	}
}