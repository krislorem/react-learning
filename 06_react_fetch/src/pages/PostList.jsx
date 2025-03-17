import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts, deletePost, updatePost } from '../api/request'
import '../styles/article.css'

// 创建 AxiosDataFetcher 组件
const PostList = () => {
  // 定义状态变量来存储帖子数据、加载状态和错误信息
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 编辑相关状态
  const [editingPost, setEditingPost] = useState(null)
  const [editFormData, setEditFormData] = useState({ title: '', body: '' })

  // 使用 useEffect 在组件挂载时获取数据
  useEffect(() => {
    // 定义异步函数来获取数据
    const fetchPosts = async () => {
      try {
        const data = await getPosts({ _limit: 5 })
        setPosts(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    // 调用获取数据的函数
    fetchPosts()
  }, []) // 空依赖数组表示仅在组件挂载时执行

  // 渲染加载状态
  if (loading) {
    return <div>Loading posts...</div>
  }

  // 渲染错误状态
  if (error) {
    return <div>Error: {error}</div>
  }

  const handleDelete = async (id) => {
    try {
      await deletePost(id)
      setPosts(posts.filter(post => post.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setEditFormData({ title: post.title, body: post.body })
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedPost = await updatePost(editingPost.id, editFormData)
      setPosts(posts.map(post =>
        post.id === editingPost.id ? updatedPost : post
      ))
      setEditingPost(null)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="article-container">
      <h2>文章列表</h2>
      <div className="article-grid">
        {posts.map(post => (
          <div key={post.id} className="article-card">
            <h3 className="article-title">{post.title}</h3>
            <p className="article-body">{post.body.substring(0, 100)}...</p>
            <div className="article-actions">
              <Link to={`/post/${post.id}`} className="btn btn-primary">查看</Link>
              <button onClick={() => handleEdit(post)} className="btn btn-secondary">编辑</button>
              <button onClick={() => handleDelete(post.id)} className="btn btn-danger">删除</button>
            </div>
          </div>
        ))}
      </div>

      {editingPost && (
        <div className="modal">
          <div className="modal-content">
            <h3>编辑文章</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="postTitle">标题</label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="postBody">内容</label>
                <textarea
                  name="body"
                  value={editFormData.body}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">保存</button>
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="btn btn-secondary"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostList
