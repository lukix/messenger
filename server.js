const express = require('express')
const path = require('path')
const compression = require('compression')

const app = express()
const PORT = process.env.PORT || 3000

app.use(compression())
app.use(express.static('./build'))
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './build/index.html'))
})

app.listen(PORT, function () {
	console.log('App is running on port: ' + PORT)
})