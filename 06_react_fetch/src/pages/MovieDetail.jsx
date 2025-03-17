import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/movie.css'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://apis.tianapi.com/film/index`, {
          params: {
            key: '01ec44276c2572b94f9a2769680fb397',
            num: 1,
            page: id
          }
        })

        if (response.data.code === 200 && response.data.result.newslist.length > 0) {
          setMovie(response.data.result.newslist[0])
        } else {
          setError('Movie not found')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  if (loading) return <div className="loading-container">Loading movie details...</div>
  if (error) return <div className="error-container">Error: {error}</div>
  if (!movie) return <div className="error-container">Movie not found</div>

  return (
    <div className="movie-detail-container glass-effect">
      <button onClick={() => navigate('/movies')} className="back-button glass-effect">
        Back to Movies
      </button>
      <div className="movie-detail-content">
        <img src={movie.picUrl} alt={movie.title} className="movie-detail-image" />
        <div className="movie-detail-info">
          <h1 className="movie-detail-title">{movie.title}</h1>
          <p className="movie-detail-description">{movie.description}</p>
          <div className="movie-detail-meta">
            <span>{movie.ctime}</span>
            <a href={movie.url} target="_blank" rel="noopener noreferrer" className="source-link">
              Source
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
