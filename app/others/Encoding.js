export function encodeMessage(message) {
	return message
}
export function decodeMessage(message) {
	return {
		...message,
		date: new Date(message.date),
	}
}