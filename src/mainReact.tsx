import React from 'react'
import { Provider, useQuery, useMutation } from 'urql';
import ReactDOM from 'react-dom'
import { client } from "./main"
import { 
  AuthBug, 
  LoginBug, 
  LogoutBug,
  Auth,
  Login,
  Logout,
  requestPolicy
} from "./queries";

const CompBug = () => {
  const [result, reexecuteQuery] = useQuery({
    query: AuthBug,
  });

  const [_loginResult, login] = useMutation(LoginBug)
  const [_logoutResult, logout] = useMutation(LogoutBug)

  const doLogin = () => login()
  const doLogout = () => logout()

  const { data, fetching, error } = result;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const dataJSON = JSON.stringify(data)

  return (
    <div>
      Viewer: {dataJSON}
      <button onClick={doLogin}>Login</button>
      <button onClick={doLogout}>Logout</button>
    </div>
  );
}

const createComp = (title, authQuery, loginMut, logoutMut) => {
  return () => {
    const [result, reexecuteQuery] = useQuery({
      query: authQuery,
      requestPolicy
    });

    const [_loginResult, login] = useMutation(loginMut)
    const [_logoutResult, logout] = useMutation(logoutMut)

    const doLogin = () => login()
    const doLogout = () => logout()

    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    const dataJSON = title === 'Without bug'
      ? result.data?.app?.viewer?.username
      : result.data?.viewer?.username

    return (
      <div>
        <h2>{title}</h2>
        Viewer: {dataJSON}
        <button onClick={doLogin}>Login</button>
        <button onClick={doLogout}>Logout</button>
      </div>
    );
  }
}

const CompWithoutBug = createComp('Without bug', Auth, Login, Logout)
const CompWithBug = createComp('With bug', AuthBug, LoginBug, LogoutBug)

const App = () => (
  <Provider value={client}>
    <CompWithBug />
    <CompWithoutBug />
  </Provider>
);


document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('react-app')
  console.log(el)
  ReactDOM.render(<App />, el)
})
