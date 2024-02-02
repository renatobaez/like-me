require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createPost, readPosts, updatePost, deletePost } = require('../utils/pg.js')

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cors())

app.get('/posts', async (_, res) => {
	const result = await readPosts()
	if(result.code === 500) {
		return res.status(500).json(result)
	}
	return res.status(200).json(result)
})
app.post('/posts', async (req, res) => {
	const {id, titulo, url, descripcion} = req.body
	if(!id || !titulo || !url || !descripcion) {
		return res.status(400).json({ error: 'Faltan datos' })
	}
	const result = await createPost(id, titulo, url, descripcion)
	if(result.code != undefined) {
		return res.status(500).json(result)
	}
	return res.status(201).json(result)
})
//PARTE 2
app.put('/posts/like/:id', async (req, res) => {
	const { id } = req.params
	const result = await updatePost(id)
	if(result.code != undefined) {
		return res.status(500).json(result)
	}
	return res.status(200).json(result)
})
app.delete('/posts/:id', async (req, res) => {
	const { id } = req.params
	const result = await deletePost(id)
	if(result.code != undefined) {
		return res.status(500).json(result)
	}
	return res.status(200).json(result)
})
app.all('*', (_, res) => res.status(404).json({ code: 404, message: 'Recurso no encontrado' }))
app.listen(PORT, () => console.log('http://localhost:' + PORT))

module.exports = app
