import NodeRSA from 'node-rsa'
import crypto2 from 'crypto2'
import randomstring from 'randomstring'

const encryptionOptions = {
	encryptionScheme: 'pkcs1_oaep',
	signingScheme: 'pkcs1-sha256',
}
const encoding = 'base64'

export function encryptMessage(recieverPublicKey, senderKeys, messageContent) {
	const publicKey = new NodeRSA(stringToPem(recieverPublicKey, 'PUBLIC'), encryptionOptions)
	const privateKey = new NodeRSA(stringToPem(senderKeys.privateKey, 'PRIVATE'), encryptionOptions)
	const password = randomstring.generate(128)
	const messageObject = JSON.stringify({
		content: messageContent,
		publicKey: senderKeys.publicKey,
	})
	return new Promise((resolve, reject) => {
		crypto2.encrypt.aes256cbc(messageObject, password, (err, encrypted) => {
			if(err) reject(err)
			const encryptedPassword = publicKey.encrypt(password, encoding, encoding)
			resolve({
				recieverAddress: recieverPublicKey,
				encryptedPassword: encryptedPassword,
				message: encrypted,
				signature: privateKey.sign(password, encoding, encoding),
			})
		})
	})
}

export function decryptMessage(recieverPrivateKey, encryptedMessage) {
	const privateKey = new NodeRSA(stringToPem(recieverPrivateKey, 'PRIVATE'), encryptionOptions)
	const password = privateKey.decrypt(encryptedMessage.encryptedPassword, encoding)
	return new Promise((resolve, reject) => {
		crypto2.decrypt.aes256cbc(encryptedMessage.message, password, (err, decrypted) => {
			if(err) reject(err)
			const message = JSON.parse(decrypted)
			const verified = new NodeRSA(
				stringToPem(message.publicKey, 'PUBLIC'),
				encryptionOptions
			)
				.verify(password, encryptedMessage.signature, encoding, encoding)
			resolve({
				senderAddress: message.publicKey,
				content: message.content,
				verified,
				date: encryptedMessage.date,
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