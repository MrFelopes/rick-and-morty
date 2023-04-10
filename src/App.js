import { useEffect, useState } from 'react';
import './css/App.css';

function App() {

  const [ getConteudo, setConteudo ] = useState( <></> )
  const [busca, setBusca] = useState( [] )	

  async function loadAllCharacter( ){

    const result = await fetch(
      'https://rickandmortyapi.com/api/character/',
      { method : 'GET' }
    ).then((response) => response.json())

    return result.results;
  };

  async function listCharacter( ){                                        
    const all = await loadAllCharacter( );

    return all.map(e => 
      <div className='card char'>
        <div>
          <img src={ e.image } alt={ e.name }/>
        </div>
        <div>
          <h2>{ e.name }</h2>
        </div>
        <div className='char-info'>
          <span>Espécie: { ( e.species == 'Human' ? 'Humano' : 'Não Humano' ) }</span>
        </div>
        <div className='char-info'>
          <span>Gênero: { ( e.gender == 'Male' ? 'Masculino' : 'Feminino' ) }</span>
        </div>
        <div className='char-info lista-secundaria'>
          <span className='episodes'>Participações:</span>
          <span className='listep'>{ e.episode.map(ep => 
              <>EP-{ ( ep.charAt(40) < 1 ? ep.charAt(40) : ''+ ep.charAt(40) + '' + ep.charAt(41) +'' ) } | </>
            )
          }</span>
        </div>
        <div className='char-info'>
          <span>Status: { ( e.status == 'Alive' ? 'Vivo' : ( e.status == 'unknown' ? 'Desconhecido' : 'Morto' ) ) }</span>
        </div>
      </div>
    )
  };

  function montarFiltro(tipo, valor){
    const filtros = new URLSearchParams();               
    /* filtros = {

    }
    */ 

    const batata = filtros.get(valor)
    if (retorno === valor){
      filtros.delete(tipo)                            
    }                                                 

    filtros.set(tipo, valor)                            

    setBusca('?'+filtros.toString())                                             

    return filtros                                                
  } 
  
  useEffect( ( ) => {                                                 
    async function getConteudo(){                                     
      setConteudo( await listCharacter( ) )                                   
    }
    getConteudo()                                                           
  }, [busca])                                                                 

  return (                                                                
    <div className='App'> 
      <header className='cabecalho'>
        <h1>Rick and Morty API</h1>                                     
        <h2 href="/">Personagens</h2>
      </header>
      <div className='filtros'>
        <span className='filtros-titulo'>Filtros:</span> 
        <div className='filtro-status'>
          <b>Status:</b>
          <span onClick={() => montarFiltro('status', 'dead')}>Vivo</span>
          <span onClick={() => setBusca('?status=dead')}>Morto</span>
          <span onClick={() => setBusca('?status=unknown')}>Desconhecido</span>
        </div>
        <div className='filtro-genero'>
          <b>Gênero:</b>
          <span onClick={() => setBusca('?gender=male')}>Masculino</span>
          <span onClick={() => setBusca('?gender=female')}>Feminino</span>
          <span onClick={() => setBusca('?gender=genderless')}>Sem gênero</span>
          <span onClick={() => setBusca('?gender=unknown')}>Desconhecido</span>
      </div> 
      </div>
      <div className='lista-principal'>
        { getConteudo }
      </div>
    </div>
  );
};

export default App;