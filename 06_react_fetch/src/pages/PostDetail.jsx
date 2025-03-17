import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/article.css'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/posts/${id}`)
        setPost(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!post) return <div>Post not found</div>

  return (
    <article className="article-detail">
      <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginBottom: '1rem' }}>返回列表</button>
      <h1 className="detail-title">{post.title}</h1>
      <div className="detail-body">{post.body}</div>
    </article>
  )
}

export default PostDetail
