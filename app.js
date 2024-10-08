const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
})

api.defaults.headers.common['X-API-KEY'] = 'live_CP2m8iwvGrJjYfMwL2PwH4S436oCpghRZVMdhvNEnLsNAatJTh0w5unCUlv0qUNC'

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3'
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites'
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const API_URL_UPLOAD ='https://api.thecatapi.com/v1/images/upload' 



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
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        const btn3 = document.getElementById('btn3')
        
        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
        
        btn1.onclick = () => guardarFavoritos(data[0].id)
        btn2.onclick = () => guardarFavoritos(data[1].id)
        btn3.onclick = () => guardarFavoritos(data[2].id)
    }
    
    
}

async function cargarFavoritos() {

    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_CP2m8iwvGrJjYfMwL2PwH4S436oCpghRZVMdhvNEnLsNAatJTh0w5unCUlv0qUNC'
        }
    })
    const data = await res.json()
    console.log(data);

    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status
    } else {
        const section = document.getElementById('gatitos-favoritos')
        section.innerHTML = ""
        const h2 = document.createElement('h2')
        const h2Text = document.createTextNode('Gatitos Favoritos')
        h2.appendChild(h2Text)
        section.appendChild(h2)


        data.forEach(element => {
            const article = document.createElement('article')
            const img = document.createElement('img')
            const button = document.createElement('button')
            const buttonText = document.createTextNode('Sacar de Favoritos')

            button.appendChild(buttonText)
            img.src = element.image.url

            article.appendChild(img)
            article.appendChild(button)

            section.appendChild(article)

            button.onclick = () => eliminarFavoritos(element.id)

        });
    }
    
}
 
async function guardarFavoritos(id) {

    // const res = await fetch(API_URL_FAVORITES, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-API-KEY': 'live_CP2m8iwvGrJjYfMwL2PwH4S436oCpghRZVMdhvNEnLsNAatJTh0w5unCUlv0qUNC'
    //     },
    //     body: JSON.stringify({
    //         image_id: id
    //     })
    // })
    // const data = await res.json()

    const { data, status} = await api.post('/favourites', {
        image_id: id
    })
    
    console.log('save');
    
    
    if (status !== 200) {
        spanError.innerHTML = 'Hubo un error: '+ status + data.message 
    } else {
        console.log('Gatito agregado a favoritos');
        cargarFavoritos()
    }
}
async function eliminarFavoritos(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': 'live_CP2m8iwvGrJjYfMwL2PwH4S436oCpghRZVMdhvNEnLsNAatJTh0w5unCUlv0qUNC'
        }
    })

    const data = await res.json()

    if(res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status + data.message
    } else {
        console.log('Gatito eliminado de favoritos');
        cargarFavoritos()
    }

}

async function subirGatito() {
    const form = document.getElementById('subiendoFormulario')

    const formData = new FormData(form)

    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers: {
            'X-API-KEY': 'live_CP2m8iwvGrJjYfMwL2PwH4S436oCpghRZVMdhvNEnLsNAatJTh0w5unCUlv0qUNC'
        },
        body: formData
    } )

    const data = await res.json()

    if (res.status !== 201) {
        spanError.innerHTML = 'Hubo un error: '+ res.status + data.message 
    } else {
        console.log('Gatito guardado');
        console.log({ data });
        console.log(data.url);
        guardarFavoritos(data.id)
    }
    
}
 
mostrarGatito()
cargarFavoritos()


// Crear boton para cambiar la imagen


