import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getComments, postComment, deleteComment } from '../http/commentingHttp';

const initialState = {
  comments: [],
  commentsError: ''
};

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

export const selectComments = (state) => state.commenting.comments;
export const selectCommentsError = (state) => state.commenting.commentsError;
export default commentingSlice.reducer;