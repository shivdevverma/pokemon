'use client'
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function Home() {

  const [pokemons, setPokemons] = useState()

  function getData() {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(res => res.json())
      .then(res => { setPokemons(res.results) })
  }

  useEffect(() => {
    getData()
  }, [])

  const [option, setOption] = useState()

  function handleChange(event) {
    const selectValue = event.target.value;
    setOption(selectValue);
  }
  const [selectValue, setSearchValue] = useState()

  return (
    <div className="font-sans p-4 mx-auto lg:max-w-5xl md:max-w-3xl sm:max-w-full viewpage">
      <form className="max-w-sm mx-auto mb-4 pt-5">
        <select id="countries" className="bg-white-50 border border-gray-300 text-gray-900
         text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
          p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}>
          <option value="">Select</option>
          {pokemons && pokemons.map((pokemon) => (
            <option value={pokemon.name}>{pokemon.name}</option>
          ))}
        </select>
      </form>

      <div className="max-w-sm mx-auto mb-5">
        <input className="border-2 border-gray-300 bg-white h-11 px-5 pr-160
         rounded-lg text-sm focus:outline-none searchbox"
          type="search" name="search" placeholder="Search..."
          onChange={e => setSearchValue(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons &&
          pokemons.filter(item => (!option || item.name === option) && (!selectValue || item.name.includes(selectValue))).map((item, index) => (
            <div className="bg-white rounded overflow-hidden shadow-md hover:scale-[1.02] transition-all">
              <div className="w-full aspect-w-16 aspect-h-8 lg:h-60">
                <img src={`https://img.pokemondb.net/artwork/${item.name}.jpg`} className="image text-center" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 pl-3">{item.name}</h3>
                <Link href={`/${index + 1}`} className="inline-flex items-center px-3 py-2 text-sm font-large text-black  rounded-lg e">
                  Details
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
