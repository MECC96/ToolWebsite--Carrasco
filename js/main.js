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
//Crea una tarjeta por cada producto del stock
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
