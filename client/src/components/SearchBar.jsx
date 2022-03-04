import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";

export default function SearchBar ({games, setGames}){
    const dispatch = useDispatch()
    const [searched, setSearch] = useState('')

    function handleInput(e){
        e.preventDefault();
        setSearch(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        setSearch('')
        dispatch(getByName(searched))
        document.getElementById("input").value=""
    }

    return (
        <div>
            <input id="input" type="text" placeholder="name..." onChange= {(e) => handleInput(e)}/>
            <button type="submit" onClick={(e) => handleSubmit(e)}>search</button>
        </div>
    )
}