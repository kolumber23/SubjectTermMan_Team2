import React, { createContext, useState, useEffect } from 'react';
import { CallBackendAsync } from './helpers/apiCaller';

const UserContext = createContext();

export function Provider({ children }) {
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
        setUser(alreadyLogged ?? responseStudents.data.find(item => item.id === 0))
      }
      const loggedUser = responseStudents.data.find(user => user.id === alreadyLogged?.id);
      if (loggedUser) {
        setUser(loggedUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  useEffect(() => {
    getStudents()
  }, []);

  const changeUser = (userId) => {
    const selectedUser = users.find(user => user.id === userId);
    if (selectedUser) {
      setUser(selectedUser);
      sessionStorage.setItem('authUser', JSON.stringify(selectedUser));
      setIsLoggedIn(selectedUser.id !== 0);
    } else {
      setUser(null);
      sessionStorage.removeItem('authUser');
      setIsLoggedIn(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        isLoggedIn,
        changeUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;