import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (email === '' || password === '') {
      setMessage('Please fill in all fields.')
      return
    }

    setMessage(`Logged in as ${email}`)
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