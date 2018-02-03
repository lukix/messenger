import NodeRSA from 'node-rsa'
import { pemToString } from './Encryption'

export default function (self) {
	const key = new NodeRSA({ b: 2048 })
	const publicKey = pemToString(key.exportKey('public'))
	const privateKey = pemToString(key.exportKey('private'))
	self.postMessage({ publicKey, privateKey })
}