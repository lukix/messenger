import NodeRSA from 'node-rsa'
import crypto2 from 'crypto2'
import randomstring from 'randomstring'

export function encryptMessage(recieverPublicKey, senderPrivateKey, messageContent) {
	const publicKey = new NodeRSA(recieverPublicKey)
	const password = randomstring.generate(128)
	return new Promise((resolve, reject) => {
		crypto2.encrypt.aes256cbc(messageContent, password, (err, encrypted) => {
			if(err) reject(err)
			const aes256cbcPassword = publicKey.encrypt(password)
			const result = {
				recieverAddress: recieverPublicKey,
				aes256cbcPassword,
				message: encrypted,
			}
			resolve(result)
		})
	})
}

export function decryptMessage(recieverPrivateKey, message) {
	const privateKey = new NodeRSA(recieverPrivateKey)
	const aes256cbcPassword = privateKey.decrypt(message.aes256cbcPassword).toString()
	return new Promise((resolve, reject) => {
		crypto2.decrypt.aes256cbc(message.message, aes256cbcPassword, (err, decrypted) => {
			if(err) reject(err)
			resolve({
				message: decrypted,
			})
		})
	})
}