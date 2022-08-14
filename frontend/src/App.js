import { useSelector,useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import { login, selectUser } from "./feature/userSlice";
import './App.css';
import Quora from './component/Quora';
import Login from './auth/Login';
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        console.log("AuthUser", authUser);
      }
    });
  }, [dispatch]);
  return (
    <div className='App'>
   {user ? <Quora/> : <Login/>}
    </div>
  )
}

export default App;
