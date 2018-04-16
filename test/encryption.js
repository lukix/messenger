import assert from 'assert'
import { describe, it } from 'mocha'
import { encryptMessage, decryptMessage } from '../app/others/Encryption.js'
import { encodeMessage, decodeMessage } from '../app/others/Encoding.js'

const keysPair1 = {
	publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAho2eL19+4qSC1qDJthHpJJYO1Hb9Ed41/K29X485WfHdjVip3jhmdBNhPrlheZJhYB3dP5RbxwS9X3vYcpE8TSmbdQ0DBHL05Astg7R/+QQO7YmD/pIhZEgEnceo6K8m6qAK5qZZDDwlbjnaEQ0i9l4ntuYmv53Un5LyYwgZtfz/Z2U0LdpPjtQy9vV2M+2AflCt3uJoYpY3xI0JzUVw/dLj/qck+zSR4Goj0SD57FFan5KKws+CEKOr79CLDa7bOODSkCG9M5lrbGQkENOydBEQfjjvAIqnMz5wyazM1zfBhxzCBEe0xKhSwW8cMIUKOTNCIVnoBdtLpT2sTyiThQIDAQAB',
	privateKey: 'MIIEowIBAAKCAQEAho2eL19+4qSC1qDJthHpJJYO1Hb9Ed41/K29X485WfHdjVip3jhmdBNhPrlheZJhYB3dP5RbxwS9X3vYcpE8TSmbdQ0DBHL05Astg7R/+QQO7YmD/pIhZEgEnceo6K8m6qAK5qZZDDwlbjnaEQ0i9l4ntuYmv53Un5LyYwgZtfz/Z2U0LdpPjtQy9vV2M+2AflCt3uJoYpY3xI0JzUVw/dLj/qck+zSR4Goj0SD57FFan5KKws+CEKOr79CLDa7bOODSkCG9M5lrbGQkENOydBEQfjjvAIqnMz5wyazM1zfBhxzCBEe0xKhSwW8cMIUKOTNCIVnoBdtLpT2sTyiThQIDAQABAoIBAQCF+e1Qbl4Bfp1o6KDw0dS7wU7y76f9aq2G89hkllAc52AbpfU+eBpL6iAiPKR6UO70rcfnzumzuVx2/vH+4e6RRqSsYFBo1a5Sg27GfawPX6MdkpgDm630FGHEWVIunni5lrJEB88TB7CdmK0x3Uq61fXlgDWFBrr4SXFgemhfdB+0476up6BX2b5rPTMYaqbXdPRWB8JiJrqpt2OV1YlwZaU0O+ncAOANh/43mYgFeAsCsjnw1yPay6aOuQFx10NmyWNNn6bmYT1jqpZsTRxRmqpIgP0sfcqooXjXuM0B1RyiTnS1wAXx3Wb06kmtOD7EzPQ6ulclSom0RfUZbynhAoGBAM2EOiGVnlZqdTpvJCipB81cEruRqKk6/7r3RWgKLYFs56Jmi01gaHJtAWQpDQwY2P46755LRQxVBZL2HgYEwKljrmNvu8d0ADhgd6LXrM9j2TgeX2zOHtyjIQTSBHgA1WC//1kpH6N+fPUpjM6bvWVYyMObh5BOqsTSGco9pXuHAoGBAKea6JZN5FpPK7It41LrKT2/vmsGSA5kV9Nzm4AxJzD6h68V/Gcf2uuURKRqsQoLVWWsC8qHWqzF4dGxW9YOs8y4jlGJBW+m5gtTkuUfh1Ps8khnNkn/eRn4i4LnjRJK98W2F7OYsqUmBNqmWOCuKXvmjXvDHtF8vuuShYuDc3OTAoGAB81VR6Eeeblg6e7+OGzyVuF/9I77EDGlM7vfbqu0Po2b3ZZ3A2D9lhp9Swgj7qmi00P5hNDmtikkJQgi66eSiNu36x56yn+k4n8HC6+UZ+sqe+7rQH4yvb2Tq1MtyEB/2URwtTnScaqDo+sH5XAUKJzOQl7NLrVN1lsDj6H3flECgYB5MM3VQOVJV83kvMGPB3N+rtLlWFlp7qyCvSlHfEM2azEJLQChIKuPhFpN+Mei16ccKVctTsoF+9/ZXEFneqIP+bMOyeEgZrIYpomlGzMjQEXAjMD4qL3MRae7M+sRuxuF3rEsr9EdEWyZHYdOjyB38rGDOAdkuqric8QUqSwl+QKBgBU1S42wIZwYRD6/47K2px8XgKjdUBDV3Te0bWCTIjhVVGB2ZO0Y9AxGknhq2NI8Mi60gyPM+qsQhrdshKyhfwf89ZJzaSZnj4HD/NvHvs8jAKee4UzNvZrys5KszkAl/3dXGz37S4KHfgKtCKA6k+5yTIN7UWdsXOQDbPKOQE6X',
}
const keysPair2 = {
	publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7hb1fKeo1UHeGZy1+5LshNplfGCK96Swbm9b2d10P5wCgJ7+KkqF29v2JmYqQ2YSCSzL9TLwnOBSK5MH7jFq5oevGf+Ng+X2vBpFv5ZMFAh9/qzy9JxOt71oNcwBcVaZnN/xZ/6jU9yaEBkyLp301Wn6ayORfvH9a16HR80jiUxEh4TKcAR1xpaBaK0nC3NQL/rIWz6/QrS89LsgIetBefkJW/YIOL34L1VcyMQEW/zB1ZmF0qzhG5hx6LP/K/e6wK05wLWEwy4YNxAPEaaIFXO4GDGeYD/OFDzsu/8/d8XzLbsyD+r4kw/sogfweTVpDCUFz0X7NkG4ckKn1NA1wwIDAQAB',
	privateKey: 'MIIEowIBAAKCAQEA7hb1fKeo1UHeGZy1+5LshNplfGCK96Swbm9b2d10P5wCgJ7+KkqF29v2JmYqQ2YSCSzL9TLwnOBSK5MH7jFq5oevGf+Ng+X2vBpFv5ZMFAh9/qzy9JxOt71oNcwBcVaZnN/xZ/6jU9yaEBkyLp301Wn6ayORfvH9a16HR80jiUxEh4TKcAR1xpaBaK0nC3NQL/rIWz6/QrS89LsgIetBefkJW/YIOL34L1VcyMQEW/zB1ZmF0qzhG5hx6LP/K/e6wK05wLWEwy4YNxAPEaaIFXO4GDGeYD/OFDzsu/8/d8XzLbsyD+r4kw/sogfweTVpDCUFz0X7NkG4ckKn1NA1wwIDAQABAoIBAQCok+L/fyrAzKF4mwgTd6U2L/i5hxX+YEJ3/ysW6IE95LW04l5uDVQYJvdzmtUD4cqVan2DQK0zNnWX2sQ7uAvL7HhjvRkzMelwqF2IWN/HM3gakdR4tA/ccyTNKoQ+/qVHeRzRmG+GmmUPTvfEIB1R2nbv00BalPbtRgIdKbemptck2ii7vZTnDclUf8mTN0g7R6MkNeOfuLpCXIYs22aU/M/+PW0f+zOfbmu26aYDYhlYKNh8zRdUzQqGIy5GY9bfQavmOvwIbMXtjKnqVm5M8RYkyIe1d/tg3iBrJZf/Ur0J1BziFu4KkLDrBklBeCfWAJwRw6EdFnPIH/QMG4NBAoGBAPhBBzgS1i7E2gdPN3bK8dhYXQrKvOrpcj+KN26/BWJ7D3sMt+hHbv+WUgwrvAoWUJqrSjA74z8snLpHIhXwn9EjLQgLch2RTnRqiEjJNQm/RnYM1PwZJL1DAXUlQcf92c57AZAh/VM9tE64b95XFHs3v+GzP8qWvK02D4RJz2/hAoGBAPWEvcpiC4A63Bpm6R4rnTReHlkH+DecUMXyMT7hm0fGmtXoSi7DpLd5EH5yIqheSccD/RLyblD8IMGBYAOa2eC88ECVBfRgCjpuILBhhWwoDEh45sHmijWulV5kRu+GLUjkLBC6uiUeSMePnjcQj4NnDxrWy2FwJgs5+O9MOSojAoGAOd6GvUZ+0QYoQN3xcuqZ97GZdsONyEDE1hT1GQbETZGcKTXsxOOp90BmPdoQClXrUjKtp5K+RWKz4iRkyLJ/vrOxcpegcU4G+NJAlJ76kxwYY7pYB7AgxVGSTGlz7Re6pww7cArMT5QprNQHl8+6wYJcY1Nygloi/0mD0nWWOmECgYAunGbTt01rqMEEmikDu0/7Eys7x9GN7TVAfzxuLbKnK8NVfOYofqgU1P0WpGCECnKDP/SZ1kCvS06EriUmSg23JueNuz0IKfuHIEVAdyM3Z1r9n0Zf5X6ztlNROkRlUNnkDr1255xTU66JhHCLD6/PSI+Ljt/JvdrbIsRp2dS4dQKBgEWzoVYBni7XXsWYLkstDiwWXEI+4WP50YF/syhw1aUrPotlsw/CrjnN2EE/IcI2FFwhEkX3An6ejcKCbIgxD6/uU8Z4sr/ODEJswKp/3PdyS+eWnrG2lN3VH9hfaaFcZ4CZ2wvuJtUfd8weXzkU5QVoTx/fs3vpz/8U7RVGnzWk',
}

describe('Encryption.js', function () {
	describe('encrypt and decrypt cycle', function () {
		it('should return decrypted and verified message', function (done) {
			const messageContent = 'Hello World345'
			encryptMessage(keysPair2.publicKey, keysPair1, messageContent)
				.then(encryptedMessage => decryptMessage(keysPair2.privateKey, encryptedMessage))
				.then(decryptedMessage => {
					assert.ok(
						messageContent === decryptedMessage.content
						&& decryptedMessage.verified
					)
					done()
				})
				.catch(error => {
					done(error)
				})
		})
	})
	describe('encrypt, stringify, parse, decrypt cycle', function () {
		it('should return decrypted and verified message', function (done) {
			const messageContent = 'Hello World345'
			encryptMessage(keysPair2.publicKey, keysPair1, messageContent)
				.then(message => encodeMessage(message))
				.then(message => JSON.stringify(message))
				.then(message => JSON.parse(message))
				.then(message => decodeMessage(message))
				.then(message => decryptMessage(keysPair2.privateKey, message))
				.then(message => {
					assert.ok(
						messageContent === message.content
						&& message.verified
					)
					done()
				})
				.catch(error => {
					done(error)
				})
		})
	})
})