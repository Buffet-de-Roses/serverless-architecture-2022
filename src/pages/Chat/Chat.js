import React, { useState, useEffect } from 'react';
import { streamMessages } from '../../components/Firebase';
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

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const [messages, setMessages] = useState();
  useEffect(() => {
    const unsubscribe = streamMessages((querySnapshot) => {
      const updatedMessages = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
      setMessages(updatedMessages);
    },
    (error) => console.log(error.message));
    return unsubscribe;
  }, [messages, setMessages]);

  return (
    <>
      {/* <div className='realchat'>
        <h2>Realtime chat</h2>
        <div>
          <h3>Users</h3>
          {users?.map((user) => <p key={user.uid}>{user.email}</p>)}
        </div>
        <div>
          <h3>Chat</h3>
          {messages?.map((message) => <p key={message.message}>{message.message}</p>)}
        </div>
      </div> */}
      <div>
        <h3>Chat</h3>
        {messages?.map((message) => <p key={message.message}>{message.message}</p>)}
      </div>
    </>
  );
}

export default Chat;