const contenedorProductos = document.getElementById("contenedor-productos");
const tbody = document.getElementById("tbody");
const totalPrecio = document.getElementById("totalPrecio");
const unidadesTotales = document.getElementById("unidadesTotales");

//Crea una tarjeta por cada producto del stock
const crearTarjeta = () => {
  productos.forEach((producto) => {
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

    const botonBuy = document.getElementById(`btn${producto.id}`);
    botonBuy.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};
crearTarjeta();
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarCarrito();

//Funcion que agrega elementos al carrito
function agregarAlCarrito(prodId) {
  if (carrito.some((item) => item.id === prodId)) {
    alert("¡Este producto ya esta en el carrito!");
  } else {
    const item = productos.find((prod) => prod.id === prodId);
    carrito.push({
      ...item,
      unidades: 1,
    });
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  crearItemsCarrito();
  calcularTotal();

  localStorage.setItem("carrito", JSON.stringify(carrito));
}
function quitarItemCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);

  actualizarCarrito();
}
function crearItemsCarrito() {
  tbody.innerHTML = ``;
  carrito.forEach((item) => {
    tbody.innerHTML += `
          <tr>
            <td class="d-flex justify-content-center td"> 
              <div class="tdImg" onclick="quitarItemCarrito(${item.id})">
                <img src=${item.imagen} alt="${item.nombre}"> 
                ${item.nombre}
              </div>
            </td>
            <td class="text-center td">$${item.precio}</td>
            <td class="td">
              <div class="units d-flex justify-content-evenly">
                <div id="menos${item.id}" class="btn__menos"  onclick="cambiarUnidades('menos', ${item.id})">-</div>
                <div class="units__number">${item.unidades}</div>
                <div id="mas${item.id}" class="btn__mas"  onclick="cambiarUnidades('mas', ${item.id})">+</div>
              </div>
            </td>
        </tr>
    `;

    //const menos = document.getElementById(`menos${item.id}`);
    //const mas = document.getElementById(`mas${item.id}`);

    //menos.addEventListener("click", cambiarUnidades("menos", `${item.id}`));
    //mas.addEventListener("click", cambiarUnidades("mas", `${item.id}`));
  });
}
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
      ...item,
      unidades,
    };
  });

  actualizarCarrito();
}
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
