import React, { createContext } from 'react';

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

return (
  <UserContext.Provider 
    value = {{ 
      users
    }}
      >
        {children}
    </UserContext.Provider>
  );
};

export default UserContext;