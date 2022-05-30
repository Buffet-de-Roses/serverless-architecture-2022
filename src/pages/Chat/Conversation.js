import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, createConvervastion, streamYourConvs } from '../../components/Firebase';
import Chat from './Chat';
import './Conversation.css';

function NewConv(props) {
  const [convName, setConvName] = useState('');
  const [me] = useAuthState(auth);
  const [usersConv, setUsersConv] = useState([]);

  const submitConv = (e) => {
    e.preventDefault();
    createConvervastion(me.uid, convName, usersConv);
    setConvName('');
    setUsersConv([]);
  };

  /* eslint-disable react/prop-types */
  return (
    <>
      <h4>Create Conversation</h4>
      <form onSubmit={submitConv} className='form-conv'>
        <label>Conversation Name</label>
        <input value={convName} type='text' onChange={(e) => setConvName(e.target.value)}/>
        {props.users?.map((user) =>
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
          {chat && <Chat chat={chat} users={props.users}/>}
        </div>
      </div>
    </>
  );
}

export {
  NewConv,
  Conv,
};