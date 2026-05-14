import { useEffect, useState } from 'react'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [])

  if (loading) {
    return <p>Loading tasks...</p>
  }

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Here are your university tasks loaded from the REST API.</p>

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