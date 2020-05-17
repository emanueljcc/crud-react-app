const URL = `${process.env.REACT_APP_API}:${process.env.REACT_APP_API_PORT}/${process.env.REACT_APP_API_VERSION}`;

async function getUsers() {
    try {

        const data = await fetch(URL);
        return data.status === 200 && data.json();

    } catch (error) {
        throw error;
    }
}

async function getTypes() {
    try {

        const data = await fetch(`${URL}/phoneTypes`);
        return data.status === 200 && data.json();

    } catch (error) {
        throw error;
    }
}

async function createUser(data) {
    try {

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        };

        const create = await fetch(URL, options);
        const response = await create.json();
        return create.status === 201 && {
            status: create.status,
            data: response
        };

    } catch (error) {
        throw error;
    }
}

async function removeUser(id) {
    try {
        const options = {
            method: "DELETE",
        };

        const remove = await fetch(`${URL}/${id}`, options);
        const response = await remove.json();

        return remove.status === 200 && {
            status: remove.status,
            data: response
        };

    } catch (error) {
        throw error;
    }
}

async function updateUser(data) {
    try {
        const id = data._id;

        const options = {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };
        const update = await fetch(`${URL}/${id}`, options);
        return update.status === 200 && {
            status: update.status,
            data: update.json()
        };

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUsers,
    getTypes,
    createUser,
    removeUser,
    updateUser,
}