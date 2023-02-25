import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { loadUsers(); }, []);

    const loadUsers = async () => {
        setIsLoading(true);
        const results = await axios.get("http://localhost:8080/users");
        setUsers(results.data);
        setIsLoading(false);
    }

    const data = isLoading ? (<tr><td>Loading ...</td></tr>) : users.map(user => (<tr key={user.id}>
        <th scope="row">{user.id}</th>
        <td>{user.username}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td> 
            <button className='btn btn-primary mx-2'>View</button>
            <button className='btn btn-outline-primary mx-2'>Edit</button>
            <button className='btn btn-danger mx-2'>Delete</button>
        </td>
    </tr>)); 

    return (
        <div className="container ">
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </div>
        </div>
    );
}