import { gql } from "urql"


export const LoginBug = gql`
  mutation M1 {
    login {
      authToken
      username
    }
  }
`

export const LogoutBug = gql`
  mutation M2 {
    logout {
      authToken
      username
    }
  }
`

export const AuthBug = gql`
  query User {
    viewer {
      username
      authToken
    }
  }
`

export const Login = gql`
  mutation M1 {
    loginApp {
      viewer {
        authenticated
        authToken
        username
      }
    }
  }
`

export const Logout = gql`
  mutation M2 {
    logoutApp {
      viewer {
        authenticated
        authToken
        username
      }
    }
  }
`

export const Auth = gql`
  query App {
    app {
      viewer {
        authenticated
        authToken
        username
      }
    }
  }
`