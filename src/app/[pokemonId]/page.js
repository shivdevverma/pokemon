'use client'
import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import Link from 'next/link';

export default function DetailPage() {
    const param = useParams();
    const pokmonId = param.pokemonId;

    const [pokemonDetail, setPokemonDetail] = useState()

    function getData() {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokmonId}`)
            .then(res => res.json())
            .then(res => { setPokemonDetail(res) })
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(pokemonDetail)
    return (
        <div className="font-sans p-4 mx-auto lg:max-w-5xl md:max-w-3xl sm:max-w-full">
            <Link href={'/'}><p className='p-5'>Back</p></Link>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="big-image rounded-t-lg p-5" src={`https://img.pokemondb.net/artwork/${pokemonDetail?.name}.jpg`} />
                </a>
                <div className="detailbgcolor p-5">
                    <p><b>Name</b>: {pokemonDetail?.name}</p>
                    <p><b>Type</b>: {pokemonDetail?.types.map((item, i, arr) => (
                        <span> {item.type.name}{i != (arr.length - 1) ? ',' : ''} </span>
                    ))}</p>
                    <p><b>Stats</b>: {pokemonDetail?.stats.map((item, i, arr) => (
                        <span> {item.stat.name}{i != (arr.length - 1) ? ',' : ''} </span>
                    ))}</p>
                    <p><b>Abilities</b>: {pokemonDetail?.abilities.map((item, i, arr) => (
                        <span> {item.ability.name}{i != (arr.length - 1) ? ',' : ''} </span>
                    ))}</p>

                    <p><b>Same Moves</b>: {pokemonDetail?.moves.map((item, i, arr) => (
                        <span> {item.move.name}{i != (arr.length - 1) ? ',' : ''} </span>
                    ))}</p>
                </div>
            </div>
        </div>
    )
}


