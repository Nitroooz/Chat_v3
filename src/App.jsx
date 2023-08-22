import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { myloginWithGoogle, myLogout, activateUpdate, writeUserData } from './Firebase';

function App() {
  const [user, setUser] = useState({
    nome: 'Usuário',
    email: 'email',
    photo: viteLogo,
  });

  const [textInput, setTextInput] = useState('');

  const [tInput, setTInput] = useState("");

  const [posts, setPosts] = useState([{user: "Vitor", text: "alow", photo: ""}]);
  
  useEffect(() => {
    activateUpdate(setPosts);
  }, []);

  return (
    <>
      <img src={user.photo} className="logo react" alt="React logo" />
      <h1>{user.nome}</h1>
      <h2>{user.email}</h2>
      <hr />
      <div className="card">
        <button className="b" onClick={() => myloginWithGoogle(setUser)}>
          Login com Google
        </button>
        <button className="b" onClick={() => myLogout()}>
          Deslogar
        </button>
      </div>
      <hr />
      <div>

        {posts.map((post) => (
            <div className="posts" key={post.key}>
              <img className='photo' src={post.photo} />
              <h2>{post.user}:</h2>
              <h3>{post.text}</h3>
            </div>
          ))}
      </div>
      <div>
        <input
          onChange={(callback) => setTInput(callback.target.value)}
        />
        <button className="b" onClick={() =>{
        writeUserData(tInput);
        setTInput = ("");
        }}>
          Enviar
        </button>
      </div>
    </>
  );
}

export default App;
