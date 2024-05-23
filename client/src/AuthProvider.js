import React, { createContext, useState, useEffect } from 'react';
import { CallBackendAsync } from './helpers/apiCaller';

const UserContext = createContext();

export function AuthProvider({ children }) {
  const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!alreadyLogged);
  const [user, setUser] = useState(null);

  async function getStudents() {
    try {

      const responseStudents = await CallBackendAsync("http://localhost:3011/api/student/list")
      // Skontrolujeme, či je užívateľ už prihlásený
      setUsers(responseStudents.data);
      const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
      if (user == null) {
        setUser(alreadyLogged)
      }
      const loggedUser = responseStudents.data.find(user => user.id === alreadyLogged?.id);
      if (loggedUser) {
        setUser({ ...loggedUser, token: alreadyLogged.token });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  useEffect(() => {
    getStudents()
  }, []);

  const login = async (username, password) => {
    const response = await CallBackendAsync("http://localhost:3011/api/login", null, "post", { username: username, password: password })
    //TODO add error handling
    if (response.error) {
      return { error: response.error };
    }
    const selectedUser ={ ...(users.find(user => user.id === response.userId)), token: response.token} ;
    setUser(selectedUser);
    sessionStorage.setItem('authUser', JSON.stringify(selectedUser));
    setIsLoggedIn(selectedUser.id !== 0);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('authUser');
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        isLoggedIn,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;