export function loadUsers(){
    return (dispath ) =>{
        return dispath(fetchUsers())
    }
}
function fetchUsers(){
    return {
        type:'LOAD_USERS',
        payload: fetch('https://jsonplaceholder.typicode.com/users').then(result =>(result.json))
    }
}
export function loadAlbums(userID) {
    return (dispatch) => {
    return dispatch(fetchAlbums(userID))
    }
    }
    function fetchAlbums(userID) {
    return {
    type: 'LOAD_ALBUMS',
    payload: fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userID}`)
    .then(result => result.json())
    }
    }
    export function loadPhotos(albumID) {
        return (dispatch) => {
        return dispatch(fetchPhotos(albumID))
        }
        }
        function fetchPhotos(albumID) {
        return {
        type: 'LOAD_PHOTOS',
        payload: fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumID}`)
        .then(result => result.json())
        }
        }
    export function registration(name, event){
        
    }    