import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { postVideogame, getGenres} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './Create.module.css'

function validate(input) {
    let errors = {};
    let regex = /[^a-z0-9\x20]/i;
    if(!input.name) errors.name = 'name required'
    else if(regex.test(input.name)) errors.name = 'no simbols allowed for name'
    else if(!input.description) errors.description = 'description required'
    else if(!input.release_date) errors.release_date = 'release_date required'
    else if(input.rating<0 || input.rating>5) errors.rating = 'valid rating required'
    return errors;
}

export default function CharacterCreate(){
    const dispatch = useDispatch()
    const navigate = useNavigate ()
    const genres = useSelector(state => state.genres) //mapStateToProps
    const platforms = ["PC", "PlayStation", "Xbox", "Nintendo", "iOS", "Android"]
    useEffect (() => dispatch(getGenres()),[dispatch]) //mapDispatchToProps

    const [input, setInput] = useState({
        name: '',
        description: '',
        release_date: '',
        rating: Number,
        platforms: [],
        genres: [],
        image: '',
    })
    const [errors, setErrors] = useState({})

    const [genreEvent, setGenreEvent] = useState({})
    const [platformEvent, setPlatformEvent] = useState({})

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }

    function handleAddGenre(){
        if(!input.genres.includes(genreEvent.target.value)){
            setInput({
                ...input,
                genres: [...input.genres, genreEvent.target.value]
            })
        }else {
            alert("genre already added!")
        }
    }

    function handleAddPlatform(){
        if(!input.platforms.includes(platformEvent.target.value)){
            setInput({
                ...input,
                platforms: [...input.platforms, platformEvent.target.value]
            })
        }else {
            alert("platform already added!")
        }
    }

    /* function handleDelete(e){
        setInput({
            ...input,
            genres: [...input.genres.filter(g => g !== e)]
        })
    } */

    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(errors).length !== 0 || input.name.length === 0){
            alert("complete the form correctly please")
        }else {
            dispatch(postVideogame(input))
            setInput({
                name: '',
                description: '',
                release_date: '',
                rating: Number,
                platforms: [],
                genres: [],
                image: '',
            })
            navigate('/home')
            alert("game created succesfully")
        }
    }

    return(
        <div className={styles.space}>
        <div className={styles.card}>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div>
                    <input type="text" value={input.name} name= 'name' onChange={(e) => handleChange(e)} placeholder='name'/>
                </div>
                {errors.name && (<p className='error'>{errors.name}</p>)}

                <div>
                    <textarea name="description" placeholder="description" onChange={(e) => handleChange(e)}></textarea>
                </div>
                {errors.description && (<p className='error'>{errors.description}</p>)}

                <div>
                    <label>release_date:    </label>
                    <input type="date" value={input.release_date} name= 'release_date' onChange={(e) => handleChange(e)}/>
                </div>
                {errors.release_date && (<p className='error'>{errors.release_date}</p>)}

                <div>
                    <label>rating:  </label>
                    <input type="number" value={input.rating} name= 'rating' onChange={(e) => handleChange(e)}/>
                </div>
                {errors.rating && (<p className='error'>{errors.rating}</p>)}

                <div>
                    <label>platforms</label>
                    <div>
                        <select onChange={(e) => setPlatformEvent(e)}>
                        <option key="default" value="default"> </option>
                            {platforms.map(e => {
                                return <option key={e} value={e}>{e}</option>
                            })}
                        </select>
                        <button type="button" onClick={() => handleAddPlatform()}>add</button>
                    </div>
                </div>
                <ul><li>{input.platforms.map(e=> e + ', ')}</li></ul>

                <div>
                    <label>add genre</label>
                    <div>
                        <select onChange={(e) => setGenreEvent(e)}>
                        <option key="default" value="default"> </option>
                            {genres.map(e => {
                                return <option key={e.name} value={e.name}>{e.name}</option>
                            })}
                        </select>
                        <button type="button" onClick={() => handleAddGenre()}>add</button>
                    </div>
                </div>
                <ul><li>{input.genres.map(e=> e + ', ')}</li></ul>

                <div>
                    <label>image url:   </label>
                    <input type="text" value={input.image} name= 'image' onChange={(e) => handleChange(e)}/>
                </div>
                <button type='submit'>create</button>
            </form>

            {/* <p>list of genres</p>
            {input.genres.map(e => 
            <div>
                <label>{e}</label>
                <button onClick={() => handleDelete(e)}>X</button>
            </div>   
            )} */}
        </div>
        </div>
    )
}