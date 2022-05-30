import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './Profil.css';
import { auth, db, logout, uploadFile } from '../../components/Firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

function Profil() {
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };

  const uploadPhoto = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClick = () => {
    console.log('click');
    uploadFile(photo, user);
  };

  useEffect(() => {
    if (user?.photoUrl) {
      setPhotoUrl(user.photoURL);
    }
  }, [user]);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <div className="fields">
          <input type="file" onChange={uploadPhoto} />
          <button onClick={handleClick}>Upload</button>
          <img src={photoUrl} alt="Avatar" className="avatar" />
        </div>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default Profil;