import React from 'react'
import "./Card.css";

const Card = ({pokemon}) => {
  return (
    <div className = "card">
      <div className = "cardImg">
        <img src = {pokemon.sprites.front_shiny} alt =""/>
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((type)=> {
          return (
            <div>
              <span className="typeName">{type.type.name}</span>
            </div>
          )
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ：{(pokemon.weight/10.0)}kg</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{(pokemon.height/10.0)}m</p>
        </div>
        <div className="cardData">
          <p className="title">特性：{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  )
}

export default Card