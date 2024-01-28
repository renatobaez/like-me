const Form = ({ setTitulo, setImgSrc, setDescripcion, agregarPost }) => {
  return (
    <div className='form'>
      <div className='mb-2'>
        <h6>Agregar post</h6>
        <label htmlFor='title'>Título</label>
        <input name='title' onChange={(event) => setTitulo(event.target.value)} className='form-control' />
      </div>
      <div className='mb-2'>
        <label htmlFor='url-img'>URL de la imagen</label>
        <input name='url-img' onChange={(event) => setImgSrc(event.target.value)} className='form-control' />
      </div>
      <div className='mb-3'>
        <label htmlFor='description'>Descripción</label> <br />
        <textarea name='description' onChange={(event) => setDescripcion(event.target.value)} className='form-control' />
      </div>
      <div className='d-flex'>
        <button onClick={agregarPost} className='btn btn-light m-auto'>Agregar</button>
      </div>
    </div>
  )
}

export default Form
