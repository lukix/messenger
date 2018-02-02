import NodeRSA from 'node-rsa'
import crypto2 from 'crypto2'
import randomstring from 'randomstring'

export function encryptMessage(recieverPublicKey, senderKeys, messageContent) {
	const publicKey = new NodeRSA(recieverPublicKey)
	const privateKey = new NodeRSA(senderKeys.privateKey)
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
				encryptedPassword,
				message: encrypted,
				signature: privateKey.sign(password),
			})
		})
	})
}

export function decryptMessage(recieverPrivateKey, encryptedMessage) {
	const privateKey = new NodeRSA(recieverPrivateKey)
	const password = privateKey.decrypt(encryptedMessage.encryptedPassword).toString()
	return new Promise((resolve, reject) => {
		crypto2.decrypt.aes256cbc(encryptedMessage.message, password, (err, decrypted) => {
			if(err) reject(err)
			const message = JSON.parse(decrypted)
			const verified = new NodeRSA(message.publicKey)
				.verify(password, encryptedMessage.signature)
			resolve({
				senderAddress: message.publicKey,
				content: message.content,
				verified,
			})
		})
	})
}