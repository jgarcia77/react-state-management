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

export const useGlobalStateContext = () => useContext(GlobalStateContext);