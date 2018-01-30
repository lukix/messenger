import NodeRSA from 'node-rsa'

export default function (self) {
	/*
	self.addEventListener('message', function (event) {
		const key = new NodeRSA({ b: 2048 })
		const publicKey = key.exportKey('public')
		const privateKey = key.exportKey('private')
		self.postMessage({ publicKey, privateKey })
	})
	*/
	const key = new NodeRSA({ b: 2048 })
	const publicKey = key.exportKey('public')
	const privateKey = key.exportKey('private')
	self.postMessage({ publicKey, privateKey })
}