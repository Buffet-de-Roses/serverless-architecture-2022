import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, createConvervastion, stream, streamYourConvs } from '../../components/Firebase';
import Chat from './Chat';
import './Conversation.css';

function NewConv() {
  const [users, setUsers] = useState();
  const [convName, setConvName] = useState('');
  const [me] = useAuthState(auth);
  const [usersConv, setUsersConv] = useState([]);

  const submitConv = (e) => {
    e.preventDefault();
    createConvervastion(me.uid, convName, usersConv);
    setConvName('');
    setUsersConv([]);
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
      <form onSubmit={submitConv} className='form-conv'>
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

function Conv(props) {
  const [convs, setConvs] = useState();
  const [chat, setChat] = useState();

  useEffect(() => {
    if (props.me) {
      const unsubscribe = streamYourConvs(props.me, (querySnapshot) => {
        const updatedConv = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
        setConvs(updatedConv);
      },
      (error) => console.log(error.message));
      return unsubscribe;
    }
  }, [props.me]);

  return (
    <>
      <div>
        <h4>Conversations</h4>
        <div className='chatAvailable'>
          {convs?.map((conv) =>
            <button className='button-conv' key={conv.id} onClick={() => setChat(conv.id)}>{conv.name}</button>
          )}
        </div>
        <div>
          {chat && <Chat chat={chat}/>}
        </div>
      </div>
    </>
  );
}

export {
  NewConv,
  Conv,
};