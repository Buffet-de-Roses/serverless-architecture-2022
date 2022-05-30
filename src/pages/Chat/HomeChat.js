import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, stream } from '../../components/Firebase';
import { NewConv, Conv } from './Conversation';
import './HomeChat.css';

export default function HomeChat() {
  const [users, setUsers] = useState();
  const [me] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = stream('users', (querySnapshot) => {
      const updatedUsers = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      setUsers(updatedUsers);
    },
    (error) => console.log(error.message));
    return unsubscribe;
  }, []);

  return (
    <>
      <h1>HomeChat</h1>
      <div className='homeChat'>
        <NewConv users={users}/>
        <Conv me={me?.uid} users={users}/>
      </div>
    </>
  );
}