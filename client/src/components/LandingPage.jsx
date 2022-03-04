import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={styles.container}>
            <div className={styles.card}>
            <p>{">  Immersing yourself in the world of video games..."}</p>
            <p>{"..."}</p>
            <p>{">  Please press OK to continue."}</p>
            <Link to ='/home'>
                <button>{"OK "}</button>
            </Link>
            </div>
        </div>
    )

}