import { useParams } from "react-router-dom"

const initialState = {
    videogames: [],
    allVideogames: [],
    searched: [],
    genres: [],
    detail: [],
}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }
        case 'POST_VIDEOGAMES':
            return {
                ...state
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'GET_BY_NAME':
            return{
                ...state,
                videogames: action.payload,
                searched: action.payload
            }
        case 'GET_BY_FILTER':
            let filtered = state.videogames;
            let all = state.allVideogames;
            if(state.searched.length) all = state.searched

            if(action.payload === "All") filtered = all
            else if(action.payload === "Created") filtered = all.filter(e => isNaN(e.id) === true)
            else if(action.payload === "Existing") filtered = all.filter(e => isNaN(e.id) === false)
            else filtered = all.filter(e => e.genres.includes(action.payload))

            return{
                ...state,
                videogames: filtered
            };
        case 'ORDER_BY_NAME':
            if(action.payload === 'A-Z'){
                state.videogames.sort((a,b) => {
                    if(a.name > b.name) return 1
                    if(a.name < b.name) return -1
                    return 0
                })
            }
            if(action.payload === 'Z-A'){
                console.log('Z-A')
                state.videogames.sort((a,b) => {
                    if(a.name > b.name) return -1
                    if(a.name < b.name) return 1
                    return 0
                })
            }
            if(action.payload === 'high rating'){
                state.videogames.sort((a,b) => {
                    if(a.rating > b.rating) return -1
                    if(a.rating < b.rating) return 1
                    return 0
                })
            }
            if(action.payload === 'low rating'){
                state.videogames.sort((a,b) => {
                    if(a.rating > b.rating) return 1
                    if(a.rating < b.rating) return -1
                    return 0
                })
            }
            return{
                ...state, 
                videogames: state.videogames 
            }
        case 'GET_BY_VIDEOGAME':
            return{
                ...state,
                detail: action.payload
            }
        case 'DELETE_BY_VIDEOGAME':
            return{
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;