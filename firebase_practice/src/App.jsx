import { useRef, useEffect } from 'react'
import { app, database, storage } from './firebaseConfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './App.css'

function App() {

  let auth = getAuth();

  const loginEmail = useRef(null);
  const loginPass = useRef(null);
  const signupName = useRef(null);
  const signupEmail = useRef(null);
  const signupPass = useRef(null);

  const sometext = useRef(null);
  const somenumber = useRef(null);
  const someothertext = useRef(null);

  function signin() {
    const Email = loginEmail.current.value;
    const Password = loginPass.current.value;

    signInWithEmailAndPassword(auth, Email, Password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        window.alert(err.message);
      })

  }

  const collectionRef = collection(database, 'Random_Data');

  function signup() {
    // const Name = signupName.current.value;
    const Email = signupEmail.current.value;
    const Password = signupPass.current.value;

    createUserWithEmailAndPassword(auth, Email, Password)
      .then((response) => {
        console.log(response.user);
      })
      .catch((err) => {
        window.alert(err.message);
      })
  }

  function addData() {
    const someText = sometext.current.value;
    const someNumber = somenumber.current.value;
    const someOtherText = someothertext.current.value;

    addDoc(collectionRef, {
      Title: someText,
      Numbers: someNumber,
      OtherInfo: someOtherText,
    })
      .then(() => {
        alert('Data Added');
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  const file = useRef(null);

  function upload() {
    const fName = file.current.files[0].name;
    const storageRef = ref(storage, `images/${fName}`);
    const uploadTask = uploadBytesResumable(storageRef, file.current.files[0]);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }

  function getData() {
    onSnapshot(collectionRef, (data) => {
      console.log(data.docs.map((item) => {
        return item.data();
      }))
    })
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className='loginform'>
        <input type='email' placeholder='Enter Email' ref={loginEmail}></input>
        <input type='password' placeholder='Enter Password' ref={loginPass}></input>
        <button onClick={signin}>Login</button>
      </div>
      <div className='loginform'>
        <input type='text' placeholder='Enter Name' ref={signupName}></input>
        <input type='email' placeholder='Enter Email' ref={signupEmail}></input>
        <input type='password' placeholder='Enter Password' ref={signupPass}></input>
        <button onClick={signup}>Signup</button>
        <h1>Add A Document</h1>
        <input type='text' placeholder='some text' ref={sometext}></input>
        <input type='number' placeholder='some number' ref={somenumber}></input>
        <input type='text' placeholder='some other text' ref={someothertext}></input>
        <button onClick={addData}>Add Data</button>
        <h1>File Storage</h1>
        <input type='file' ref={file}></input>
        <button onClick={upload}>Upload</button>
      </div>
    </>
  )
}

export default App
