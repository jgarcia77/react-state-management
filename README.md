#   State Management using Redux Toolkit
>   This is a tutorial that will guide you through moving component state to a Redux store.
## I).  Setup Local Development
>   Follow these steps to ensure you can run the application.
    You should be able to add and remove comments and todos.
1. `git checkout redux-instructional`
2. `git checkout -b {YOUR_BRANCH_NAME}`
3. `npm i`
4. `npm start`
##  II).  Setup Redux
>   Follow these steps to create the Redux store and make it available to the entire application
1.  Open **GlobalState.js**
2.  Add the following code
    ```js
    import { configureStore } from '@reduxjs/toolkit'

    export const store = configureStore({
        reducer: {},
    });
    ```
3.  Open **index.js**
4.  Add the following imports
    ```js
    import { store } from './state/GlobalState'
    import { Provider } from 'react-redux'
    ```
5.  Wrap the `<App />` with `<Provider>`
    ```js
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
    ```
##  III).  Refactor commenting to use Redux
> Create Redux slice for commenting, remove commenting prop drilling, and consume Redux in commenting related components
### Create Redux slice for commenting
>   Follow these steps to create Redux thunks, slice, and reducer related to commenting and configure the Redux store.
1.  Create a file named **commentingSlice.js** in **src/state**
2.  Import `createSlice` and `createAsyncThunk` from Redux Toolkit
    ```js
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
    ```
3. Import commenting http methods
    ```js
    import { getComments, postComment, deleteComment } from '../http/commentingHttp';
    ```
4. Create an initial state object
    ```js
    const initialState = {
        comments: [],
        commentsError: ''
    };
    ```
5. Create thunks for fetching comments, creating a comment, and deleting a comment

    ```js
    export const getCommentsThunk = createAsyncThunk(
        'commenting/fetchStatus',
        async () => {
            return await getComments();
        }
    );

    export const postCommentThunk = createAsyncThunk(
        'commenting/postStatus',
        async (value) => {
            return await postComment(value);
        }
    );

    export const deleteCommentThunk = createAsyncThunk(
        'commenting/deleteStatus',
        async (id) => {
            await deleteComment(id);
            return id;
        }
    );
    ```

6. Create `commentingSlice`
    ```js
    export const commentingSlice = createSlice({
        name: 'commenting',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            // Get comments actions
            builder.addCase(getCommentsThunk.pending, (state) => {
                state.commentsError = '';
            });
            builder.addCase(getCommentsThunk.rejected, (state) => {
                state.commentsError = 'Failed to load comments';
            });
            builder.addCase(getCommentsThunk.fulfilled, (state, action) => {
                state.comments = action.payload;
            });


            // Post comment actions
            builder.addCase(postCommentThunk.pending, (state) => {
                state.commentsError = '';
            });
            builder.addCase(postCommentThunk.rejected, (state) => {
                state.commentsError = 'Failed to add comment';
            });
            builder.addCase(postCommentThunk.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            });


            // Delete comment actions
            builder.addCase(deleteCommentThunk.pending, (state) => {
                state.commentsError = '';
            });
            builder.addCase(deleteCommentThunk.rejected, (state) => {
                state.commentsError = 'Failed to delete comment';
            });
            builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            });
        }
    });
    ```
7. Export state selectors and reducer
    ```js
    export const selectComments = (state) => state.commenting.comments;
    export const selectCommentsError = (state) => state.commenting.commentsError;
    export default commentingSlice.reducer;
    ```
8. Configure the store with the commenting reducer
    - Open **GlobalState.js**
    - Import `combineReducers` from Redux Toolkit
        ```js
        import { configureStore, combineReducers } from '@reduxjs/toolkit'
        ```
    - Import commenting reducer
        ```js
        import commetingReducer from './commentingSlice'
        ```
    - Add commenting reducer to the store configuration using the `combineReducers` method
        ```js
        export const store = configureStore({
            reducer: combineReducers({
                commenting: commetingReducer
            })
        });
        ````
### Remove commenting prop drilling
> Follow these steps to remove prop drilling from commenting related components.

1. Open **App.js**
2. Delete import statements related to commenting http methods
    ```js
    import { getComments, postComment, deleteComment } from './http/commentingHttp';
    ```
3. Delete commenting state variables
    ```js
    const [comments, setComments] = useState([]);
    const [commentsError, setCommentsError] = useState("");
    ```
4. Delete commenting methods and event handlers
    ```js
    const loadComments = async () => {
        const data = await getComments();
        setComments(data);
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
    ```
5. Delete fetching comments in the useEffect()
    ```js
    try {
        const commentsResponse = await getComments();

        if (commentsResponse.length != 0) {
          setComments(commentsResponse);
        }
      } catch (e) {
        setCommentsError('Failed to load comments')
    }
    ```
6. Remove commenting prop drilling from the following components
    ```js
    <MessageBanner todosError={todosError} />
    ```
    ```js
    <CommentCount />
    ```
    ```js
    <Commenting />
    ```
### Consume Redux in commenting related components
> Follow the steps to refactor commenting related components so they interact with Redux API
1. Open **MessageBanner.js**
    - Import `useSelector` from Redux Toolkit
        ```js
        import { useSelector } from 'react-redux';
        ```
    - Import `selectCommentsError` from the `commentingSlice`
        ```js
        import { selectCommentsError } from '../../state/commentingSlice';
        ```
    - Remove `commentsError` prop from `MessageBanner` signature
        ```js
        const MessageBanner = ({ todosError }) => {
        ```
    - Select `commentsError` from Redux
        ```js
        const MessageBanner = ({ todosError }) => {
            const commentsError = useSelector(selectCommentsError);
        ```
2. Open **CommentCount.js**
    - Import `useSelector` from Redux Toolkit
        ```js
        import { useSelector } from 'react-redux';
        ```
    - Import `selectComments` from the `commentingSlice`
        ```js
        import { selectComments } from '../../state/commentingSlice';
        ```
    - Remove `value` prop from `CommentCount` signature
        ```js
        const CommentCount = () => {
        ```
    - Select `comments` from Redux
        ```js
        const CommentCount = () => {
            const comments = useSelector(selectComments);
        ```
    - Replace `{value}` in the count label with `{comments.length}`
        ```js
        <div>Total comments: {comments.length}</div>
        ```
3. Open **Commenting.js**
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
4. Open **AddComment.js**
    - Import `dispatch` from Redux Toolkit
        ```js
        import { useDispatch } from 'react-redux';
        ```
    - Import `postCommentThunk` from the `commentingSlice`
        ```js
        import { postCommentThunk } from '../../state/commentingSlice';
        ```
    - Remove the `onAdd` prop from `AddComment` signature
        ```js
        export const AddComment = () => {
        ```
    - Create `dispatch`
        ```js
        export const AddComment = () => {
            const dispatch = useDispatch();
        ```
    - Replace `onAdd(comment)` in `handleAdd` method with `dispatch(postCommentThunk(comment));`
        ```js
        const handleAdd = () => {
            dispatch(postCommentThunk(comment));
            setComment('');
        }
        ```
5. Open **CommentList.js**
    - Import `useEffect` from React
        ```js
        import { useEffect, useRef } from 'react';
        ```
    - Import `useSelector` and `useDispatch` from Redux Toolkit
        ```js
        import { useSelector, useDispatch } from 'react-redux';
        ```
    - Import `selectComments`, `getCommentsThunk`, and `deleteCommentThunk` from the `commentingSlice`
        ```js
        import { selectComments, getCommentsThunk, deleteCommentThunk } from '../../state/commentingSlice';
        ```
    - Remove `comments` and `onDelete` props from `CommentList` signature
        ```js
        export const CommentList = () => {
        ```
    - Select `comments` from Redux
        ```js
        export const CommentList = () => {
            const comments = useSelector(selectComments);
        ```
    - Create `dispatch`
        ```js
        const dispatch = useDispatch();
        ```
    - Replace `onDelete` call in the `handleDelete`method with `dispatch(deleteCommentThunk(id));`
        ```js
        const handleDelete = (event, id) => {
            event.preventDefault();
            dispatch(deleteCommentThunk(id));
        }
        ```
    - Create a `useEffect()` with the following
        ```js
        useEffect(() => {
            dispatch(getCommentsThunk());
        }, []);
        ```
##  IV). Regression Test
>   Make sure the application runs without errors and perform the following steps.

1.  Add and remove a comment
2.  Add and remove a todo
3.  Stage and commit your changes

##  V).  Refactor todos to use Redux
> Create Redux slice for todos, remove todos prop drilling, and consume Redux in todo related components
### Create Redux slice for todos
>   Follow these steps to create Redux thunks, slice, and reducer related to todos and configure the Redux store.
1.  Create a file named **todosSlice.js** in **src/state**
2.  Import `createSlice` and `createAsyncThunk` from Redux Toolkit
    ```js
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
    ```
3. Import todo http methods
    ```js
    import { getTodos, postTodo, deleteTodo } from '../http/todosHttp';
    ```
4. Create an initial state object
    ```js
    const initialState = {
        todos: [],
        todosError: ''
    };
    ```
5. Create thunks for fetching todos, creating a todo, and deleting a todo

    ```js
    export const getTodosThunk = createAsyncThunk(
        'todos/fetchStatus',
        async () => {
            return await getTodos();
        }
    );

    export const postTodoThunk = createAsyncThunk(
        'todos/postStatus',
        async (value) => {
            return await postTodo(value);
        }
    );

    export const deleteTodoThunk = createAsyncThunk(
        'todos/deleteStatus',
        async (id) => {
            await deleteTodo(id);
            return id;
        }
    );
    ```

6. Create `todosSlice`
    ```js
    export const todosSlice = createSlice({
        name: 'todoList',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            // Get todos actions
            builder.addCase(getTodosThunk.pending, (state) => {
                state.todosError = '';
            });
            builder.addCase(getTodosThunk.rejected, (state) => {
                state.todosError = 'Failed to load todos';
            });
            builder.addCase(getTodosThunk.fulfilled, (state, action) => {
                state.todos = action.payload;
            });


            // Post todo actions
            builder.addCase(postTodoThunk.pending, (state) => {
                state.todosError = '';
            });
            builder.addCase(postTodoThunk.rejected, (state) => {
                state.todosError = 'Failed to add todo';
            });
            builder.addCase(postTodoThunk.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            });


            // Delete todo actions
            builder.addCase(deleteTodoThunk.pending, (state) => {
                state.todosError = '';
            });
            builder.addCase(deleteTodoThunk.rejected, (state) => {
                state.todosError = 'Failed to delete todo';
            });
            builder.addCase(deleteTodoThunk.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
        }
    });
    ```
7. Export state selectors and reducer
    ```js
    export const selectTodos = (state) => state.todoList.todos;
    export const selectTodosError = (state) => state.todoList.todosError;
    export default todosSlice.reducer;
    ```
8. Configure the store with the todo reducer
    - Open **GlobalState.js**
    - Import todo reducer
        ```js
        import todosReducer from './todosSlice';
        ```
    - Add todo reducer to the store configuration using the `combineReducers` method
        ```js
        export const store = configureStore({
            reducer: combineReducers({
                commenting: commetingReducer,
                todoList: todosReducer
            })
        });
        ````
### Remove todos prop drilling
> Follow these steps to remove prop drilling from todos related components.

1. Open **App.js**
2. Delete import statements related to commenting http methods
    ```js
    import { getTodos, postTodo, deleteTodo } from './http/todosHttp';
    ```
3. Delete todos state variables
    ```js
    const [todos, setTodos] = useState([]);
    const [todosError, setTodosError] = useState("");
    ```
4. Delete todos methods and event handlers
    ```js
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
    ```
5. Delete fetching the useEffect()
    ```js
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
    ```
6. Remove todos prop drilling from the following components
    ```js
    <MessageBanner />
    ```
    ```js
    <TodoCount />
    ```
    ```js
    <Todo />
    ```
7. Remove imports `useState`, `useEffect`, `useCallback`
    ```js
    import { useRef, useState, useEffect, useCallback } from 'react';
    ```git
### Consume Redux in todos related components
> Follow the steps to refactor todos related components so they interact with Redux API
1. Open **MessageBanner.js**
    - Import `selectTodosError` from the `todosSlice`
        ```js
        import { selectTodosError } from '../../state/todosSlice';
        ```
    - Remove `todosError` prop from `MessageBanner` signature
        ```js
        const MessageBanner = () => {
        ```
    - Select `todosError` from Redux
        ```js
        const todosError = useSelector(selectTodosError);
        ```
2. Open **TodoCount.js**
    - Import `useSelector` from the Redux Toolkit
        ```js
        import { useSelector } from 'react-redux';
        ```
    - Import `selectTodos` from the `todosSlice`
        ```js
        import { selectTodos } from '../../state/todosSlice';
        ```
    - Remove `value` prop from `TodoCount` signature
        ```js
        const TodoCount = () => {
        ```
    - Select `todos` from Redux
        ```js
        const TodoCount = () => {
            const todos = useSelector(selectTodos);
        ```
    - Replace `{value}` in the count label with `{todos.length}`
        ```js
        <div>Total todo's: {todos.length}</div>
        ```
3. Open **Todo.js**
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
4. Open **AddTodo.js**
    - Import `dispatch` from Redux Toolkit
        ```js
        import { useDispatch } from 'react-redux';
        ```
    - Import `postTodoThunk` from the `todosSlice`
        ```js
        import { postTodoThunk } from '../../state/todosSlice';
        ```
    - Remove the `onAdd` prop from `AddTodo` signature
        ```js
        export const AddTodo = () => {
        ```
    - Create `dispatch`
        ```js
        export const AddTodo = () => {
            const dispatch = useDispatch();
        ```
    - Replace `onAdd(todo)` in `handleAdd` method with `dispatch(postTodoThunk(todo));`
        ```js
        const handleAdd = () => {
            dispatch(postTodoThunk(todo));
            setTodo('');
        }
        ```
5. Open **TodoList.js**
    - Import `useEffect` from React
        ```js
        import { useEffect, useRef } from 'react';
        ```
    - Import `useSelector` and `useDispatch` from Redux Toolkit
        ```js
        import { useSelector, useDispatch } from 'react-redux';
        ```
    - Import `selectTodos`, `getTodosThunk`, and `deleteTodoThunk` from the `todosSlice`
        ```js
        import { selectTodos, getTodosThunk, deleteTodoThunk } from '../../state/todosSlice';
        ```
    - Remove `todos` and `onDelete` props from `TodoList` signature
        ```js
        export const TodoList = () => {
        ```
    - Select `todos` from Redux
        ```js
        export const TodoList = () => {
            const todos = useSelector(selectTodos);
        ```
    - Create `dispatch`
        ```js
        const dispatch = useDispatch();
        ```
    - Replace `onDelete` call in the `handleDelete`method with `dispatch(deleteTodoThunk(id));`
        ```js
        const handleDelete = (event, id) => {
            event.preventDefault();
            dispatch(deleteTodoThunk(id));
        }
        ```
    - Create a `useEffect()` with the following
        ```js
        useEffect(() => {
            dispatch(getTodosThunk());
        }, []);
        ```
##  VI). Regression Test
>   Make sure the application runs without errors and perform the following steps.

1.  Add and remove a comment
2.  Add and remove a todo
3.  Stage and commit your changes