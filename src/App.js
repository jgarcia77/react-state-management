import { useRef, useState, useEffect, useCallback } from 'react';
import { Title } from './components/common/Title'
import { Renders } from './components/common/Renders';
import { CommentCount } from './components/commenting/CommentCount';
import { Commenting } from './components/commenting/Commenting';
import { TodoCount } from './components/todos/TodoCount';
import { Todo } from './components/todos/Todo';
import { MessageBanner } from './components/common/MessageBanner';
import { getComments, postComment, deleteComment } from './http/commentingHttp';
import { getTodos, postTodo, deleteTodo } from './http/todosHttp';

import './App.css';

function App() {
  const renders = useRef(0);
  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState("");
  const [todos, setTodos] = useState([]);
  const [todosError, setTodosError] = useState("");

  const loadComments = async () => {
    const data = await getComments();
    setComments(data);
  };

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleCommentAdd = useCallback(async (comment) => {
    try {
      await postComment(comment);
      await loadComments();
    } catch {
      setCommentsError('Failed to add comment');
    }
  }, [comments]);

  const handleCommentDelete = useCallback(async (id) => {
    try {
      await deleteComment(id);
      await loadComments();
    } catch {
      setCommentsError('Failed to remove comment');
    }
  }, [comments]);

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
        const commentsResponse = await getComments();

        if (commentsResponse.length !== 0) {
          setComments(commentsResponse);
        }
      } catch (e) {
        setCommentsError('Failed to load comments')
      }

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
          <Title text="State Management in React" subText="React useState hook" />
      </header>
      <main>
        <MessageBanner commentsError={commentsError} todosError={todosError} />
        <div className="dashboard">
          <CommentCount value={comments.length} />
          <TodoCount value={todos.length} />
        </div>
        <div className="content">
          <Commenting 
            onAdd={handleCommentAdd}
            onDelete={handleCommentDelete}
            comments={comments} />
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
