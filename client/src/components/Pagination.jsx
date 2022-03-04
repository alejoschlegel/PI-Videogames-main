import React from "react"
import styles from './Pagination.module.css'

export default function Pagination({allVideogames, perPage, currentPage, setCurrentPage}){
    
    let pages = []
    for (let i = 1; i <= Math.ceil(allVideogames.length/perPage); i++) {
        pages.push(i)
    }
    const handleClick = (e) => {setCurrentPage(Number(e.target.id))}
    const handlePrevious = (e) => {setCurrentPage(currentPage - 1)}
    const handleNext = (e) => {setCurrentPage(currentPage + 1)}

    const renderPageNumbers= pages.map(n => {
        return (
            <li key={n} id={n} onClick={handleClick}> {n} </li>
        )
    })
    return (
        <ul className={styles.pagination}>
            <li><button disabled={currentPage === 1? true: false} onClick={handlePrevious}>PREV</button></li>
            {renderPageNumbers}
            <li><button disabled={currentPage === 7? true: false} onClick={handleNext}>NEXT</button></li>
        </ul>
    )
}