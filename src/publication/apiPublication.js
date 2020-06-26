
export const getPublication = (token, publicationId) => {
    //const userId = isAuthenticated().user._id;
    return fetch(`${process.env.REACT_APP_API_URL}/publication/${publicationId}`, {
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

export const getPublicationFile = (token, publicationId,fileId) => {
    //const userId = isAuthenticated().user._id;
    return fetch(`${process.env.REACT_APP_API_URL}/publication/file/${publicationId}/${fileId}`, {
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

export const newComment = (body,token) => {
    
    return  fetch(`${process.env.REACT_APP_API_URL}/publication/newComment/`,{
          method: "POST",
          headers:{
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(body)
      }).then(respnse =>{
          return respnse.json();
      }).catch(err => console.log(err));
  };

  export const getComments = (token, publicationId) => {
    //const userId = isAuthenticated().user._id;
    return fetch(`${process.env.REACT_APP_API_URL}/publication/pubComments/${publicationId}/`, {
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