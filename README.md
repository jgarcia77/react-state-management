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
##  III).  Create `commenting` Redux slice
>   Follow these steps to create Redux slice, actions, and reducers related to commenting
1.  Create a file named **commentingSlice.js** in **src/state**
2.  
<!-- ##  VIII). Regression Test
>   Make sure the application runs without errors and that you can add and remove comments and todos. -->