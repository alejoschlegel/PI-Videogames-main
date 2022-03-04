const axios = require("axios")

function getVideogames(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        });
    }
}

function getGenres(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        });
    }
}

function getByName(payload){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/videogames?name=${payload}`);
            return dispatch({
                type: 'GET_BY_NAME',
                payload: json.data
            });
        }
        catch(err) {
            console.log("ERROR CATCHED: ", err)
        }

    }
}

function postVideogame(payload){
    return async function(dispatch){
        var json = await axios.post('http://localhost:3001/videogame', payload);
        console.log(json.data)
        return json.data
    }
}

function getByFilter(payload){
    return {
        type: 'GET_BY_FILTER',
        payload: payload
    }
}

function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload: payload
    }
}

function getByVideogame(payload){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogame/${payload}`);
            return dispatch({
                type: 'GET_BY_VIDEOGAME',
                payload: json.data
            });
        }catch(err) {
            console.log('ERROR_CATCHED: ' + err)
            return err
        }
    }
}

function deleteVideogame(payload){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/videogame/${payload}`);
            return dispatch({
                type: 'DELETE_BY_VIDEOGAME',
                payload: json.data
            });
        }catch(err) {
            console.log('ERROR_CATCHED: ' + err)
            return err
        }
    }
}

module.exports = {getVideogames, getGenres, getByName, postVideogame, getByFilter, orderByName, getByVideogame, deleteVideogame}