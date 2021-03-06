export const newGroup = (token, group) => {
    // console.log("USER DATA UPDATE: ", user);
    console.log(group);
    return fetch(`${process.env.REACT_APP_API_URL}/group/new`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: group
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const newPublication = (token,groupId,publication) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/group/newPublication/${groupId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: publication
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const updateGroup = (token, group,groupId) => {
    // console.log("USER DATA UPDATE: ", user);
    console.log(group);
    return fetch(`${process.env.REACT_APP_API_URL}/group/edit/${groupId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: group
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const allGroups = (token) => {
    // console.log("USER DATA UPDATE: ", user);
    // console.log(group);
    return fetch(`${process.env.REACT_APP_API_URL}/group`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const groupsByTeacher = (token, userId) => {
    // console.log("USER DATA UPDATE: ", user);
    // console.log(group);
    return fetch(`${process.env.REACT_APP_API_URL}/groups/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const groupsByUser = (token, userId) => {
    // console.log("USER DATA UPDATE: ", user);
    // console.log(group);
    return fetch(`${process.env.REACT_APP_API_URL}/groups/student/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getGroup = (token, groupId) => {
    //const userId = isAuthenticated().user._id;
    return fetch(`${process.env.REACT_APP_API_URL}/group/${groupId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then(response => {
            return response.json();
        }).catch(error => console.log(error));
};

export const newUser = (token, userId, groupId) => {
    console.log(userId, groupId);
    return fetch(`${process.env.REACT_APP_API_URL}/group/newUser`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                userId,
                groupId
            })
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const deleteUser = (token, userId, groupId, teacherId) => {
    //console.log(userId,groupId); 
    return fetch(`${process.env.REACT_APP_API_URL}/group/removeUser/${teacherId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                userId,
                groupId
            })
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}