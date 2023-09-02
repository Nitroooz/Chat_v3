import { useState, useEffect } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import { myloginWithGoogle, myLogout, activateUpdate, writeUserData } from './Firebase';

function App() {
  const [user, setUser] = useState({
    nome: 'Usuário',
    email: 'Email',
    photo: viteLogo,
  });

  const [textInput, setTextInput] = useState('');

  const [tInput, setTInput] = useState("");

  const [posts, setPosts] = useState([{user: "Vitor", text: "alow", photo: "",time:0}]);
  
  useEffect(() => {
    activateUpdate(setPosts);
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  useEffect(()=>{
    setPosts(posts.sort((a, b) => {
      let da = new Date(a.time),
          db = new Date(b.time);
      return da - db;
    }));
  })

  return (
    <>
      <div className='divHeader'>
        <div className='divUsuario'>
          <img src={user.photo} className="logo" alt="React logo" />
          <div className='divUserEmail'>
            <h1 className='tUserName' >{user.nome}</h1>
            <h2 className='tEmail'>{user.email}</h2>
          </div>
        </div>
        {/* <hr /> */}
        <div className="card">
          <button className="bLoginGoogle" onClick={() => myloginWithGoogle(setUser)}>
            Login com Google
          </button>
          <button className="bDeslogar" onClick={() => myLogout()}>
            Deslogar
          </button>
        </div>
      </div>
      {/* <hr /> */}
      <div className='divPosts'>

        {posts.map((post) => (
            <div className="posts" key={post.key}>
              <img className='photo' src={post.photo} />
              <h2 className='tNameUser'>{post.user}:</h2>
              {post.time&&<h5 className='tHorario'>
              {`${(new Date(post.time)).getDate()}:${(new Date(post.time)).getMonth() < 10? "0"+(new Date(post.time)).getMonth().toString() : (new Date(post.time)).getMonth()}`}/
              {`${(new Date(post.time)).getHours()}:${(new Date(post.time)).getMinutes() < 10? "0"+(new Date(post.time)).getMinutes().toString() : (new Date(post.time)).getMinutes()}`}
              </h5>}
              <h3 className='tTextPost'>{post.text}</h3>
              
            </div>
          ))}
      </div>
      <div className='divEnviarMsg'>
        <input id='input1'
        placeholder="Digite sua mensagem..."
          onChange={(event) => {setTInput(event.target.value)}}
          onKeyUp={(event)=>{ 
              if(event.key === "Enter") {
              writeUserData(tInput)
              event.target.value=""
              }}}
        />
        <button className="bEnviarMsg" id='bEnviarMsg' onClick={() =>{
          writeUserData(tInput);
          let input1 = document.getElementById("input1");
          input1.value = "";
        }}>
          Enviar
        </button>
      </div>
    </>
  );
}


export default App;
