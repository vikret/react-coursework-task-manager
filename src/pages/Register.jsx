import { useState } from 'react'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (name === '' || email === '' || password === '') {
      setMessage('Please fill in all fields.')
      return
    }

    setMessage(`Account created for ${name}`)
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