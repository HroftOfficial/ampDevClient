// import { useContext } from "react";
// // import { AuthContext } from "../../context/AuthContext";
// import AuthContext from "../../context/AuthProvider";
// import { ChatContext } from "../../context/ChatContext";
// import classes from "./allUsers.module.css";

// const AllUsers = () => {
//   const { auth } = useContext(AuthContext);
//   const { potentialChats, createChat } = useContext(ChatContext);
//   const { onlineUsers } = useContext(ChatContext);

//   // const user = {_id:auth.userId, name: auth.fio}
//   const user = {_id:auth.userId}
//   // console.log("AllUsers potencialChat", potentialChats, onlineUsers)
//   return (
//     <>
//       <div className={classes.allUsers}>
//         {potentialChats &&
//           potentialChats.map((receiver, index) => (
//             <div
//               className={classes.singleUser}
//               key={index}
//               onClick={() => createChat(user._id, receiver._id)}
//             >
//               {/* {receiver.name} */}
//               {receiver.fio}
//               <span
//                 className={
//                   onlineUsers?.some((user) => user?._id === receiver?._id)
//                     ? "user-online" //  смотри index.css
//                     : ""
//                 }
//               ></span>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// };

// export default AllUsers;
