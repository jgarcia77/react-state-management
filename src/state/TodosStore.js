import { action, computed, makeAutoObservable, observable } from "mobx"
import { getTodos, postTodo, deleteTodo } from '../http/todosHttp';

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