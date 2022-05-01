import React, { createContext, useContext } from 'react';
import { useGlobalState } from './useGlobalState';

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
};

export const useGlobalStateContext = () => useContext(GlobalStateContext);