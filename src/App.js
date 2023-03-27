import { useEffect, useState } from 'react';
import './css/App.css';

function App() {

  const [ getConteudo, setConteudo ] = useState( <></> )
  const [q, setQ] = useState( '' )
  const [searchParam] = useState( ['status','name'] )	

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

  useEffect( ( ) => {
    async function load(){
      setConteudo( await listCharacter( ) )
    }
    load()
  }, []);

  return (
    <div className='App'>
      <header className='cabecalho'>
        <h1>Rick and Morty API</h1>
      </header>
      <div className='lista-principal'>
        { getConteudo }
      </div>
    </div>
  );
};

export default App;