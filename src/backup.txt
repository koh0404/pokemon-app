import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);        //状態変数
  const [pokemonData, setPokemonData] = useState([]);  //状態変数
  const [nextURL, setNextURL] = useState("");          //状態変数
  const [prevURL, setPrevURL] = useState("");          //状態変数

  //ブラウザリロード時にポケモン表示したいからuseEffect使用
  //初期画面
  useEffect(() => {
    // ポケモンデータを取得するための関数作成。非同期処理で実装。
    const fetchPokemonData = async () => {
      //全てのポケモンのデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得(loadPokemon関数でmap関数を利用し取得している)
      loadPokemon(res.results);
      //console.log(res);
      //以下定義しているのはボタンをセットしているイメージ
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        //console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord; //詳細情報を返している
      })
    );
    setPokemonData(_pokemonData);
  };
  console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    //console.log(data);
    await loadPokemon(data.results);
    //以下定義しているのはボタンをセットしているイメージ
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  const handlePrevPage = async () => {
    if(!prevURL) return;

    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    //以下定義しているのはボタンをセットしているイメージ
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);

  };


  return (
    <>
    <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className = "pokemonCardContainer">
              {pokemonData.map((pokemon, i) => { // iはデフォで20匹表示なので0~19が入る
                return <Card key = {i} pokemon = {pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>

            </div>
          </>
        )}
      </div>
    </>
    );
}

export default App;
