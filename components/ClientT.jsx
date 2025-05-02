import { use } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Button } from "react-native";


export default function ClientT() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers()
    }
    , [])
    //async - asynchronous function to handle commands
    const fetchUsers = async () => {
        try {
            const response = await axios.post('http://localhost:8001/api/users', {command: 'select', data: {}});
            setUsers (response.data.users || []);
             
        } catch (error) {
            console.error('Error fetching users:' + error);
        }
    }
 

    handelCommand = async (command, data = {}) => {
        try {
        const response = await axios.post('http://localhost:8001/api/users', {
        command, data : {name, email, password, userID, userName,...data}
        }); 
        setMessage(response.data.message || '')
        fetchUsers()
        }
        catch (error) {
            console.error('Error handling command:' + error);
           
        }
    }

  return (
    <div className="p-10 space-y-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-10">User Menegment System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <input className="border p-2 rounded" 
        placeholder="First Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        
        <input className="border p-2 rounded" 
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        />

       <input className="border p-2 rounded" 
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input className="border p-2 rounded" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <input className="border p-2 rounded" 
        placeholder="UserID"
        value={userID}
        onChange={(e) => setUserID(e.target.value)}
        />

        <div className="flex items-center justify-center space-x-4">

            <button className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={()=>  handelCommand('insert')}
            >Insert</button>
            
            <button className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={()=>  handelCommand('update')}
            >Update</button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={()=>  handelCommand('select')}
            >Select</button>

            <button className="bg-blue-500 text-white px-4 py-2 rounded" 
            onClick={()=>  handelCommand('delete')}
            >Delete</button>

        </div>

         {message && (
            <div className="mt-4 p-4 bg-blue-500 text-black-800 rounded">
                {message}
            </div>
         )}

        {users.length > 0 && (
            <table className="mt-4 w-full border-collapse border border-gray-300">
               
                    <thread className="border border-gray-300 p-2"> 
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Action</th>
                    </thread>

                <tbody>
                    {users.map((user => (
                        
                        <tr key={user.id} className="text-center">
                            <td className="border border-gray-300 p-2">{user.name}</td>
                            <td className="border border-gray-300 p-2">{user.email}</td>
                            <td className="border border-gray-300 p-2">{user.email}</td>
                        </tr>
                    )      
                    ))}
                </tbody>


            <div className="mt-4 p-4 bg-gray-200 rounded">
               <h2 className="text-lg font-bold">Users:</h2>
               <ul className="list-disc pl-5">
               {users.map((user, index) => (
                <li key={index} className="text-gray-700">{user.name}</li>
               ))}
              </ul>
         </div>
         </table>
         )} 



      </div>    
       
    </div>
  );
}
