import React, { createContext } from 'react';

const UserContext = createContext();

export function Provider({ children })  {
  

return (
  <UserContext.Provider 
    value = {{ 
      
    }}
      >
        {children}
    </UserContext.Provider>
  );
};

export default UserContext;