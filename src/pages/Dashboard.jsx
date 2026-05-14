import { useEffect, useState } from 'react'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [deadline, setDeadline] = useState('')
  const [status, setStatus] = useState('Pending')
  const [editingTaskId, setEditingTaskId] = useState(null)

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

  function resetForm() {
    setTitle('')
    setSubject('')
    setDeadline('')
    setStatus('Pending')
    setEditingTaskId(null)
  }

  function handleSubmitTask(event) {
    event.preventDefault()

    if (title === '' || subject === '' || deadline === '') {
      alert('Please fill in all fields.')
      return
    }

    const taskData = {
      title: title,
      subject: subject,
      deadline: deadline,
      status: status
    }

    if (editingTaskId === null) {
      fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })
        .then((response) => response.json())
        .then((createdTask) => {
          setTasks([...tasks, createdTask])
          resetForm()
        })
        .catch((error) => {
          console.error('Error adding task:', error)
        })
    } else {
      fetch(`http://localhost:3001/tasks/${editingTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: editingTaskId,
          ...taskData
        })
      })
        .then((response) => response.json())
        .then((updatedTask) => {
          const updatedTasks = tasks.map((task) => {
            if (task.id === editingTaskId) {
              return updatedTask
            }

            return task
          })

          setTasks(updatedTasks)
          resetForm()
        })
        .catch((error) => {
          console.error('Error updating task:', error)
        })
    }
  }

  function handleEditTask(task) {
    setTitle(task.title)
    setSubject(task.subject)
    setDeadline(task.deadline)
    setStatus(task.status)
    setEditingTaskId(task.id)
  }

  function handleDeleteTask(id) {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== id)
        setTasks(updatedTasks)

        if (editingTaskId === id) {
          resetForm()
        }
      })
      .catch((error) => {
        console.error('Error deleting task:', error)
      })
  }

  if (loading) {
    return <p>Loading tasks...</p>
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Here are your university tasks loaded from the REST API.</p>

      <form className="form-card task-form" onSubmit={handleSubmitTask}>
        <h2>{editingTaskId === null ? 'Add New Task' : 'Edit Task'}</h2>

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

        <button type="submit">
          {editingTaskId === null ? 'Add Task' : 'Save Changes'}
        </button>

        {editingTaskId !== null && (
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h2>{task.title}</h2>
            <p><strong>Subject:</strong> {task.subject}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
            <p><strong>Status:</strong> {task.status}</p>

            <div className="task-actions">
              <button
                className="edit-button"
                onClick={() => handleEditTask(task)}
              >
                Edit
              </button>

              <button
                className="delete-button"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Dashboard