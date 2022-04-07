#   State Management using React useContext hook
>   This is a tutorial that will guide you through moving component state to a React context.
## I).  Setup Local Development
>   Follow these steps to ensure you can run the application.
    You should be able to add and remove comments and todos.
1. `git checkout context-instructional`
2. `git checkout -b {YOUR_BRANCH_NAME}`
3. `npm i`
4. `npm start`
##  II). Create Context and Provider
>   Follow these steps to move state variables and methods from **App.js** to **GlobalState.js**.
1.  Open **GlobalState.js**
2.  Add the following code
    1.  Create context with state variables and event handlers in **App.js**
        -   `comments, commentsError, todos, todosError, handleCommentAdd, handleCommentDelete, handleTodoAdd, handleTodoDelete`
        -   Defining these methods exposes them in intellisense
        ```js
        import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
        import { getComments, postComment, deleteComment } from '../http/commentingHttp';
        import { getTodos, postTodo, deleteTodo } from '../http/todosHttp';

        const GlobalStateContext = createContext({
            comments: [],
            commentsError: '',
            todos: [],
            todosError: '',
            handleCommentAdd: async (comment) => {},
            handleCommentDelete: async (id) => {},
            handleTodoAdd: async (todo) => {},
            handleTodoDelete: async (id) => {}
        });
        ```
    2.  Create provider wrapper and copy state implementation from **App.js**
        -   `useState` hooks
        -   `useEffect` hooks
        -   methods and event handlers
        -   return `GlobalStateContext.Provider` with state variables and event handlers
        ```js
        export const GlobalStateProvider = ({children}) => {
            const [comments, setComments] = useState([]);
            const [commentsError, setCommentsError] = useState("");
            const [todos, setTodos] = useState([]);
            const [todosError, setTodosError] = useState("");

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

            return (
                <GlobalStateContext.Provider value={{
                    comments,
                    commentsError,
                    todos,
                    todosError,
                    handleCommentAdd,
                    handleCommentDelete,
                    handleTodoAdd,
                    handleTodoDelete
                }}>
                    {children}
                </GlobalStateContext.Provider>
            );
        };
        ```
    3.  Export `GlobalStateContext` with useContext hook
        ```js
        export const useGlobalStateContext = () => useContext(GlobalStateContext);
        ```
## III).    Consume Context and Provider
>   Follow these steps to replace prop drilling with the React context.
1.  Open **index.js**
    -  Import `GlobalStateProvider` and wrap it around `<App />` component
        ```js
        import { GlobalStateProvider } from './state/GlobalState';

        ReactDOM.render(
            <GlobalStateProvider>
                <App />
            </GlobalStateProvider>,
            document.getElementById('root')
        );
        ```
3. Replace prop drilling with context
    -   Open **App.js**
        -   Delete imports `useState, useEffect, useCallback`
            ```js
            import { useRef } from 'react';
            ```
        -   Delete import statements
            ```js
            import { getComments, postComment, deleteComment } from './http/commentingHttp';
            import { getTodos, postTodo, deleteTodo } from './http/todosHttp';
            ```js
        -   Delete state variables, event handlers, and methods
            ```js
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

                    if (commentsResponse.length != 0) {
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
            ```
        -   Remove props from `<MessageBanner />, <CommentCount />, <TodoCount />, <Commenting />, <Todo />`
            ```js
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
            ```
    -   Open **MessageBanner.js**
        -   Import `useGlobalStateContext` hook
            ```js
            import { useGlobalStateContext } from '../../state/GlobalState';
            ```
        -   Remove props `commentsError, todosError` from `MessageBanner` signature
            ```js
            const MessageBanner = () => {
            ```
        -   Deconstruct `commentsError, todosError` from `useGlobalStateContext` hook
            ```js
            const MessageBanner = () => {
                const { commentsError, todosError } = useGlobalStateContext();
            ```
    -   Open **CommentCount.js**
        -   Import `useGlobalStateContext` hook
            ```js
            import { useGlobalStateContext } from '../../state/GlobalState';
            ```
        -   Remove prop `value` from `CommentCount` signature
            ```js
            const CommentCount = () => {
            ```
        -   Deconstruct `comments` from `useGlobalStateContext` hook
            ```js
            const CommentCount = () => {
                const { comments } = useGlobalStateContext();
            ```
        -   Replace `{value}` in the count label with `{comments.length}`
            ```js
            <div>Total comments: {comments.length}</div>
            ```
    -   Open **TodoCount.js**
        -   Import `useGlobalStateContext` hook
            ```js
            import { useGlobalStateContext } from '../../state/GlobalState';
            ```
        -   Remove prop `value` from `TodoCount` signature
            ```js
            const TodoCount = () => {
            ```
        -   Deconstruct `todos` from `useGlobalStateContext` hook
            ```js
            const TodoCount = () => {
                const { todos } = useGlobalStateContext();
            ```
        -   Replace `{value}` in the count label with `{todos.length}`
            ```js
            <div>Total todo's: {todos.length}</div>
            ```
    -   Open **Commenting.js**
        - Remove `onAdd`, `onDelete`, and `comments` props from `Commenting` signature
            ```js
            const Commenting = () => {
            ```
        - Remove prop drilling from the following components
            ```js
            <AddComment />
            ```
            ```js
            <CommentList />
            ```
    -   Open **AddComment.js**
        -   Import `useGlobalStateContext` hook
            ```js
            import { useGlobalStateContext } from '../../state/GlobalState';
            ```
        -   Remove prop `onAdd` from `AddComment` signature
            ```js
            export const AddComment = () => {
            ```
        -   Deconstruct `handleCommentAdd` from `useGlobalStateContext` hook
            ```js
            export const AddComment = () => {
                const { handleCommentAdd } = useGlobalStateContext();
            ```
        -   Replace `onAdd` call in the `handleAdd` method with `handleCommentAdd`
            ```js
            const handleAdd = () => {
                handleCommentAdd(comment);
                setComment('');
            }
            ```
    -   Open **CommentList.js**
        -   Import `useGlobalStateContext` hook
            ```js
            import { useGlobalStateContext } from '../../state/GlobalState';
            ```
        -   Remove props `comments, onDelete` from `CommentList` signature
            ```js
            export const CommentList = () => {
            ```
        -   Deconstruct `comments, handleCommentDelete` from `useGlobalStateContext` hook
            ```js
            export const CommentList = () => {
                const { comments, handleCommentDelete } = useGlobalStateContext();
            ```
        -   Replace `onDelete` call in the `handleDelete` method with `handleCommentDelete`
            ```js
            const handleDelete = (event, id) => {
                event.preventDefault();
                handleCommentDelete(id);
            }
            ```
    -   Open **Todo.js**
        - Remove `onAdd`, `onDelete`, and `todos` props from `Todo` signature
            ```js
            const Todo = () => {
            ```
        - Remove prop drilling from the following components
            ```js
            <AddTodo />
            ```
            ```js
            <TodoList />
            ```
    -   Open **AddTodo.js**
        -   Import `useGlobalStateContext` hook
            ```js
            import { useGlobalStateContext } from '../../state/GlobalState';
            ```
        -   Remove prop `onAdd` from `AddTodo` signature
            ```js
            export const AddTodo = () => {
            ```
        -   Deconstruct `handleTodoAdd` from `useGlobalStateContext`
            ```js
            export const AddTodo = () => {
                const { handleTodoAdd } = useGlobalStateContext();
            ```
        -   Replace `onAdd` call in the `handleAdd` method with `handleTodoAdd`
            ```js
            const handleAdd = () => {
                handleTodoAdd(todo);
                setTodo('');
            }
            ```
    -   Open **TodoList.js**
        -   Import `useGlobalStateContext` hook
            ```js
            import { useGlobalStateContext } from '../../state/GlobalState';
            ```
        -   Remove props `todos, onDelete` from `TodoList` signature
            ```js
            export const TodoList = () => {
            ```
        -   Deconstruct `todos, handleTodoDelete` from `useGlobalStateContext` hook
            ```js
            export const TodoList = () => {
                const { todos, handleTodoDelete } = useGlobalStateContext();
            ```
        -   Replace `onDelete` call in the `handleDelete` method with `handleTodoDelete`
            ```js
            const handleDelete = (event, id) => {
                event.preventDefault();
                handleTodoDelete(id);
            }
            ```
##  IV). Regression Test
>   Make sure the application runs without errors and perform the following steps.

1.  Add and remove a comment
2.  Add and remove a todo
3.  Stage and commit your changes

##  V). Refactor GlobalState.js (custom hook)
>   Follow these steps to clean up code by creating a custom hook for managing state.

1.  Open **GlobalState.js**
2.  Create new file named **useGlobalState.js** in src/state for the `useGlobalState` custom hook
    -   Copy imports, state variables, event handlers, and methods from **GlobalState.js** to **useGlobalState.js**
        ```js
        import { useState, useEffect, useCallback } from 'react';
        import { getComments, postComment, deleteComment } from '../http/commentingHttp';
        import { getTodos, postTodo, deleteTodo } from '../http/todosHttp';

        export const useGlobalState = () => {
            const [comments, setComments] = useState([]);
            const [commentsError, setCommentsError] = useState("");
            const [todos, setTodos] = useState([]);
            const [todosError, setTodosError] = useState("");

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

            return {
                comments,
                commentsError,
                todos,
                todosError,
                handleCommentAdd,
                handleCommentDelete,
                handleTodoAdd,
                handleTodoDelete
            };
        };
        ```
4.  Update **GlobalState.js**
    -   Remove unnecessary imports `useState, useEffect, useCallback`
        ```js
        import React, { createContext, useContext } from 'react';
        ```
    -   Remove http related imports
        ```js
        import { getComments, postComment, deleteComment } from '../http/commentingHttp';
        import { getTodos, postTodo, deleteTodo } from '../http/todosHttp';
        ```
    -   Import `useGlobalState` custom hook
        ```js
        import { useGlobalState } from './useGlobalState';
        ```
    -   Refactor `GlobalStateProvider`
        -   Remove all state variables, event handlers, and methods
        -   Replace it with deconstruction of `comments, commentsError, todos, todosError, handleCommentAdd, handleCommentDelete, handleTodoAdd, handleTodoDelete` 
        ```js
        export const GlobalStateProvider = ({children}) => {
            const {
                comments,
                commentsError,
                todos,
                todosError,
                handleCommentAdd,
                handleCommentDelete,
                handleTodoAdd,
                handleTodoDelete
            } = useGlobalState();

            return (
                <GlobalStateContext.Provider value={{
                    comments,
                    commentsError,
                    todos,
                    todosError,
                    handleCommentAdd,
                    handleCommentDelete,
                    handleTodoAdd,
                    handleTodoDelete
                }}>
                    {children}
                </GlobalStateContext.Provider>
            );
        }
        ```

## VI). Regression Test
>   Make sure the application runs without errors and perform the following steps.

1.  Add and remove a comment
2.  Add and remove a todo
3.  Stage and commit your changes

##  VII). Refactor GlobalState.js (constate)
>   Follow these steps to use [constate@3.3.0](https://github.com/diegohaz/constate) (a 3rd party library) that helps simplify creating a React context and provider.
    Using this library will help reduce the amount of code need.
    At the time of creating this tutorial the latest version was constate@3.3.0

1.  Open **GlobalState.js** file
2.  Copy and paste the following implementation using constate to simplify the creation of context and provider
    ```js
    import constate from "constate";
    import { useGlobalState } from './useGlobalState';

    const [GlobalStateProvider, useGlobalStateContext] = constate(useGlobalState);

    export { GlobalStateProvider, useGlobalStateContext };
    ```

##  VIII). Regression Test
>   Make sure the application runs without errors and perform the following steps.

1.  Add and remove a comment
2.  Add and remove a todo
3.  Stage and commit your changes