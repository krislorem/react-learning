import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/movie.css'

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [totalRecords, setTotalRecords] = useState(0)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`https://apis.tianapi.com/film/index`, {
          params: {
            key: '01ec44276c2572b94f9a2769680fb397',
            num: pageSize,
            page: currentPage
          }
        })

        if (response.data.code === 200) {
          setMovies(response.data.result.newslist)
          setTotalRecords(response.data.result.total)
          setTotalPages(Math.ceil(response.data.result.total / pageSize))
        } else {
          setError('Failed to fetch movies')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [currentPage, pageSize])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (event) => {
    const newPageSize = Number(event.target.value)
    setPageSize(newPageSize)
    setCurrentPage(1)
  }

  if (loading) return <div className="loading-container">Loading movies...</div>
  if (error) return <div className="error-container">Error: {error}</div>

  return (
    <div className="movie-container">
      <h2 className="movie-title">Movie Information</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.title} className="movie-card glass-effect">
            <img src={movie.picUrl} alt={movie.title} className="movie-image" />
            <div className="movie-content">
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <div className="movie-meta">
                <span>{movie.ctime}</span>
                <Link to={`/movie/${(currentPage - 1) * pageSize + movies.indexOf(movie) + 1}`} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls glass-effect">
        <div className="page-size-control">
          <label>Items per page: </label>
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
          </select>
          <span className="total-records">Total: {totalRecords} items</span>
        </div>
        <div className="pagination glass-effect">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="page-button"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-button"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              const start = Math.max(1, currentPage - 2)
              const end = Math.min(totalPages, currentPage + 2)
              return page >= start && page <= end
            })
            .map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`page-button ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="page-button"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieList
