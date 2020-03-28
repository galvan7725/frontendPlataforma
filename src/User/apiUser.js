
export const getUser = (token,userId) =>{
    //const userId = isAuthenticated().user._id;
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
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