require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createPost, readPosts } = require('../utils/pg.js')

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())

app.get('/posts', async (_, res) => {
	await readPosts()
		.then((result) => res.status(200).json(result))
		.catch((error) => res.status(500).json(error))
})

app.post('/posts', async (req, res) => {
	const {id, titulo, url, descripcion} = req.body
	if(!id || !titulo || !url || !descripcion) {
		return res.status(400).json({ error: 'Faltan datos' }) 
	}
	await createPost(id, titulo, url, descripcion)
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(500).json(error))
})

app.listen(PORT, () => console.log('http://localhost:' + PORT))

module.exports = app
