import { createContext, useReducer } from 'react'

export const UserContext = createContext();

function initUser() {
  const localUser = localStorage.getItem('user');
  return localUser ? JSON.parse(localUser) : null;
}

function userReducer(user, action) {
  switch(action.type) {
    case 'save-data':
      localStorage.setItem('user', JSON.stringify(action.user));
      return action.user;

    case 'destroy-data':
      localStorage.removeItem('user');
      return {};
    
    default:
      return action.user
  }
}

const UserContextProvider = ({ children }) => {

  const [user, dispatch] = useReducer(userReducer, {}, initUser);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      { children }
    </UserContext.Provider>
  )
}

export default UserContextProvider;
