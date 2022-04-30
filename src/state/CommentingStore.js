import { action, computed, makeAutoObservable, observable } from "mobx"
import { getComments, postComment, deleteComment } from "../http/commentingHttp";

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