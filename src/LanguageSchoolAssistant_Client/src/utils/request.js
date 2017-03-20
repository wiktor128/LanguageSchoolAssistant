import store from '../store';

// a request helper which reads the access_token from the redux state and passes it in its HTTP request
export default function apiRequest(url, method = 'GET') {
  const token = store.getState().oidc.user.access_token;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Access-Control-Allow-Origin', 'true');

  const options = {
    method,
    headers
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({data})) 
    .catch((error) => ({ error }));
}
