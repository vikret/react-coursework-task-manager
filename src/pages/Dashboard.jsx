import { useEffect, useState } from 'react'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [deadline, setDeadline] = useState('')
  const [status, setStatus] = useState('Pending')

  useEffect(() => {
    fetchTasks()
  }, [])

  function fetchTasks() {
    fetch('http://localhost:3001/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading tasks:', error)
        setLoading(false)
      })
  }

  function handleAddTask(event) {
    event.preventDefault()

    if (title === '' || subject === '' || deadline === '') {
      alert('Please fill in all fields.')
      return
    }

    const newTask = {
      title: title,
      subject: subject,
      deadline: deadline,
      status: status
    }

    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then((response) => response.json())
      .then((createdTask) => {
        setTasks([...tasks, createdTask])

        setTitle('')
        setSubject('')
        setDeadline('')
        setStatus('Pending')
      })
      .catch((error) => {
        console.error('Error adding task:', error)
      })
  }

  if (loading) {
    return <p>Loading tasks...</p>
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Here are your university tasks loaded from the REST API.</p>

      <form className="form-card task-form" onSubmit={handleAddTask}>
        <h2>Add New Task</h2>

        <label>Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label>Subject</label>
        <input
          type="text"
          placeholder="Enter subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />

        <label>Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(event) => setDeadline(event.target.value)}
        />

        <label>Status</label>
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h2>{task.title}</h2>
            <p><strong>Subject:</strong> {task.subject}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
            <p><strong>Status:</strong> {task.status}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dashboard