
// import React, { createContext,useState } from 'react';
// import Cookies from 'js-cookie';

// export const SoftContext = createContext();

// export const SoftProvider = ({ children }) => {
//   // Auth
//   const [token, setToken] = useState(Cookies.get('token') || '');
//   const [role, setRole] = useState(Cookies.get('role') || '');

//   const valueprice = {
//     token, setToken,
//     role, setRole
//   };

//   return (
//     <SoftContext.Provider value={valueprice}>
//       {children}
//     </SoftContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const SoftContext = createContext();

export const SoftProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || '');
  const [role, setRole] = useState(Cookies.get('role') || '');

  // Sync cookies when token/role change
  useEffect(() => {
    if (token) Cookies.set('token', token, { expires: 7 });
    else Cookies.remove('token');

    if (role) Cookies.set('role', role, { expires: 7 });
    else Cookies.remove('role');
  }, [token, role]);

   const softvalue={ 
    token, setToken, 
    role, setRole 
    }

  return (
    <SoftContext.Provider value={softvalue}>
      {children}
    </SoftContext.Provider>
  );
};
