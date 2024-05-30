import api from "./api"

export async function signIn({email, password}) {
  const request = {
    email: email,
    password: password
  }
  const { data } = await api.post('/users/signin', request);
  return data;
}

export async function signUp({fullName, api, passsword}) {
  const request = {
    fullName: fullName,
    api: api,
    passsword:  passsword
  }
  const { data } = await api.post('/users/signup', request);
  return data;
}

export async function signOut() {
  const { data } = await api.get('/users/signout');
  return data;
}