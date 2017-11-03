const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/doLogin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is login error");
            return error;
        });
export const doLogout = () =>
    fetch(`${api}/users/doLogout`, {
        method: 'POST'
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is logout error");
            return error;
        });

export const doSignup = (payload) =>
    fetch(`${api}/users/doSignup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is sign up error");
            return error;
        });

export const fileupload = (payload) =>
    fetch(`${api}/fileroutes/upload`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is upload file error");
        return error;
    });

export const getImages = () =>
    fetch(`${api}/fileroutes/`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is getImages error.");
            return error;
        });

export const creatFolder = (payload)=>
    fetch(`${api}/folder/createFolder`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
        }).then(res => {
            return res.status;
        }).catch(error => {
            console.log("This is createFolder error");
            return error;
        });

export const sharing = (payload)=>
    fetch(`${api}/folder/sharing`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is sharing error");
        return error;
    });

export const listdir = () =>
    fetch(`${api}/folder/listdir`,{
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is listdir error");
        return error;
    });

export const getFolders = () =>
    fetch(`${api}/folder/`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is getFolders error.");
            return error;
        });

export const UserAccountUpload= (payload) =>
    fetch(`${api}/users/uploadAccount`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is user account upload file error");
        return error;
    });

//Group
export const addMember = (payload) =>
    fetch(`${api}/group/addMember`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is addMember error");
            return error;
        });

export const deleteMember = (payload) =>
    fetch(`${api}/group/deleteMember`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is deleteMember error");
            return error;
        });
export const deleteGroup = (payload) =>
    fetch(`${api}/group/deleteGroup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is deleteGroup error");
            return error;
        });
export const createGroup = (payload) =>
    fetch(`${api}/group/createGroup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is createGroup error");
            return error;
        });
export const getMembers = (payload) =>
    fetch(`${api}/group/showMember`,{
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
     }).then(res => res.json())
        .catch(error => {
            console.log("This is showMember error.");
            return error;
        });