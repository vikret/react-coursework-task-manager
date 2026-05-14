import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (email === '' || password === '') {
      setMessage('Please fill in all fields.')
      return
    }

    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((users) => {
        const loggedUser = users.find((user) => {
          return user.email === email && user.password === password
        })

        if (!loggedUser) {
          setMessage('Invalid email or password.')
          return
        }

        localStorage.setItem('loggedUser', JSON.stringify(loggedUser))

        setMessage(`Logged in as ${loggedUser.name}`)

        setTimeout(() => {
          navigate('/dashboard')
          window.location.reload()
        }, 800)
      })
      .catch((error) => {
        console.error('Error logging in:', error)
        setMessage('Something went wrong. Please try again.')
      })
  }

  return (
    <section className="form-page">
      <h1>Login</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      {message && <p className="message">{message}</p>}
    </section>
  )
}

export default Login