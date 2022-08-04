let answer, artículo;
let cantidad = 0;
const productos = [],
  carrito = [];

class Ropa {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

productos.push(new Ropa("Remera Negra", 29.99));
productos.push(new Ropa("Sweater Negro", 39.99));
productos.push(new Ropa("Remera Blanca", 34.99));
productos.push(new Ropa("Sweater Gris", 44.99));
productos.push(new Ropa("Remera Gris", 24.99));

//Funcion que quita los espacios en blanco
function quitarEspacios(text) {
  let regEx = new RegExp(" ", "g");
  return text.replace(regEx, "");
}
//funcion que recorre el array productos para ver si existe el articulo a comprar
function encontrarRopa(arrayRopa, ropaAEncontrar) {
  for (ropa of arrayRopa) {
    if (
      quitarEspacios(ropaAEncontrar).toLowerCase() ==
      quitarEspacios(ropa.nombre).toLowerCase()
    )
      return ropa;
  }
}

//funcion que recorre el array productos para retornar el indice donde se encuentra el producto a comprar
function encontrarIndice(arrayRopa, ropaAEncontrar) {
  for (ropa of arrayRopa) {
    if (
      quitarEspacios(ropaAEncontrar).toLowerCase() ==
      quitarEspacios(ropa.nombre).toLowerCase()
    )
      return arrayRopa.indexOf(ropa);
  }
}

//funcion que pide al usuario la cantidad de unidades que quiere del producto
function pedirCantidadArticulo(numero) {
  let unidades = parseInt(
    prompt(`Ingrese la cantidad de unidades que desea del artículo ${numero}:`)
  );
  if (unidades > 0) {
    return unidades;
  } else {
    alert("Dato ingresado inválido. Por favor, intente nuevamente.");
    pedirCantidadArticulo(numero);
  }
}

//funcion para imprimir los articulos comprados
function imprimirTicket() {
  carrito.forEach((carritoFinal) => {
    console.log(
      `producto: ${carritoFinal.artículo}, unidades: ${
        carritoFinal.cantidad
      }, total por producto: $${carritoFinal.cantidad * carritoFinal.monto}`
    );
  });
  const total = carrito.reduce(
    (acc, el) => acc + parseFloat(el.monto) * parseInt(el.cantidad),
    0
  );
  console.log(`El total a pagar por su compra es: $${total}`);
  alert("Gracias por tu compra! Hasta pronto");
}

function ingresarArtículo() {
  artículo = prompt(`Escriba el nombre del artículo que desee comprar:
    1) Remera Negra $29.99.
    2) Sweater Negro $39.99.
    3) Remera Blanca $34.99.
    4) Sweater Gris $44.99.
    5) Remera Gris $24.99.`);

  let ropaEncontrada = encontrarRopa(productos, artículo);

  if (ropaEncontrada) {
    let indice = encontrarIndice(productos, artículo);

    cantidad = parseInt(pedirCantidadArticulo(indice + 1));
    let monto = productos[indice].precio;
    artículo = productos[indice].nombre;
    carrito.push({ artículo, cantidad, monto });
    answer = confirm(`¿Deseas hacer otra compra?`);
  } else {
    alert("El producto no existe");
    ingresarArtículo();
  }
}

//Mensaje de bienvenida al usuario
alert(`¡Bienvenidos a la tienda virtual de la banda TOOL!`);

//ciclo que ejecuta el algoritmo las veces que el usuario desee

do {
  ingresarArtículo();
} while (answer);
//Funncion que muestra los productos, unidades, monto por cada articulo y monto total de la compra por consola
imprimirTicket();
