import 'whatwg-fetch'

export const API_URL = '/rest-api/public';

let CSRF: string | null = null;

const handleRequest = (resource: string, method?: string, params?: any, isForm?: boolean) => {
    let formData = null;
    if (isForm) {
        let arr = [];
        formData = new FormData();
        for (let q in params) {
            if (params.hasOwnProperty(q)) {
                arr.push(q + "=" + params[q]);
                formData.append(q, params[q]);
            }
        }
        params = arr.join("&");

    }

    let headers: any = {};
    if (!isForm) {
        headers = {
            "Content-Type": "application/json",
            "X-CSRF-Token": CSRF
        };
    }

    // get auth header
    let s: any = window.localStorage.getItem("NODELY_SESSION");
    if (s) {
        s = JSON.parse(s);
        headers['Authorization'] = s.token_type + ' ' + s.access_token
    }
    return fetch(API_URL + resource, {
      method: method,
      headers,
      credentials: "include",
      body: params ? formData || JSON.stringify(params) : null
    })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res;
        } else if (res.status === 401 && resource !== "/loggedInfo") {
          window.localStorage.removeItem("NODELY_SESSION");
          window.location.href = "/login?to=" + window.location.pathname;
        } else {
          let err: any = new Error(res.statusText);
          err.statusCode = res.status;
          err.response = res;
          throw err;
        }
      })
      .then((res: any) => {
        return res.json();
      });
};

export const getToken = () => {
    handleRequest('/check').then(res => {
        CSRF = res;
    });
};

export const get = (resource: string) => {
    return handleRequest(resource, 'GET');
};

export const post = (resource: string, params: any) => {
    return handleRequest(resource, 'POST', params);
};

export const postForm = (resource: string, params: any) => {
    return handleRequest(resource, 'POST', params, true);
};

export const put = (resource: string, params?: any) => {
    return handleRequest(resource, 'PUT', params);
};

export const del = (resource: string) => {
    return handleRequest(resource, 'DELETE');
};

export const getRaw = (uri: string) => {
    return fetch(uri, {
        method: "GET",
        credentials: 'include',
        mode: 'cors',
    });
};