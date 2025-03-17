// 导入必要的 React 钩子和 axios
import { useState, useEffect } from 'react'
import axios from 'axios'

// 创建 AxiosDataFetcher 组件
const AxiosDataFetcher = () => {
  // 定义状态变量来存储帖子数据、加载状态和错误信息
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 使用 useEffect 在组件挂载时获取数据
  useEffect(() => {
    // 定义异步函数来获取数据
    const fetchPosts = async () => {
      try {
        // 使用 axios 发起 GET 请求获取帖子数据
        // axios 会自动将响应数据转换为 JSON 格式
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { _limit: 5 } // 限制获取5条数据
        })

        // 更新状态，存储获取到的数据
        setPosts(response.data)
        setLoading(false)
      } catch (err) {
        // 如果发生错误，更新错误状态
        // axios 的错误对象包含更详细的错误信息
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

  // 渲染帖子数据
  return (
    <div>
      <h2>Posts (Axios)</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AxiosDataFetcher
