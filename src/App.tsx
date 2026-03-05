import React, { useEffect, useState } from 'react';
import './App.css';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => res.json())
      .then((data: Todo[]) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  if (loading) {
    return (
      <div className="App" data-testid="loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="App">
      <h1 data-testid="app-title">QA Workshop</h1>
      <ul className="todo-list" data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item" data-testid={`todo-item-${todo.id}`}>
            <label className="todo-label" data-testid={`todo-label-${todo.id}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
