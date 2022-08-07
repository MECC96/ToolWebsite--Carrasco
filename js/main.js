let answer, artículo;
let cantidad = 0;
const productos = [],
  carrito = [];

class Ropa {
  constructor(nombre, precio, imagen, id) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.id = id;
  }
}

productos.push(
  new Ropa("Black T-Shirt", 29.99, "../images/black-t-shirt.jpg", 1)
);
productos.push(
  new Ropa("Black Sweater", 39.99, "../images/black-sweater.jpg", 2)
);
productos.push(
  new Ropa("White T-Shirt", 34.99, "../images/white-t-shirt.jpg", 3)
);
productos.push(
  new Ropa("Gray Sweater", 44.99, "../images/gray-sweater.jpg", 4)
);
productos.push(
  new Ropa("Gray T-Shirt", 24.99, "../images/gray-t-shirt.jpg", 5)
);

const contenedorProductos = document.getElementById("contenedor-productos");

productos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("div__merch", "mb-5");
  div.innerHTML = `
        <!--Div contenedor de la ropa, descripcion y precio-->
        <div>
          <!--Div contenedor de la imagen-->
          <img src=${producto.imagen} alt="Black T-shirt">
        </div>
        <div>
          <!--Div contenedor de la descripcion y precio-->
          <p><span>$ ${producto.precio}</span></p>
          <!--Precio-->
          <div>
            <!--Descripcion-->
            <p>${producto.nombre}</p>
            <!--Descripcion-->
          </div>
        </div>
          <button id="btn${producto.id}" class="btn">Buy</button>
  `;
  contenedorProductos.appendChild(div);
  const boton = document.getElementById(`btn${producto.id}`);
  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
});
//Funcion que agrega elementos al carrito
function agregarAlCarrito(prodId) {
  const item = productos.find((prod) => prod.id === prodId);
  carrito.push(item);
  console.log(carrito);
}

// //Funcion que quita los espacios en blanco
// function quitarEspacios(text) {
//   let regEx = new RegExp(" ", "g");
//   return text.replace(regEx, "");
// }
// //funcion que recorre el array productos para ver si existe el articulo a comprar
// function encontrarRopa(arrayRopa, ropaAEncontrar) {
//   for (ropa of arrayRopa) {
//     if (
//       quitarEspacios(ropaAEncontrar).toLowerCase() ==
//       quitarEspacios(ropa.nombre).toLowerCase()
//     )
//       return ropa;
//   }
// }

// //funcion que recorre el array productos para retornar el indice donde se encuentra el producto a comprar
// function encontrarIndice(arrayRopa, ropaAEncontrar) {
//   for (ropa of arrayRopa) {
//     if (
//       quitarEspacios(ropaAEncontrar).toLowerCase() ==
//       quitarEspacios(ropa.nombre).toLowerCase()
//     )
//       return arrayRopa.indexOf(ropa);
//   }
// }

// //funcion que pide al usuario la cantidad de unidades que quiere del producto
// function pedirCantidadArticulo(numero) {
//   let unidades = parseInt(
//     prompt(`Ingrese la cantidad de unidades que desea del artículo ${numero}:`)
//   );
//   if (unidades > 0) {
//     return unidades;
//   } else {
//     alert("Dato ingresado inválido. Por favor, intente nuevamente.");
//     pedirCantidadArticulo(numero);
//   }
// }

//funcion para imprimir los articulos comprados
// function imprimirTicket() {
//   carrito.forEach((carritoFinal) => {
//     console.log(
//       `producto: ${carritoFinal.artículo}, unidades: ${
//         carritoFinal.cantidad
//       }, total por producto: $${carritoFinal.cantidad * carritoFinal.monto}`
//     );
//   });
//   const total = carrito.reduce(
//     (acc, el) => acc + parseFloat(el.monto) * parseInt(el.cantidad),
//     0
//   );
//   console.log(`El total a pagar por su compra es: $${total}`);
//   alert("Gracias por tu compra! Hasta pronto");
// }

// function ingresarArtículo() {
//   artículo = prompt(`Escriba el nombre del artículo que desee comprar:
//     1) Remera Negra $29.99.
//     2) Sweater Negro $39.99.
//     3) Remera Blanca $34.99.
//     4) Sweater Gris $44.99.
//     5) Remera Gris $24.99.`);

//   let ropaEncontrada = encontrarRopa(productos, artículo);

//   if (ropaEncontrada) {
//     let indice = encontrarIndice(productos, artículo);

//     cantidad = parseInt(pedirCantidadArticulo(indice + 1));
//     let monto = productos[indice].precio;
//     artículo = productos[indice].nombre;
//     carrito.push({ artículo, cantidad, monto, id });
//     answer = confirm(`¿Deseas hacer otra compra?`);
//   } else {
//     alert("El producto no existe");
//     ingresarArtículo();
//   }
// }

// //Mensaje de bienvenida al usuario
// alert(`¡Bienvenidos a la tienda virtual de la banda TOOL!`);

// //ciclo que ejecuta el algoritmo las veces que el usuario desee

// do {
//   ingresarArtículo();
// } while (answer);
// //Funcion que muestra los productos, unidades, monto por cada articulo y monto total de la compra por consola
// imprimirTicket();
