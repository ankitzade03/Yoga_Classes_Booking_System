// import React from "react"
// // import AdminDashboard from "./Admin"
// // import { AdminHeader } from "./AdminHeader"
// import { Login } from "./Login"
// import { useContext } from "react"
// import { SoftContext } from "../Context/SoftContext"
// import AdminDashboard from "./Admin"
// export const App = () => {

//   const {token}=useContext(SoftContext)
//   return (
//     <div>
//       {
//         token==''? <Login></Login> :
//         <div> 
//           <AdminHeader></AdminHeader>
//           <AdminDashboard></AdminDashboard>
//         </div>
//       }
//     </div>
//   )
// }


import { Login } from "./Login";
import { SoftContext } from "../Context/SoftContext";
import { AdminHeader } from "./AdminHeader";
import AdminDashboard from "./Admin";
import { useContext } from "react";



export const App = () => {
  const { token } = useContext(SoftContext);

  return (
    <div>
      {token === '' ? (
        <Login />
      ) : (
        <div>
          <AdminHeader />
          <AdminDashboard />
        </div>
      )}
    </div>
  );
};
