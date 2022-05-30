import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, createConvervastion, stream } from '../../components/Firebase';

function NewConv() {
  const [users, setUsers] = useState();
  const [convName, setConvName] = useState('');
  const [me] = useAuthState(auth);
  const [usersConv, setUsersConv] = useState([]);

  const submitConv = (e) => {
    e.preventDefault();
    createConvervastion(me.uid, convName, usersConv);
  };

  useEffect(() => {
    const unsubscribe = stream('users', (querySnapshot) => {
      const updatedUsers = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      setUsers(updatedUsers);
    },
    (error) => console.log(error.message));
    return unsubscribe;
  }, []);

  /* eslint-disable react/prop-types */
  return (
    <>
      <h4>Create Conversation</h4>
      <form onSubmit={submitConv}>
        <label>Conversation Name</label>
        <input value={convName} type='text' onChange={(e) => setConvName(e.target.value)}/>
        {users?.map((user) =>
          <label key={user.uid}>{user.email}<input type='checkbox' value={user.uid} onChange={(e) => setUsersConv(oldArray => [...oldArray, e.target.value])}/></label>
        )}
        <button type='submit'>Create</button>
      </form>
    </>
  );
}

function Conv() {
  const [convs, setConvs] = useState();

  useEffect(() => {
    const unsubscribe = stream('conversations', (querySnapshot) => {
      const updatedConv = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      setConvs(updatedConv);
    },
    (error) => console.log(error.message));
    return unsubscribe;
  }, []);

  return (
    <>
      <div>
        <h4>Conversations</h4>
        {convs?.map((conv) => 
          <p key={conv.name}>{conv.name}</p>
        )}
      </div>
    </>
  );
}

export {
  NewConv,
  Conv,
};