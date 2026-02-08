'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { TaskService } from "@/lib/services/task.service";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
    const {role} = useAuth();

  useEffect(() => {
 const fetchTasks = async () => {
    if (role === "USER") {
      const response = await TaskService.getAssignedTasks();
      setTasks(response.data.data); 
    }else if(role == "ADMIN"){
      const response =  await TaskService.getTasks();
      setTasks(response.data.data); 
    }
  };
  fetchTasks();
}, [role]);


  //  const fetchTasks = async () => {
  //   if (role === "USER") {
  //     const response = await TaskService.getAssignedTasks();
  //     setTasks(response.data.data); 
  //   }else if(role == "ADMIN"){
  //     const response =  await TaskService.getTasks();
  //     setTasks(response.data.data); 
  //   }
  // };



  const statusChanged = async (id,status) => {
    try {

      const response = await TaskService.updateTaskStatus(id,status);
      // fetchTasks();
      
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <div className="flex justify-between m-10">

        
        {tasks.length === 0 ? (
          <div>
            Your to-do list is empty{" "}
            <Link
              href="/task/create"
              className="text-blue-600 underline"
            >
              click here
            </Link>
          </div>
        ) : (
          <Link href="/task/create">
            <h1 className="underline underline-offset-2 text-blue-600">
              Add Task
            </h1>
          </Link>
        )}

        <Link href="/logout" className="text-blue-600">
          Logout
        </Link>
      </div>

      {tasks.map(task => (
        <div
          key={task._id}
          className="border rounded w-1/3 m-auto my-4 p-4 "
        >
          <h1 className="text-xl font-bold">{task.title}</h1>
          <p className="my-2">{task.description}</p>

           <select
      value={task.status}
      onChange={(e) =>{

       statusChanged(task._id,e.target.value);
      }}
      className="border rounded px-3 py-2 w-full"
    >
      <option value="todo">Todo</option>
      <option value="in_progress">In Progress</option>
      <option value="done">Done</option>
    </select>

          
        </div>
      ))}
    </>
  );
};

export default TaskList;
