const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_CP2m8iwvGrJjYfMwL2PwH4S436oCpghRZVMdhvNEnLsNAatJTh0w5unCUlv0qUNC'



const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_CP2m8iwvGrJjYfMwL2PwH4S436oCpghRZVMdhvNEnLsNAatJTh0w5unCUlv0qUNC'


const spanError = document.getElementById('error')

// Utilizar async y await 
// Crear boton para cambiar la imagen

async function mostrarGatito() {
    
    const res = await fetch(API_URL_RANDOM)
    const data = await res.json()
    console.log(data);
    
    if(res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status
    } else {
        const img1 = document.getElementById('img1')
        const img2 = document.getElementById('img2')
        const img3 = document.getElementById('img3')
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
    }
    
    
}

async function cargarFavoritos() {

    const res = await fetch(API_URL_FAVORITES)
    const data = await res.json()
    console.log(data);

    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status
    }
    
}

async function guardarFavoritos() {

    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: '6kp'
        })
    })
    
    console.log('save');
    console.log(res);
    
}

mostrarGatito()
cargarFavoritos()


// Crear boton para cambiar la imagen


