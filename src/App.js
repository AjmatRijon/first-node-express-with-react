import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [user,setUser] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUser(data))
  },[])
  const handleAddUser = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }

    // send data to the server
if(name && email){
  fetch('http://localhost:5000/users', {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
    .then(res => res.json())
    .then(data => {
      const addedUser = data;
      const newUsers = [...user, addedUser];
      setUser(newUsers);
      // reset name and email
      nameRef.current.value = '';
      emailRef.current.value = '';
    })
}

    e.preventDefault();
  }
  

  return (
    <div className="App">
       <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} placeholder="name" />
        <input type="email" ref={emailRef} name="" id="" placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>
      <h2>Found : {user.length}</h2>
      {
        user.map(user=> <h2 key={user.id}>{user.name} {user.email}</h2> )
      }
    </div>
  );
}

export default App;
