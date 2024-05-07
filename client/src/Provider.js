import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function Provider({ children })  {
  const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!alreadyLogged);
  const [user, setUser] = useState(alreadyLogged ?? users.find(user => user.id === 0));
  
  useEffect(() => {
    // Načítanie zoznamu študentov zo súboru users.json pri načítaní komponentu
    fetch('/storage/students.json')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        // Skontrolujeme, či je užívateľ už prihlásený
        const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
        const loggedUser = data.find(user => user.id === alreadyLogged?.id);
        if (loggedUser) {
          setUser(loggedUser);
          setIsLoggedIn(true);
        }
      })
      .catch(error => console.error('Error loading users:', error));
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
    value = {{ 
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