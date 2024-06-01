// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getSingleTask, addTask, updateTask } from "../handleHttp/Api";
// import "../pages.css";

// const Login = () => {
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     status: "Pending",
//     dueDate: "",
//   });
//   const navigate = useNavigate();
//   const handleChange = (event) => {
//     setTask({
//       ...task,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       if (isNewTask) {
//         await addTask(task);
//         setTask({
//           title: "",
//           description: "",
//           status: "Pending",
//           dueDate: "",
//         });
//         navigate("/");
//       } else {
//         await updateTask(task, setTask);
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Error creating/updating task:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8 p-8 bg-gray-200 rounded-lg shadow-lg">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Task Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={task.title}
//             onChange={handleChange}
//             className="border rounded p-2 mb-2 w-full"
//             required
//           />
//           <label htmlFor="description">Task Description:</label>
//           <textarea
//             id="description"
//             name="description"
//             value={task.description}
//             onChange={handleChange}
//             className="border rounded p-2 mb-2 w-full"
//             required
//           ></textarea>
//           <label htmlFor="status">Task Status:</label>
//           <select
//             id="status"
//             name="status"
//             value={task.status}
//             onChange={handleChange}
//             className="border rounded p-2 mb-2 w-full"
//             required
//           >
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//           <label htmlFor="dueDate">Task Due Date:</label>
//           <input
//             type="date"
//             id="dueDate"
//             name="dueDate"
//             value={task.dueDate}
//             onChange={handleChange}
//             className="border rounded p-2 mb-2 w-full"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {isNewTask ? "Create Task" : "Update Task"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../handleHttp/Api";
import "../pages.css";
import logo from "../assets/user-logo.png";

const Login = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(user, setUser);
      navigate("/table");
    } catch (error) {
      console.error("Error :", error);
    }
  };

  return (
    <div>
      <div className="page">
        <div className="form">
          <div className="login-header">
            <h3>SIGN IN</h3>
          </div>
          <img src={logo} />
          <form className="main-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              placeholder="username"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="password"
            />
            <button>login</button>
            <p className="message">
              Not registered?
              <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
