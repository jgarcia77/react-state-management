import { useRef, useState, useEffect, useCallback } from 'react';
import { Title } from './components/common/Title'
import { Renders } from './components/common/Renders';
import { CommentCount } from './components/commenting/CommentCount';
import { Commenting } from './components/commenting/Commenting';
import { TodoCount } from './components/todos/TodoCount';
import { Todo } from './components/todos/Todo';
import { MessageBanner } from './components/common/MessageBanner';

import './App.css';

function App() {
  const renders = useRef(0);

  return (
    <>
      <Renders name="App" value={renders.current++} />
      <header className="dashed-wrapper">
          <Title text="State Management in React" subText="Redux Toolkit" />
      </header>
      <main>
        <MessageBanner />
        <div className="dashboard">
          <CommentCount />
          <TodoCount />
        </div>
        <div className="content">
          <Commenting />
          <Todo />
        </div>
        
      </main>
    </>
  );
}

export default App;
