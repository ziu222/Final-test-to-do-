import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: crypto.randomUUID(), text: 'Do coding challenges', active: true },
    { id: crypto.randomUUID(), text: 'Do coding challenges', active: true },
    { id: crypto.randomUUID(), text: 'Do coding challenges', active: false },
  ])
  const [tab, setTab] = useState('all')

  let visibleTasks = tasks
  if (tab === 'active') visibleTasks = tasks.filter((t) => t.active)
  if (tab === 'completed') visibleTasks = tasks.filter((t) => !t.active)

  return (
    <div id="todo_app">
      <h1>#todo</h1>

      <div className="tabs">
        <button
          className={tab === 'all' ? 'tab tab_active' : 'tab'}
          onClick={() => setTab('all')}
        >
          All
        </button>
        <button
          className={tab === 'active' ? 'tab tab_active' : 'tab'}
          onClick={() => setTab('active')}
        >
          Active
        </button>
        <button
          className={tab === 'completed' ? 'tab tab_active' : 'tab'}
          onClick={() => setTab('completed')}
        >
          Completed
        </button>
      </div>

      <ul className="task_list">
        {visibleTasks.map((t) => (
          <li key={t.id} className={t.active ? 'task_row' : 'task_row completed'}>
            <input type="checkbox" checked={!t.active} readOnly />
            <span className="task_text">{t.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
