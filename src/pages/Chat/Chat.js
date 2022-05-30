import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, sendMessage, stream } from '../../components/Firebase';
import './Chat.css';
import { NewConv, Conv } from './Conversation';

function Chat() {

  const [messages, setMessages] = useState();
  const [me] = useAuthState(auth);
  const [message, setMessage] = useState('');

  const submitMessage = (e) => {
    e.preventDefault();
    sendMessage(me.uid, message);
  };

  useEffect(() => {
    const unsubscribe = stream('messages', (querySnapshot) => {
      const updatedMessages = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      setMessages(updatedMessages);
    },
    (error) => console.log(error.message));
    return unsubscribe;
  }, []);

  return (
    <>
      <h2>Realtime chat</h2>
      <div>
        <h3>Users</h3>
        <NewConv />
        <Conv />
      </div>
      <h5>Me</h5>
      <h5>{me?.email}</h5>
      <div>
        <h3>Chat</h3>
        {messages?.map((message) => <p key={message.message}>{message.message}</p>)}
      </div>
      <div>
        <h4>Send chat</h4>
        <input value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button type='submit' onClick={submitMessage}>Send</button>
      </div>
    </>
  );
}

export default Chat;