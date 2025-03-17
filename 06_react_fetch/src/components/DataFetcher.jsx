// 导入必要的 React 钩子
import { useState, useEffect } from 'react'

// 创建 DataFetcher 组件
const DataFetcher = () => {
  // 定义状态变量来存储帖子数据、加载状态和错误信息
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 使用 useEffect 在组件挂载时获取数据
  useEffect(() => {
    // 定义异步函数来获取数据
    const fetchPosts = async () => {
      try {
        // 发起 GET 请求获取帖子数据
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')

        // 检查响应状态
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        // 将响应数据转换为 JSON 格式
        const data = await response.json()

        // 更新状态，存储获取到的数据
        setPosts(data)
        setLoading(false)
      } catch (err) {
        // 如果发生错误，更新错误状态
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
      <h2>Posts</h2>
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

export default DataFetcher
