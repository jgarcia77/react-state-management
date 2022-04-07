#   State Management using Mobx
>   This is a tutorial that will guide you through moving component state to a Mobx stores.
## I).  Setup Local Development
>   Follow these steps to ensure you can run the application.
    You should be able to add and remove comments and todos.
1. `git checkout mobx-instructional`
2. `git checkout -b {YOUR_BRANCH_NAME}`
3. `npm i`
4. `npm start`

##  II).  Refactor commenting to use Mobx
> Create Mobx store for commenting, remove commenting prop drilling, and consume Mobx store in commenting related components

### Create Mobx store for commenting
>   Follow these steps to create Mobx store for commenting
1. Create a file named **CommentingStore.js** in **src/state**
2. Import `action`, `computed`, `makeAutoObservable`, and `observable` from `mobx`
    ```js
    import { action, computed, makeAutoObservable, observable } from "mobx"
    ```
3. Import commenting http methods
    ```js
    import { getComments, postComment, deleteComment } from '../http/commentingHttp';
    ```
4. Create store
    ```js
    export default class CommentingStore {
        comments = [];
        commentsError = "";

        constructor() {
            makeAutoObservable(this, {
                comments: observable,
                commentsError: observable,
                loadComments: action,
                addComment: action,
                removeComment: action,
                count: computed,
                hasError: computed
            });
        }

        get count() {
            return this.comments.length;
        }

        get hasError () {
            return !!this.commentsError;
        }

        async loadComments() {
            this.commentsError = '';

            try {
                const comments = await getComments();
                this.comments = comments;
            } catch {
                this.commentsError = 'Failed to load comments';
            };
        }

        async addComment(comment) {
            this.commentsError = '';

            try {
                const newComment = await postComment(comment);
                this.comments.push(newComment);
            } catch {
                this.commentsError = 'Failed to add comment';
            }
        }

        async removeComment(id) {
            this.commentsError = '';

            try {
                await deleteComment(id);
                this.comments = this.comments.filter(comment => comment.id !== id);
            } catch {
                this.commentsError = 'Failed to delete comment';
            }
        }
    };
    ```
5. Open **GlobalState.js**
6. Import `CommentingStore`
    ```js
    import CommentingStore from "./CommentingStore";
    ```
7. Create an instance of the store
    ```js
    const commentingStore = new CommentingStore();
    ```
8. Export the instance
    ```js
    export { commentingStore };
    ```
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

### Consume Mobx store in commenting related components
> Follow the steps to refactor commenting related components so they consume the Mobx store.
1. Open **MessageBanner.js**
    - Import `observer` from Mobx
        ```js
        import { observer } from "mobx-react-lite"
        ```
    - Import `commentingStore` from `GlobalState`
        ```js
        import { commentingStore } from '../../state/GlobalState';
        ```
    - Remove `commentsError` prop from `MessageBanner` signature and wrap the function with `observer` (do not forget the closing parenthesis)
        ```js
        const MessageBanner = observer(({ todosError }) => {
            ...
        });
        ```
    - Replace `commentsError` with the `commentingStore`
        ```js
        {!commentingStore.hasError && <InfoMessage message="Please enter a comment" className="info-message__commenting" />}
        {commentingStore.hasError && <ErrorMessage message={commentingStore.commentsError} />}
        ```
2. Open **CommentCount.js**
    - Import `observer` from Mobx
        ```js
        import { observer } from "mobx-react-lite"
        ```
    - Import `commentingStore` from `GlobalState`
        ```js
        import { commentingStore } from '../../state/GlobalState';
        ```
    - Remove `value` prop from `CommentCount` signature and wrap the function with `observer` (do not forget the closing parenthesis)
        ```js
        const CommentCount = observer(() => {
            ...
        });
        ```
    - Replace `{value}` in the count label with `{commentingStore.count}`
        ```js
        <div>Total comments: {commentingStore.count}</div>
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
    - Import `observer` from Mobx
        ```js
        import { observer } from "mobx-react-lite"
        ```
    - Import `commentingStore` from `GlobalState`
        ```js
        import { commentingStore } from '../../state/GlobalState';
        ```
    - Remove the `onAdd` prop from `AddComment` signature and wrap the function with `observer` (do not forget the closing parenthesis)
        ```js
        export const AddComment = observer(() => {
            ...
        });
        ```
    - Replace `onAdd(comment)` in `handleAdd` method with `commentingStore.addComment(comment);`
        ```js
        const handleAdd = () => {
            commentingStore.addComment(comment);
            setComment('');
        }
        ```
5. Open **CommentList.js**
    - Import `useEffect` from React
        ```js
        import { useEffect, useRef } from 'react';
        ```
    - Import `observer` from Mobx
        ```js
        import { observer } from "mobx-react-lite"
        ```
    - Import `commentingStore` from `GlobalState`
        ```js
        import { commentingStore } from '../../state/GlobalState';
        ```
    - Remove `comments` and `onDelete` props from `CommentList` signature and wrap the function with `observer` (do not forget the closing parenthesis)
        ```js
        export const CommentList = observer(() => {
            ...
        });
        ```
    - Replace `comments` with `commentingStore`
        ```js
        const renderItems = commentingStore.count !== 0;
        ```
        ```js
        {commentingStore.comments.map(({ id, value }) => <li key={id}>{value} <a href="" onClick={(e) => handleDelete(e, id)}>remove</a></li>)}
        ```
    - Replace `onDelete` call in the `handleDelete`method with `commentingStore.removeComment(id);`
        ```js
        const handleDelete = (event, id) => {
            event.preventDefault();
            commentingStore.removeComment(id);
        }
        ```
    - Create a `useEffect()` with the following
        ```js
        useEffect(() => {
            commentingStore.loadComments();
        }, []);
        ```
##  III). Regression Test
>   Make sure the application runs without errors and perform the following steps.

1.  Add and remove a comment
2.  Add and remove a todo
3.  Stage and commit your changes

##  IV).  Refactor todos to use Mobx store
> Create Mobx store for todos, remove todos prop drilling, and consume Mobx store in todo related components

### Create Mobx store for todos
>   Follow these steps to create Mobx store for todos
1. Create a file named **TodosStore.js** in **src/state**
2. Import `action`, `computed`, `makeAutoObservable`, and `observable` from `mobx`
    ```js
    import { action, computed, makeAutoObservable, observable } from "mobx"
    ```
3. Import todos http methods
    ```js
    import { getTodos, postTodo, deleteTodo } from '../http/todosHttp';
    ```
4. Create store
    ```js
    export default class TodosStore {
        todos = [];
        todosError = "";

        constructor() {
            makeAutoObservable(this, {
                todos: observable,
                todosError: observable,
                loadTodos: action,
                addTodo: action,
                removeTodo: action,
                count: computed,
                hasError: computed
            });
        }

        get count() {
            return this.todos.length;
        }

        get hasError () {
            return !!this.todosError;
        }

        async loadTodos() {
            this.todosError = '';

            try {
                const todos = await getTodos();
                this.todos = todos;
            } catch {
                this.todosError = 'Failed to load todos';
            };
        }

        async addTodo(todo) {
            this.todosError = '';

            try {
                const newTodo = await postTodo(todo);
                this.todos.push(newTodo);
            } catch {
                this.todosError = 'Failed to add todo';
            }
        }

        async removeTodo(id) {
            this.todosError = '';

            try {
                await deleteTodo(id);
                this.todos = this.todos.filter(todo => todo.id !== id);
            } catch {
                this.todosError = 'Failed to delete todo';
            }
        }
    };
    ```
5. Open **GlobalState.js**
6. Import `TodosStore`
    ```js
    import TodosStore from "./TodosStore";
    ```
7. Create an instance of the store
    ```js
    const todosStore = new TodosStore();
    ```
8. Export the instance
    ```js
    export { commentingStore, todosStore };
    ```
### Remove todos prop drilling
> Follow these steps to remove prop drilling from todos related components.
1. Open **App.js**
2. Delete import statements related to todos http methods
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
5. Delete the useEffect()
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
    <CommentCount />
    ```
    ```js
    <Commenting />
7. Remove imports `useState`, `useEffect`, `useCallback`
    ```js
    import { useRef, useState, useEffect, useCallback } from 'react';
    ```git

### Consume Mobx store in todos related components
> Follow the steps to refactor todos related components so they consume the Mobx store.
1. Open **MessageBanner.js**
    - Import `todosStore` from `GlobalState`
        ```js
        import { todosStore } from '../../state/GlobalState';
        ```
    - Remove `todosError` prop from `MessageBanner` signature
        ```js
        const MessageBanner = observer(() => {
        ```
    - Replace `todosError` with the `todosStore`
        ```js
        {!todosStore.hasError && <InfoMessage message="Please enter a todo" className="info-message__todos" />}
        {todosStore.hasError && <ErrorMessage message={todosStore.todosError} />}
        ```
2. Open **TodoCount.js**
    - Import `observer` from Mobx
        ```js
        import { observer } from "mobx-react-lite"
        ```
    - Import `todosStore` from `GlobalState`
        ```js
        import { todosStore } from '../../state/GlobalState';
        ```
    - Remove `value` prop from `TodoCount` signature and wrap the function with `observer` (do not forget the closing parenthesis)
        ```js
        const TodoCount = observer(() => {
            ...
        });
        ```
    - Replace `{value}` in the count label with `{todosStore.count}`
        ```js
        <div>Total todo's: {todosStore.count}</div>
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
    - Import `observer` from Mobx
        ```js
        import { observer } from "mobx-react-lite"
        ```
    - Import `todosStore` from `GlobalState`
        ```js
        import { todosStore } from '../../state/GlobalState';
        ```
    - Remove the `onAdd` prop from `AddTodo` signature and wrap the function with `observer` (do not forget the closing parenthesis)
        ```js
        export const AddTodo = observer(() => {
            ...
        });
        ```
    - Replace `onAdd(comment)` in `handleAdd` method with `todosStore.addTodo(todo);`
        ```js
        const handleAdd = () => {
            todosStore.addTodo(todo);
            setComment('');
        }
        ```
5. Open **TodoList.js**
    - Import `useEffect` from React
        ```js
        import { useEffect, useRef } from 'react';
        ```
    - Import `observer` from Mobx
        ```js
        import { observer } from "mobx-react-lite"
        ```
    - Import `todosStore` from `GlobalState`
        ```js
        import { todosStore } from '../../state/GlobalState';
        ```
    - Remove `todos` and `onDelete` props from `TodoList` signature and wrap the function with `observer` (do not forget the closing parenthesis)
        ```js
        export const TodoList = observer(() => {
            ...
        });
        ```
    - Replace `todos` with `todosStore`
        ```js
        const renderItems = todosStore.count !== 0;
        ```
        ```js
        {todosStore.todos.map(({ id, value }) => <li key={id} className="domain-list-item">{value} <a href="" onClick={(e) => handleDelete(e, id)}>remove</a></li>)}
        ```
    - Replace `onDelete` call in the `handleDelete`method with `todosStore.removeTodo(id);`
        ```js
        const handleDelete = (event, id) => {
            event.preventDefault();
            todosStore.removeTodo(id);
        }
        ```
    - Create a `useEffect()` with the following
        ```js
        useEffect(() => {
            todosStore.loadTodos();
        }, []);
        ```



##  V). Regression Test
>   Make sure the application runs without errors and perform the following steps.

1.  Add and remove a comment
2.  Add and remove a todo
3.  Stage and commit your changes