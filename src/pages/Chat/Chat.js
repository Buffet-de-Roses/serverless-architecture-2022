import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, sendMessage, streamConv, streamMessages } from '../../components/Firebase';
import './Chat.css';

/* eslint-disable react/prop-types */
function Chat(props) {

  const [messages, setMessages] = useState();
  const [conv, setConv] = useState();
  const [me] = useAuthState(auth);
  const [message, setMessage] = useState('');

  const submitMessage = (e) => {
    e.preventDefault();
    sendMessage(me.uid, message, props.chat);
    setMessage('');
  };

  const milliToDate = (milli) => {
    return new Date(milli).toLocaleTimeString('en-US');
  };

  useEffect(() => {
    const unsubscribe = streamMessages(props.chat, (querySnapshot) => {
      const updatedMessages = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      setMessages(updatedMessages);
    },
    (error) => console.log(error.message));
    return unsubscribe;
  }, [props.chat]);

  useEffect(() => {
    const unsubscribe = streamConv(props.chat, (querySnapshot) => {
      const updatedConv = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      setConv(updatedConv[0]);
    },
    (error) => console.log(error.message));
    return unsubscribe;
  }, [props.chat]);

  return (
    <>
      <div>
        <h3>Chat {conv?.name}</h3>
        {props.chat && <>
          <div className='chatMessage'>
            {messages?.map((message) =>
              <div  key={message.id} className={message.senderId === me.uid ? 'me' : 'other'}>
                <p className='userName'>{props.users?.find(element => element.uid === message.senderId).name}</p>
                <p>{message.message}</p>
                <p>{milliToDate(message.createdAt)}</p>
              </div>)}
          </div>
          <div className='sendMessage'>
            <input value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button type='submit' onClick={submitMessage}>Send</button>
          </div>
        </>}
      </div>
    </>
  );
}

export default Chat;