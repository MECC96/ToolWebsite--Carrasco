const productos = [];

class Ropa {
  constructor(nombre, precio, imagen, id, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.id = id;
    this.stock = stock;
  }
}

productos.push(
  new Ropa("Black T-Shirt", 29.99, "../images/black-t-shirt.jpg", 1, 25)
);
productos.push(
  new Ropa("Black Sweater", 39.99, "../images/black-sweater.jpg", 2, 10)
);
productos.push(
  new Ropa("White T-Shirt", 34.99, "../images/white-t-shirt.jpg", 3, 20)
);
productos.push(
  new Ropa("Gray Sweater", 44.99, "../images/gray-sweater.jpg", 4, 30)
);
productos.push(
  new Ropa("Gray T-Shirt", 24.99, "../images/gray-t-shirt.jpg", 5, 15)
);
