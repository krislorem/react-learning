import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入新事项"
        />
        <button
          onClick={addTodo}
        >
          添加
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              margin: '10px 0',
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
