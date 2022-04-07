export const getComments = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/comments`);
    return await response.json();
}

export const postComment = async (value) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/comments`, {
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

export const deleteComment = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/comments/${id}`, {
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        method: 'DELETE'
    });
    return await response.json();
};