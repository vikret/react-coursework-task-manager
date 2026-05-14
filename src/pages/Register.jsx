import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    if (name === '' || email === '' || password === '') {
      setMessage('Please fill in all fields.')
      return
    }

    const newUser = {
      name: name,
      email: email,
      password: password
    }

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then((response) => response.json())
      .then(() => {
        setMessage('Account created successfully. You can now log in.')

        setName('')
        setEmail('')
        setPassword('')

        setTimeout(() => {
          navigate('/login')
        }, 1000)
      })
      .catch((error) => {
        console.error('Error creating user:', error)
        setMessage('Something went wrong. Please try again.')
      })
  }

  return (
    <section className="form-page">
      <h1>Register</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

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
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      {message && <p className="message">{message}</p>}
    </section>
  )
}

export default Register