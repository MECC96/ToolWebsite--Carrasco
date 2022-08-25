//DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const tbody = document.getElementById("tbody");
const totalPrecio = document.getElementById("totalPrecio");
const unidadesTotales = document.getElementById("unidadesTotales");

//Crea una tarjeta por cada producto del stock
const crearTarjeta = () => {
  productos.forEach((producto) => {
    const { imagen, nombre, id, precio } = producto;
    //Recorre el array de productos para crear una tarjeta por cada producto
    const div = document.createElement("div");
    div.classList.add("div__merch", "mb-5");
    div.innerHTML += `
        <!--Div contenedor de la ropa, descripcion y precio-->
        <div>
          <!--Div contenedor de la imagen-->
          <img src=${imagen} alt="${nombre}">
        </div>
        <div>
          <!--Div contenedor de la descripcion y precio-->
          <p><span>$ ${precio}</span></p>
          <!--Precio-->
          <div>
            <!--Descripcion-->
            <p>${nombre}</p>
          </div>
        </div>
          <button id="btn${id}" class="btn">Add</button>
  `;
    contenedorProductos.appendChild(div);

    const botonBuy = document.getElementById(`btn${id}`); //boton que agrega al carrito cuando es activado
    botonBuy.addEventListener("click", () => {
      agregarAlCarrito(id);
    });
  });
};
crearTarjeta(); //se llama a la funcion que crea los items del merch

let carrito = JSON.parse(localStorage.getItem("carrito")) || []; //aca el carrito toma la info que este en local storage o en su defecto si es un array vacio. Usando operador OR.
actualizarCarrito();

//Funcion que agrega elementos al carrito
function agregarAlCarrito(prodId) {
  const existe = carrito.some((item) => item.id === prodId);
  existe ? crearAlerta() : pushearItem(); //Usando operador TERNARIO
  function crearAlerta() {
    swal.fire({
      title: `¡Este producto ya esta en el carrito!`,
      icon: `warning`,
      position: `top`,
      width: `20%`,
      color: `#d7cdb3`,
      background: `#222`,
    });
  }
  function pushearItem() {
    const item = productos.find((prod) => prod.id === prodId);
    carrito.push({
      ...item, //con esto copio todas las partes que contiene mi item y le agrego una nueva propiedad que es Unidades con el valor de 1. Usando operador SPREAD.
      unidades: 1,
    });
    swal.fire({
      title: `¡Agregaste ${item.nombre} al carrito!`,
      icon: `success`,
      position: `top`,
      width: `25%`,
      color: `#d7cdb3`,
      background: `#222`,
    });
    actualizarCarrito();
  }
}
//Funcion que crea los items del carrito
function crearItemsCarrito() {
  tbody.innerHTML = ``;
  carrito.forEach((item) => {
    const { imagen, nombre, id, precio, unidades } = item;
    tbody.innerHTML += `
          <tr>
            <td class="d-flex justify-content-center td"> 
              <div class="tdImg" onclick = "quitarItemCarrito(${id})"> <!-- Aca llamo a la funcion quitar carrito. la cual recibe por parametro el id del producto que se quiere quitar-->
                <img src=${imagen} alt="${nombre}"> 
                ${nombre}
              </div>
            </td>
            <td class="text-center td">$${precio}</td>
            <td class="td">
              <div class="units d-flex justify-content-evenly">
                <div id="menos${id}" class="btn__menos"  onclick="cambiarUnidades('menos', ${id})">-</div><!-- Aca llamo a la funcion cambiar unidades. la cual recibe por parametro el id del producto y la accion de restar unidades-->
                <div class="units__number">${unidades}</div>
                <div id="mas${id}" class="btn__mas"  onclick="cambiarUnidades('mas', ${id})">+</div><!-- Aca llamo a la funcion cambiar unidades. la cual recibe por parametro el id del producto y la accion de sumar unidades-->
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
  Swal.fire({
    title: "¿Está seguro de eliminar el producto?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    position: `top`,
    width: `20%`,
    color: `#d7cdb3`,
    background: `#222`,
  }).then((result) => {
    if (result.isConfirmed) {
      carrito = carrito.filter((item) => item.id !== id); //El carrito seria un nuevo array con todos los items que cumplan con la condicion del filter
      actualizarCarrito();
      Swal.fire({
        title: "Borrado!",
        icon: "success",
        text: "El archivo ha sido borrado",
        position: `top`,
        width: `20%`,
        color: `#d7cdb3`,
        background: `#222`,
      });
    }
  });
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
      ...item, //con esto copio todas las partes que contiene mi item y le agrego una nueva propiedad que es Unidades pero modificadas. Usando operador SPREAD.
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
function confirmarCompra() {
  const comprar = document.getElementById("comprar");
  comprar.onclick = () => {
    if (carrito.length == 0) {
      Swal.fire({
        title: `¡No tienes productos en el carrito!`,
        icon: `warning`,
        position: `top`,
        width: `20%`,
        color: `#d7cdb3`,
        background: `#222`,
      });
    } else if (carrito != []) {
      Swal.fire({
        title: "¿Está seguro de querer finalizar la compra?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        position: `top`,
        width: `20%`,
        color: `#d7cdb3`,
        background: `#222`,
      }).then((result) => {
        if (result.isConfirmed) {
          carrito = []; //El carrito seria un nuevo array con todos los items que cumplan con la condicion del filter
          actualizarCarrito();
          Swal.fire({
            title: "¡Excelente!",
            icon: "success",
            text: "¡Muchas gracias por su compra!",
            position: `top`,
            width: `20%`,
            color: `#d7cdb3`,
            background: `#222`,
          });
        }
      });
    }
  };
}
confirmarCompra();
