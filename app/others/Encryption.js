import NodeRSA from 'node-rsa'
import crypto2 from 'crypto2'
import randomstring from 'randomstring'

export function encryptMessage(recieverPublicKey, senderKeys, messageContent) {
	const publicKey = new NodeRSA(stringToPem(recieverPublicKey, 'PUBLIC'))
	const privateKey = new NodeRSA(stringToPem(senderKeys.privateKey, 'PRIVATE'))
	const password = randomstring.generate(128)
	const messageObject = JSON.stringify({
		content: messageContent,
		publicKey: senderKeys.publicKey,
	})
	return new Promise((resolve, reject) => {
		crypto2.encrypt.aes256cbc(messageObject, password, (err, encrypted) => {
			if(err) reject(err)
			const encryptedPassword = publicKey.encrypt(password)
			resolve({
				recieverAddress: recieverPublicKey,
				encryptedPassword: encryptedPassword.toString(),
				message: encrypted,
				signature: privateKey.sign(password).toString(),
			})
		})
	})
}

export function decryptMessage(recieverPrivateKey, encryptedMessage) {
	const privateKey = new NodeRSA(stringToPem(recieverPrivateKey, 'PRIVATE'))
	const password = privateKey.decrypt(encryptedMessage.encryptedPassword).toString()
	return new Promise((resolve, reject) => {
		crypto2.decrypt.aes256cbc(encryptedMessage.message, password, (err, decrypted) => {
			if(err) reject(err)
			const message = JSON.parse(decrypted)
			const verified = new NodeRSA(stringToPem(message.publicKey, 'PUBLIC'))
				.verify(password, encryptedMessage.signature)
			resolve({
				senderAddress: message.publicKey,
				content: message.content,
				verified,
			})
		})
	})
}

export function pemToString(pemString) {
	return pemString.split('\n').slice(1, -1).join('')
}

export function stringToPem(keyString, type) {
	if(type !== 'PUBLIC' && type !== 'PRIVATE') {
		throw Error('Only "PRIVATE" and "PUBLIC" values are valid for parameter "type"')
	}
	const typeDescription = type === 'PUBLIC' ? type : 'RSA PRIVATE'
	return [
		`-----BEGIN ${typeDescription} KEY-----`,
		...keyString.match(/.{1,64}/g),	//Split into lines of length = 64
		`-----END ${typeDescription} KEY-----`,
	].join('\n')
}