import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: crypto.randomUUID(), text: 'Do coding challenges', active: true },
    { id: crypto.randomUUID(), text: 'Do coding challenges', active: true },
    { id: crypto.randomUUID(), text: 'Do coding challenges', active: false },
  ])
  const [tab, setTab] = useState('all')
  const [inputValue, setInputValue] = useState('')

  let visibleTasks = tasks
  if (tab === 'active') visibleTasks = tasks.filter((t) => t.active)
  if (tab === 'completed') visibleTasks = tasks.filter((t) => !t.active)

  function handleAdd(e) {
    e.preventDefault()
    if (!inputValue.trim()) return
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: inputValue.trim(), active: true },
    ])
    setInputValue('')
  }

  function handleToggle(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t)),
    )
  }

  function handleDeleteOne(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function handleDeleteAllCompleted() {
    setTasks((prev) => prev.filter((t) => t.active))
  }

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

      {tab !== 'completed' && (
        <form className="add_row" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="add details"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      )}

      <ul className="task_list">
        {visibleTasks.map((t) => (
          <li key={t.id} className={t.active ? 'task_row' : 'task_row completed'}>
            <input
              type="checkbox"
              checked={!t.active}
              onChange={() => handleToggle(t.id)}
            />
            <span className="task_text">{t.text}</span>
            {tab === 'completed' && (
              <button
                type="button"
                className="delete_btn"
                onClick={() => handleDeleteOne(t.id)}
              >
                🗑
              </button>
            )}
          </li>
        ))}
      </ul>

      {tab === 'completed' && (
        <div className="delete_all_row">
          <button
            type="button"
            className="delete_all_btn"
            onClick={handleDeleteAllCompleted}
          >
            🗑 delete all
          </button>
        </div>
      )}
    </div>
  )
}

export default App
