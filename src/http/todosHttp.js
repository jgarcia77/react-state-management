export const getTodos = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos`);
    return await response.json();
}

export const postTodo = async (value) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos`, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        method: 'POST',
        body: JSON.stringify({
            value
        })
    });
    return await response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/todos/${id}`, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        method: 'DELETE'
    });
    return await response.json();
};