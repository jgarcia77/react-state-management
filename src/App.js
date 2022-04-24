import { useRef, useState, useEffect, useCallback } from 'react';
import { Title } from './components/common/Title'
import { Renders } from './components/common/Renders';
import { CommentCount } from './components/commenting/CommentCount';
import { Commenting } from './components/commenting/Commenting';
import { TodoCount } from './components/todos/TodoCount';
import { Todo } from './components/todos/Todo';
import { MessageBanner } from './components/common/MessageBanner';
import { getTodos, postTodo, deleteTodo } from './http/todosHttp';

import './App.css';

function App() {
  const renders = useRef(0);
  const [todos, setTodos] = useState([]);
  const [todosError, setTodosError] = useState("");

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleTodoAdd = useCallback(async (todo) => {
    try {
      await postTodo(todo);
      await loadTodos();
    } catch {
      setTodosError('Failed to add todo');
    }
  }, [todos]);

  const handleTodoDelete = useCallback(async (id) => {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch {
      setTodosError('Failed to remove todo');
    }
  }, [todos]);

  useEffect(() => {
    const initData = async () => {
      try {
        const todosResponse = await getTodos();

        if (todosResponse.length !== 0) {
          setTodos(todosResponse);
        }
      } catch {
        setTodosError('Failed to load todo\'s')
      }
    }

    initData();
  }, []);

  return (
    <>
      <Renders name="App" value={renders.current++} />
      <header className="dashed-wrapper">
          <Title text="State Management in React" subText="Redux Toolkit" />
      </header>
      <main>
        <MessageBanner todosError={todosError} />
        <div className="dashboard">
          <CommentCount />
          <TodoCount value={todos.length} />
        </div>
        <div className="content">
          <Commenting />
          <Todo 
            onAdd={handleTodoAdd}
            onDelete={handleTodoDelete}
            todos={todos} />
        </div>
        
      </main>
    </>
  );
}

export default App;
