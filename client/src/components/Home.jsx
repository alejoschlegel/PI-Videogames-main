import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames, getByFilter, orderByName, getGenres} from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';
import { useState } from 'react';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import styles from './Home.module.css';
import Nav from './Nav'
import gif from "../loading.gif"

export default function Home (){

    const dispatch = useDispatch();

    const allVideogames = useSelector((state) => state.videogames) //mapStateToProps
    const allgenres = useSelector((state) => state.genres)

    useEffect (() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    },[dispatch]) //mapDispatchToProps

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(15)
    const [refresh, setRefresh] = useState('')
    const [games, setGames] = useState()

    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const currents = allVideogames && allVideogames.slice(firstIndex, lastIndex)

    function handleFilter(e){
        dispatch(getByFilter(e.target.value))
        setCurrentPage(1)
    }
    
    function handleOrderByName(e){
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setRefresh(`refreshed ${e.target.value}`)
    }

    return (
        <div>

            <Nav/>

            <div className={styles.bars}>
                <select onChange={e => handleFilter(e)}>

                    <option value='All'>{'All'}</option>
                    <option value='Existing'>{'Existing'}</option>
                    <option value='Created'>{'Created'}</option>
                </select>

                <select onChange={e => handleFilter(e)}>

                    <option value='All'>{'All'}</option>
                    {allgenres &&  allgenres.map((e) => {
                        return (
                            <option value={e.name} key={e.id}>{e.name}</option>
                        )
                    })}
                </select>

                 <select onChange={e => handleOrderByName(e)}> 
                    <option value='A-Z'>{'A-Z'}</option>
                    <option value='Z-A'>{'Z-A'}</option>
                    <option value='high rating'>{'high rating'}</option>
                    <option value='low rating'>{'low rating'}</option>
                </select>

                <SearchBar games = {games} setGames = {setGames}/>
                    
            </div>

            {
            !allVideogames.length? 
            <div className={styles.loading}>
                <img src={gif} alt="gif not found"/>
                LOADING...
            </div>:null
            }

            <div className={styles.cards}>
            {currents && currents.map((e) => {
                return (
                    <Link to={`/home/${e.id}`} className={styles.text} key={e.id}>
                        <Card image={e.image} name={e.name} genres={e.genres} rating={e.rating}/>
                    </Link>
                )
            })}
            </div>

            <div>
                <Pagination allVideogames={allVideogames} perPage={perPage} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    )
}