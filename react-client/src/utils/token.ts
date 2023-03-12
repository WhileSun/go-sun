import cookie from 'react-cookies';
export const getToken = ()=>{
    let token = cookie.load('token');
    return token === undefined ? '': token;
}

export const deleteToken = ()=>{
    cookie.remove('token');
}

export const setToken =(token:string)=>{
    cookie.save('token', token,{ expires:  new Date(new Date().getTime() + 3*24 * 3600 * 1000) });
}
