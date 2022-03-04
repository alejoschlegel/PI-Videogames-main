import React, { useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByVideogame } from "../actions";
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css'

export default function Detail (){
    const dispatch = useDispatch()
    const {id} = useParams()

    const detail = useSelector ((state) => state.detail) //mapStateToProps
    useEffect (() =>{
        dispatch(getByVideogame(id)) //mapDispatchToProps
    }, [])

    return(
        Object.keys(detail).length?
        <div className={styles.body}>
            <div className={styles.container}>

                <h1>{detail.name}</h1>
                <img src={detail.image} alt="img not found"  width="600px" height="350px"/>
                <div>{detail.description}</div>

                <div className={styles.grid}>
                    <div>rating</div>
                    <div>{detail.rating}</div>
                    <div>release_date</div>
                    <div>{detail.release_date}</div>
                    <div>platforms</div>
                    <div>{detail.platforms + " "}</div>
                    <div>genres</div>
                    <div>{detail.genres + " "}</div>
                </div>

            </div>
        </div>
        
        :setTimeout(() => {return <div  className={styles.error}>oops, we couldnt find this game... 😞, try another one!! 😄</div>}, 1000)
       
        
    )
}