import axios from 'axios'
import Form from './components/Form'
import Post from './components/Post'
import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'

const URL_BASE = import.meta.env.VITE_URL_BASE

const App = () => {
  const [titulo, setTitulo] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const { data: posts } = await axios.get(`${URL_BASE}/posts`)
    setPosts([...posts])
  }

  const agregarPost = async () => {
    const post = { id: uuidv4(), titulo, url: imgSrc, descripcion }
    await axios.post(`${URL_BASE}/posts`, post)
    getPosts()
  }

  const like = async (id) => {
    await axios.put(`${URL_BASE}/posts/like/${id}`)
    getPosts()
  }

  const eliminarPost = async (id) => {
    await axios.delete(`${URL_BASE}/posts/${id}`)
    getPosts()
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='app'>
      <h2 className='py-5 text-center'>&#128248; Like Me &#128248;</h2>
      <div className='row m-auto px-5'>
        <div className='col-12 col-sm-4'>
          <Form
            setTitulo={setTitulo}
            setImgSrc={setImgSrc}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className='col-12 col-sm-8 px-5 row posts align-items-start'>
          {posts.map((post) => <Post key={post.id} post={post} like={like} eliminarPost={eliminarPost} />)}
        </div>
      </div>
    </div>
  )
}

export default App
