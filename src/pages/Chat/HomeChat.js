import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../components/Firebase';
import { NewConv, Conv } from './Conversation';
import './HomeChat.css';

export default function HomeChat() {
  const [me] = useAuthState(auth);
  return (
    <>
      <h1>HomeChat</h1>
      <div className='homeChat'>
        <h3>Conversations</h3>
        <NewConv />
        <Conv me={me?.uid}/>
      </div>
    </>
  );
}