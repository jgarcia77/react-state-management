---
marp: true
author: Josh Garcia
title: ReduxToolkit Training
paginate: false
size: 4:3
theme: gaia
---

<style>
    :root {
        --color-background: #2E1A47;
        --color-foreground: #fff;
		font-family: Montserrat;
    }

    h1 {
        color: #7248BD;
    }

    h2 {
        color: #666;
    }

    img {
        width: 400px;
    }

	span {
		font-size: 14px;
	}
</style>

![Netrix Logo](https://www.netrixllc.com/wp-content/uploads/2020/09/Netrix-Logo.png)

# Redux Toolkit
-   Redux Under the Hood
-   Redux vs Redux Toolkit
-	Get Started

---

# Redux (boilerplate)

```js
// Action Constants
const POST_COMMENTS_PENDING = 'POST_COMMENTS_PENDING'
const POST_COMMENTS_FULFILLED = 'POST_COMMENTS_FULFILLED';
const POST_COMMENT_REJECTED = 'POST_COMMENT_REJECTED';

// Thunk Dispatching Actions
const postComment = (comment) => {
	return (dispatch) => {
		
		dispatch({ type: POST_COMMENTS_PENDING });
		
		fetch('URL_FOR_POST', { value: comment })
			.then(response => response.json())
			.then(data => {
				dispatch({ type: POST_COMMENTS_FULFILLED, payload: data });
			})
			.catch(error => {
				dispatch({ type: POST_COMMENT_REJECTED });
			});
	}
}

// dispatch(postComment('Hello World'));
```

---

# Redux (boilerplate)

```js
// Reducer
const commentingReducer = (state, action) => {
	switch (action.type) {
		case POST_COMMENTS_PENDING:
			return {
				...state,
				commentErrors: ''
			}
		case POST_COMMENTS_FULFILLED:
			return {
				...state,
				comments: [
					...state.comments,
					action.payload
				]
			}
		case POST_COMMENT_REJECTED:
			return {
				...state,
				commentErrors: 'Failed to add comment'
			}
		default:
			return state;
	}
}
```

---
# Redux Toolkit

```js
// Thunk and Action Creators (pending, fulfilled, rejected)
export const postCommentThunk = createAsyncThunk(
    'commenting/postStatus',
    async (value) => {
        return await postComment(value);
    }
);

// dispatch(postCommentThunk('Hello World'));
```

---
# Redux Toolkit

```js
// Slice and Reducers
export const commentingSlice = createSlice({
	name: 'commenting',
	initialState: { comments: [], commentsError: '' },
	reducers: { // Synchronous Actions
		resetCommenting: (state) => state = { comments: [], commentsError: ''}
	},
	extraReducers: (builder) => { // Asynchronous Actions
		builder.addCase(postCommentThunk.pending, (state) => {
			state.commentsError = '';
		});
		builder.addCase(postCommentThunk.rejected, (state) => {
			state.commentsError = 'Failed to add comment';
		});
		builder.addCase(postCommentThunk.fulfilled, (state, action) => {
			state.comments.push(action.payload);
		});
	}
});

export default commentingSlice.reducer; // Used to configure store

export const selectComments = (state) => state.commenting.comments; // state.{sliceName}.{propertyName}
// const comments = useSelector(selectComments);

export const { resetCommenting } = commentingSlice.actions
// dispatch(resetCommenting());
```

---

#	Get Started

-	Component Tree
-	Implementation