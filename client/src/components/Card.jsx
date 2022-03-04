import React from 'react';
import styles from './Card.module.css'

export default function Card({image, name, genres, rating}) {
    let displayGenres = ''
    for (let i = 0; i < genres.length; i++) {
        displayGenres = displayGenres + genres[i]
        if(i < genres.length-1) displayGenres = displayGenres + ' / '
    }

    return (
        <div className={styles.card}>
            <img src={image} alt="img not found"/>
            <div className={styles.container}>
                <p>{name}</p>
                <p>{displayGenres}</p>
                <p>⭐{rating}</p>
            </div>
        </div>
    )
}