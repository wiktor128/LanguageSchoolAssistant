import store from '../store';

// a request helper which reads the access_token from the redux state and passes it in its HTTP request
export default function apiRequest(url, method = 'GET', bodyData) { // improve headers to make it working
  const token = store.getState().oidc.user.access_token;
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', `Bearer ${token}`);
  headers.append('Access-Control-Allow-Origin', 'true');

  var formData = new FormData();

  if (bodyData) {
    function* entries(obj) {
      for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
      }
    }
    for (let [key, value] of entries(bodyData)) {
      formData.append( key, value);
    }
  }
  
  const options = {
    method,
    headers,
    body: formData
  };

  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => ({data})) 
    .catch((error) => ({ error }));
}
