export const getToken = ()=>{
    let token = localStorage.getItem('token');
    return token === null ? '': token;
}

export const deleteToken = ()=>{
    localStorage.removeItem('token');
}

export const setToken =(token:string)=>{
    localStorage.setItem('token',token);
}
