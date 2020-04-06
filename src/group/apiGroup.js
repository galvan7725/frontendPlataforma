
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

 export const groupsByUser = (token,userId) => {
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