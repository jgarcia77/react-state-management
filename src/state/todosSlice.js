import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTodos, postTodo, deleteTodo } from '../http/todosHttp';

const initialState = {
  todos: [],
  todosError: ''
};

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

export const selectTodos = (state) => state.todoList.todos;
export const selectTodosError = (state) => state.todoList.todosError;
export default todosSlice.reducer;