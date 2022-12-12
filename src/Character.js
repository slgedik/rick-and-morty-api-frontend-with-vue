import './App.css';
import React, { useEffect, useState } from 'react';

// Karakter bilgilerini burada bastırdım
function Character({ character }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    //KARAKTERLERİN GÖRÜNDÜĞÜ İLK BÖLÜMÜ BULMA
    const fetchData = async (apiUrl) => {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setData(json);
      } catch (error) {
        // Error handling
        console.error(error);
      }
    };

    fetchData(character.episode[0]);
  }, []);
  return (
    <div
      class='data max-w-sm rounded-lg overflow-hidden shadow-lg pb-8 '
      style={{ border: '1px solid #34344e' }}
    >
      <div class='pb-1.5' style={{ width: '238px', height: '134px' }}>
        <img
          class='w-full imgSize '
          style={{
            borderRadius: '8px 8px 0px 0px',
            width: '238px',
            height: '134px',
          }}
          src={character.image}
          alt='character image'
        />
      </div>
      <div class='px-4 py-4'>
        <div class='nameFont'> {character.name}</div>
      </div>
      <div class=' pl-2 ml-2 pb-2'>
        <span
          class=' w-24 inline-block rounded-lg px-3 py-1 text-sm font-semibold mr-2 mb-2'
          style={{
            backgroundColor: '#141227',
            color: '#b2b4d7',
            height: '35px',
          }}
        >
          <div>
            <div
              className={`circle ${
                character.status === 'Alive' ? 'alivePoint' : ''
              } 
        ${character.status === 'Dead' ? 'deadPoint' : ''} ${
                character.status === 'unknown' ? 'unknownPoint' : ''
              }`}
            />
            <p class='circle  {character.status.toLowerCase()}'>
              {character.status}
            </p>
          </div>
        </span>
        <span
          class='inline-block rounded-lg px-3 py-1 text-sm font-semibold mr-2 mb-2'
          style={{
            backgroundColor: '#141227',
            color: '#b2b4d7',
            height: '35px',
            textAlign: 'center',
          }}
        >
          {character.species}
        </span>{' '}
        <br />
        <span
          class='inline-block rounded-lg px-3 py-1 text-sm font-semibold  mr-2 mb-2'
          style={{
            backgroundColor: '#141227',
            color: '#b2b4d7',
            height: '35px',
            textAlign: 'center',
          }}
        >
          {character.gender}
        </span>
      </div>
      <div>
        <hr style={{ border: '1px solid #34344e' }} />
      </div>
      <div>
        <p class='p1'>Last known location:</p>
        <p class='p2'>{character['location']['name']}</p>
        <p class='p1'>First seen in:</p>
        <p class='p2'>{data.name}</p>
      </div>
    </div>
  );
}

export default Character;
