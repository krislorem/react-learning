import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/article.css'

const CreatePost = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3002/posts', formData)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="article-container">
      <h2>新建文章</h2>
      {error && <div className="error">{error}</div>}
      <form className="article-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">标题</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="body">内容</label>
          <textarea
            id="body"
            name="body"
            className="form-control"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">提交</button>
      </form>
    </div>
  )
}

export default CreatePost
