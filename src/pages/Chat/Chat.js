import React, { useState, useEffect } from 'react';
import { sendMessage, streamMessages, streamUsers } from '../../components/Firebase';
import './Chat.css';

function Chat() {
  // const [users, setUsers] = useState([]);
  // const [messages, setMessages] = useState([]);
  // setMessages(getMessages());
  // const fetchUsers = async () => {
  //   try {
  //     const users = await getAllUsers();
  //     setUsers(users);
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };
  // useEffect(() => {
  //   const q = query(collection(db, 'messages'));
  //   const unsubscribe = onSnapshot(
  //     q,
  //     (querySnapshot) => {
  //       const newMessages = querySnapshot.docs.map(doc => doc.data());
  //       setMessages(newMessages);
  //     },
  //     (error) => {
  //       console.log(error.message);
  //     }
  //   );
  //   return unsubscribe;
  // }, [messages, setMessages]);

  const [messages, setMessages] = useState();
  const [users, setUsers] = useState();
  const [message, setMessage] = useState('');

  const submitMessage = (e) => {
    e.preventDefault();
    sendMessage(message);
  };

  useEffect(() => {
    const unsubscribe = streamMessages((querySnapshot) => {
      const updatedMessages = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      setMessages(updatedMessages);
    },
    (error) => console.log(error.message));
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = streamUsers((querySnapshot) => {
      const updatedUsers = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
      setUsers(updatedUsers);
    },
    (error) => console.log(error.message));
    return unsubscribe;
  }, []);

  return (
    <>
      <h2>Realtime chat</h2>
      <div>
        <h3>Users</h3>
        {users?.map((user) => <p key={user.uid}>{user.email}</p>)}
      </div>
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