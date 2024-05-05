import React, { createContext, useState } from 'react';

const UserContext = createContext();

export function Provider({ children })  {
  const users = [
    {
      "id": "te123",
      "name": "Igor",
      "surname": "Hnízdo",
    },
    {
      "id": "ad123",
      "name": "Admin",
      "surname": "Administrator",
    },
    {
       "id": "st123",
       "name": "Adam",
       "surname": "Smith",
       "degree": "Bc",
       "language": "en"
    },
    {
       "id": "st456",
       "name": "Petra",
       "surname": "Nová",
       "degree": "Bc",
       "language": "cz"
    },
    {
       "id": "st789",
       "name": "Jace",
       "surname": "Wayland",
       "degree": "Mgr",
       "language": "en"
    },
    {
      "id": "st987",
      "name": "Wiliam",
      "surname": "Riker",
      "degree": "Mgr",
      "language": "cz"
   },
   {
      "id": "st654",
      "name": "Frodo",
      "surname": "Bublik",
      "degree": "Mgr",
      "language": "en"
   },
   {
      "id": "st321",
      "name": "Robin",
      "surname": "Cook",
      "degree": "Mgr",
      "language": "cz"
   }
   ];

  const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!alreadyLogged);
  const [user, setUser] = useState(alreadyLogged ?? users.find(user => user.id === 0));
  
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