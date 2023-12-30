// 20種類のポケモンの情報(デフォルトが20種類表示のため)
//正しく受け取れたらJSON形式でApp.jsに返される。
export const getAllPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url).then((res) => res.json()).then((data) => resolve(data));
    });
};

// 1種類ずつのポケモンの表示
export const getPokemon = (url) => {
    return new Promise((resolve, reject) =>  {
        fetch(url).then((res) => res.json()).then((data) => { 
            //console.log(data);
            resolve(data)
        });
    });
} ;