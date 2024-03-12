import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UsersForAdmin } from '../services/types/types';

export const Users: React.FC = () => { 
    const [users, setUsers] = useState<UsersForAdmin[]>([]);

    const getUsers = async () => { 
        try { 
            const response = await axios.get<UsersForAdmin[]>('https://api.escuelajs.co/api/v1/users');
            setUsers(response.data);
        } catch(err) { 
            console.log(err);
        }
    };

    useEffect(() => { 
        getUsers();
    }, []);

    return( 
        <>
        {users.map(user => (
            <div key={user.id} className="card mb-3">
                <img src={user.avatar} alt="" className="user-avatar" />
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                    <p className="card-text"><strong>Password:</strong> {user.password}</p>
                    <p className="card-text"><strong>Role:</strong> {user.role}</p>
                    <p className="card-text"><strong>Creation Date:</strong> {user.creationAt}</p>
                    <p className="card-text"><strong>Updated Date:</strong> {user.updatedAt}</p>
                </div>
            </div>
        ))}
        </>
    );
};
