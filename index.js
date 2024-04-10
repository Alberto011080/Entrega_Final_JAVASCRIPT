//^Nos traemos la url y las opciones de la api  http: rapiapi.com


const url = './comics.json';
const opciones = {
	method: 'GET',
	// headers: {
	// 	'X-RapidAPI-Key': '5733f0a41fmshf76ced45b375d1bp1bab78jsn1b16b9a80934',
	// 	'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	// }
};


//funcion para obtener elementos del carrito.

//funcion para obtener elementos del carrito.
function obtenerElementosCarritoDesdeLocalStorage (){
    const elementosCarritoGuardados = localStorage.getItem('elementosCarrito');
    return elementosCarritoGuardados ? JSON.parse(elementosCarritoGuardados) : [];

    
 }
// funcion de guardar los elementos

function guardarElementosCarritoEnLocalStorage(){
   localStorage.setItem('elementosCarrito', JSON.stringify(elementosCarrito))


   localStorage.clear();
}






//de aqui obtenemos los juegos de la api.

async function obtenerJuegos(){
    try {
        const respuesta = await fetch(url, opciones);
        const datos = await respuesta.json();
        const primerosDiezJuegos= datos.slice(0, 20);
        console.log(datos);

    //dentro del try deberiamos aplicar los precios de los juegos que es la info que nos falta. La unica manera de hacerlo es hacerlo con condicionales.

        primerosDiezJuegos.forEach(juego =>{
            switch(juego.id){
                case '01':
                    juego.precio = 10;
                    break;

                case '02':
                    juego.precio = 15;
                    break;

                case '03':
                    juego.precio = 12;
                    break;

                case '04':
                    juego.precio = 9;
                    break;

                case '05':
                    juego.precio = 16;
                    break;

                    case '06':
                        juego.precio = 8;
                        break;
                    case '07':
                        juego.precio = 8;
                        break;
                        case '08':
                        juego.precio = 8;
                        break;
                        case '09':
                        juego.precio = 8;
                        break;
                        case '10':
                        juego.precio = 8;
                        break;
                        case '11':
                        juego.precio = 8;
                        break;
                        case '12':
                        juego.precio = 8;
                        break;
            default: 
                juego.precio = 0;
                break
            }
        }   )

        return primerosDiezJuegos;
    } catch (error) {
        console.error(error);
    }
}

obtenerJuegos()

async function renderizarJuegos(){
    const contenedorJuegos = document.getElementById('contenedorJuegos');
    const datosJuegos = await obtenerJuegos();

    datosJuegos.forEach(juego => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';

         const titulo = document.createElement('h2');
         titulo.textContent = juego.title;

         const imagen = document.createElement('img');
         imagen.src = juego.thumbnail

         const descripcion = document.createElement('p');
         descripcion.textContent = juego.short_description;
         const precio = document.createElement('p');
         precio.textContent = `Precio: ${juego.precio || 'gratis'}€`;
         

         const botonComprar = document.createElement('button');
         botonComprar.textContent = 'Comprar';
         botonComprar.addEventListener('click', () => agregarAlCarrito(juego))
    
        tarjeta.appendChild(titulo)
        tarjeta.appendChild(imagen)
        tarjeta.appendChild(descripcion)
        tarjeta.appendChild(precio)
        tarjeta.appendChild(botonComprar)
        
        contenedorJuegos.appendChild(tarjeta);
    
        });
}

//creamos la función del carrito y total
//funcion para gregas juegos al carrito

const elementosCarrito = obtenerElementosCarritoDesdeLocalStorage();
let totalCarrito = 0;


function agregarAlCarrito(juego){
    elementosCarrito.push(juego);
    if(juego.precio){
        totalCarrito += parseFloat(juego.precio)
    }
    guardarElementosCarritoEnLocalStorage();
    renderizarCarrito();
}

//funcion renderizado del producto para que se ve la logica en el DOM

function renderizarCarrito(){
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarritoElemento = document.getElementById ('totalCarrito')
    listaCarrito.innerHTML = '';
    elementosCarrito.forEach(item =>{
        const elementoLista = document.createElement('li');
        elementoLista.textContent = item.title;
        listaCarrito.appendChild(elementoLista);
    })
    totalCarritoElemento.textContent = totalCarrito.toFixed(2);
}


renderizarJuegos();