import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Character from './Character';

function App() {
  const [characters, setCharacters] = useState({});
  const [filtered, setFiltered] = useState({}); // filtrelerken asıl datayı kaybetmemek için aynı api'yi  başka bir dataya daha çektim
  const [visible, setVisible] = useState(20);

  const url = 'https://rickandmortyapi.com/api/character/';

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const results = [];

        const response = await axios.get(
          'https://rickandmortyapi.com/api/character/'
        );

        const pageCount = response.data.info.pages; // Api'ye yeni page eklenmesi durumunda pageCount'da güncellenir

        console.log('page', pageCount);
        for (let i = 1; i <= pageCount; i++) {
          // tüm page'leri bir değişkene pushladım ve filtreleme işlemini bu değişken üzerinden yaptım
          const res = await axios.get(`${url}?page=${i}`);
          if (!cancelled) {
            results.push(...res.data.results);
          }
        }

        setCharacters(results);
        setFiltered(results);
      } catch (error) {
        // Error handling
        console.log(error);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  // her sayfada başlangıçta 20 data gösterilir show more tuşuna basıldıgında 20 data daha gelir
  const loadMoreCharacters = () => {
    setVisible((prevValue) => prevValue + 20);
  };

  console.log('CHARACTERS', characters);

  function filterType(type) {
    // Butonlara göre karakter filtreleme
    if (type === 'All') {
      console.log(type);
      setVisible(20);
      setFiltered(characters);
      return;
    }

    const filteredData = Object.values(characters).filter(
      (item) => item.species === type
    );
    setVisible(20);
    setFiltered(filteredData);
    //console.log(characters.typeOf);
  }

  return (
    <body className='bodyClass'>
      <header className='header'>
        <div
          style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}
        >
          <img
            style={{
              width: '229.16px',
              height: '70px',
              /*top: '15px',
              left: '845px',*/
              margin: 'auto',
            }}
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/800px-Rick_and_Morty.svg.png'
            alt=''
          />
        </div>
      </header>
      <div className='container'>
        <nav style={{ backgroundColor: '#141227', marginBottom: '2%' }}>
          <div
            className='flex w-max items-end gap-4 mt-8 button'
            style={{ marginRight: '16px' }}
          >
            <button
              class=' btnClass text-white p2 pt-2 px-4 pb-6 rounded '
              onClick={() => filterType('All')}
            >
              Show All
            </button>
            <button
              class='btnClass text-white p2 py-2 px-4 rounded'
              onClick={() => filterType('Human')}
            >
              Human
            </button>
            <button
              class='btnClass text-white p2 py-2 px-4 rounded'
              onClick={() => filterType('Alien')}
            >
              Alien
            </button>
            <button
              class='btnClass text-white p2 py-2 px-4 rounded'
              onClick={() => filterType('Animal')}
            >
              Animal
            </button>
          </div>
        </nav>

        <div class='dataContainer '>
          {Array.from(filtered)
            .slice(0, visible)
            .map((character) => {
              return <Character character={character} />;
            })}
        </div>

        <div>
          <button
            style={{
              width: '431px',
              height: '56px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            class='btnClass text-white p2 py-2 px-4 mt-8 rounded '
            onClick={loadMoreCharacters}
          >
            Show More
          </button>
        </div>
      </div>
      <div
        style={{
          background: '#23233F',
          /*position: 'absolute',*/
          width: '100%',
          height: '100px',
          left: '0px',
          top: '0px',
        }}
      >
        <p class='text-center' style={{ paddingTop: '41px', color: 'white' }}>
          2022 Onedio. All rights reserved
        </p>
      </div>
    </body>
  );
}

export default App;
