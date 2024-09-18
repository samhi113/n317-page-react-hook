"use client";

import { useState } from "react";
import pokeStyles from "/pokemon.module.css";

//Pokemon data
/**
 * @typedef {Object} pokemonApiObject This is the object for a pokemon
 * @prop {String} name Name of pokemon
 * @prop {Object} sprites
 * @prop {String} sprites.front_default
 * @prop {Number} weight Divide by 10 to make it kg
 * @prop {Number} height Mult by 10 to make it cm
 * 
 */

export default function Pokemon() {
  /**
   * @type {[pokemonApiObject, Function]}
   */
  const [pokemon, setPokemon] = useState({});


  /**
   * @type {[String, Function]}
   */
  const [searchTerm, setSearchTerm] = useState("");

  function changeSearchTerm(e) {
    setSearchTerm(e.currentTarget.value);
  }

  async function searchForPokemonByName() {
    try {

      const rawData = await fetch (
        "https://pokeapi.co/api/v2/pokemon/${searchTerm}"
      );
      const pokeDataFormatted = await rawData.json();
      setPokemon(pokeDataFormatted);

    } catch (error) {
      setPokemon({name : searchTerm})
    }
  }


  return (
    <main>
      <h1>Pokemon Page</h1>
      <div className={pokeStyles.search}>
        <input type="search" id="search" name="search" value={searchTerm} onChange={changeSearchTerm}/>
        <input type="button" value="Search" onClick={searchForPokemonByName}/>
      </div>
    </main>
  );
}
