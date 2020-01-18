// componentes: Bloco insolado de HTML css e js no qual nao interfere no retante da aplicação..
// propriedade: Sao informações que um componete PAI passa para os seus componentes FILHO.
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)
import React , { useState,useEffect }from 'react';
import api from './services/api'


import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import DevItnes from './components/DevItens'
import DevForm from './components/DevForm'

function App() {//componente pai

  const [devs, setDevs] = useState([]);

  useEffect(()=>{
    async function LoadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    LoadDevs();
    
  },[]);

  async function AddingDev(data) {
    const response = await api.post(('/devs'),data);
    console.log(data);
    setDevs([...devs, response.data]);
  }

  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        < DevForm onSubmit={AddingDev}/> 
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            < DevItnes key={dev._id} dev={dev} /> // componetes            
            ))}
        </ul>
      </main>
    </div>
  );
}// ex de componentes... nuca criar mais de um componente por arquivo.js

export default App;
