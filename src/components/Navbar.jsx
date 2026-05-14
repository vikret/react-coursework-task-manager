import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

  function handleLogout() {
    localStorage.removeItem('loggedUser')
    navigate('/')
    window.location.reload()
  }

  return (
    <nav className="navbar">
      <h2>Student Task Manager</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {loggedUser ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <span className="user-name">Hello, {loggedUser.name}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar