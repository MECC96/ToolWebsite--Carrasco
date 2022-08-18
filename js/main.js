//DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const tbody = document.getElementById("tbody");
const totalPrecio = document.getElementById("totalPrecio");
const unidadesTotales = document.getElementById("unidadesTotales");

//Crea una tarjeta por cada producto del stock
const crearTarjeta = () => {
  productos.forEach((producto) => {
    //Recorre el array de productos para crear una tarjeta por cada producto
    const div = document.createElement("div");
    div.classList.add("div__merch", "mb-5");
    div.innerHTML += `
        <!--Div contenedor de la ropa, descripcion y precio-->
        <div>
          <!--Div contenedor de la imagen-->
          <img src=${producto.imagen} alt="${producto.nombre}">
        </div>
        <div>
          <!--Div contenedor de la descripcion y precio-->
          <p><span>$ ${producto.precio}</span></p>
          <!--Precio-->
          <div>
            <!--Descripcion-->
            <p>${producto.nombre}</p>
          </div>
        </div>
          <button id="btn${producto.id}" class="btn">Buy</button>
  `;
    contenedorProductos.appendChild(div);

    const botonBuy = document.getElementById(`btn${producto.id}`); //boton que agrega al carrito cuando es activado
    botonBuy.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};
crearTarjeta(); //se llama a la funcion que crea los items del merch

let carrito = JSON.parse(localStorage.getItem("carrito")) || []; //aca el carrito toma la info que este en local storage o en su defecto si es un array vacio
actualizarCarrito();

//Funcion que agrega elementos al carrito
function agregarAlCarrito(prodId) {
  if (carrito.some((item) => item.id === prodId)) {
    alert("¡Este producto ya esta en el carrito!");
  } else {
    const item = productos.find((prod) => prod.id === prodId);
    carrito.push({
      ...item, //con esto copio todas las partes que contiene mi item y le agrego una nueva propiedad que es Unidades con el valor de 1
      unidades: 1,
    });
    actualizarCarrito();
  }
}
//Funcion que crea los items del carrito
function crearItemsCarrito() {
  tbody.innerHTML = ``;
  carrito.forEach((item) => {
    tbody.innerHTML += `
          <tr>
            <td class="d-flex justify-content-center td"> 
              <div class="tdImg" onclick="quitarItemCarrito(${item.id})"> <!-- Aca llamo a la funcion quitar carrito. la cual recibe por parametro el id del producto que se quiere quitar-->
                <img src=${item.imagen} alt="${item.nombre}"> 
                ${item.nombre}
              </div>
            </td>
            <td class="text-center td">$${item.precio}</td>
            <td class="td">
              <div class="units d-flex justify-content-evenly">
                <div id="menos${item.id}" class="btn__menos"  onclick="cambiarUnidades('menos', ${item.id})">-</div><!-- Aca llamo a la funcion cambiar unidades. la cual recibe por parametro el id del producto y la accion de restar unidades-->
                <div class="units__number">${item.unidades}</div>
                <div id="mas${item.id}" class="btn__mas"  onclick="cambiarUnidades('mas', ${item.id})">+</div><!-- Aca llamo a la funcion cambiar unidades. la cual recibe por parametro el id del producto y la accion de sumar unidades-->
              </div>
            </td>
        </tr>
    `;
  });
}
//esta funcion esta para ir actualizando el carrito constantantemente
function actualizarCarrito() {
  crearItemsCarrito();
  calcularTotal();

  localStorage.setItem("carrito", JSON.stringify(carrito));
}
//Funcion que quita al elemento seleccionado
function quitarItemCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id); //El carrito seria un nuevo array con todos los items que cumplan con la condicion del filter

  actualizarCarrito();
}
//Funcion que suma o resta las unidades del item seleccionado. Se ejecuta en el innerHTML de la funcion crearItemsCarrito
function cambiarUnidades(accion, id) {
  carrito = carrito.map((item) => {
    let unidades = item.unidades;

    if (item.id === id) {
      if (accion === "menos" && unidades > 1) {
        unidades--;
      } else if (accion === "mas" && unidades < item.stock) {
        unidades++;
      }
    }

    return {
      ...item, //con esto copio todas las partes que contiene mi item y le agrego una nueva propiedad que es Unidades pero modificadas
      unidades,
    };
  });

  actualizarCarrito();
}
//funcion que calcula y muestra el total a pagar y el total de items seleccionados
function calcularTotal() {
  let precioTotal = 0,
    totalUnidades = 0;

  carrito.forEach((item) => {
    totalUnidades += item.unidades;
    precioTotal += item.precio * item.unidades;
  });

  totalPrecio.innerText = `Total: $${precioTotal.toFixed(2)}`;
  unidadesTotales.innerText = `Total items: ${totalUnidades}`;
}
