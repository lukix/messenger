import NodeRSA from 'node-rsa'

export default function (self) {
	const key = new NodeRSA({ b: 2048 })
	const publicKey = key.exportKey('public')
	const privateKey = key.exportKey('private')
	self.postMessage({ publicKey, privateKey })
}