require('dotenv').config()
const { Pool } = require('pg')

const config = {
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  allowExitOnIdle: true
}

const pool = new Pool(config)

const genericQuery = (query, values) => pool
  .query(query, values)
  .then(({rows}) => rows)
  .catch(({code, message}) => ({code, message}))

const createPost = async (id, titulo, url, descripcion) => {
  const query = "INSERT INTO posts (id, titulo, img, descripcion) VALUES ($1, $2, $3, $4) RETURNING *;"
  return await genericQuery(query, [id, titulo, url, descripcion])
}
const readPosts = async () => await genericQuery("SELECT * FROM posts;")
//PARTE 2
const updatePost = async (id) => await genericQuery("UPDATE posts SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *;", [id])
const deletePost = async (id) => await genericQuery("DELETE FROM posts WHERE id = $1 RETURNING *;", [id])

module.exports = {
  readPosts,
  createPost,
  updatePost,
  deletePost
}
