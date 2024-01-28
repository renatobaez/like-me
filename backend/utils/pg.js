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

const readPosts = async () => {
  try {
    const result = await pool.query("SELECT * FROM posts;")
    return result.rows
  } catch (error) {
    console.log(error)
    return { code: 500, error }
  }
}
const createPost = async (id, titulo, url, descripcion) => {
  try {
    const consulta = "INSERT INTO posts (id, titulo, img, descripcion) VALUES ($1, $2, $3, $4) RETURNING *;"
    const result = await pool.query(consulta, [id, titulo, url, descripcion])
    return result.rows
  } catch (error) {
    console.log(error)
    return { code: 500, error }
  }
}

module.exports = { readPosts, createPost}
