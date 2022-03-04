import React from 'react';
import styles from './nav.module.css'
import { Link } from 'react-router-dom'


export default function Card({image, name, genres}) {
    return (
        <div className={styles.topbar}>
            <p>VIDEOGAMES</p>
            <Link to={'/home'} className={styles.text}>home</Link>
            <Link to={'/videogame'} className={styles.text}>add videogame</Link>
        </div>
    )
}