//Funcion que obtiene la fecha y hora en el momento que se realiza la compra
function obtenerDate() {
  const URLGET =
    "https://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires";
  fetch(URLGET)
    .then((resultado) => resultado.json())
    .then((data) => {
      let cadenaFecha = data.datetime.split("T");
      let separaFecha = cadenaFecha[0];
      let separaHora = cadenaFecha[1].split(".");
      let horaFinal = separaHora[0].slice(0, 5);
      document.querySelector(
        "#separaFecha"
      ).innerHTML = `Fecha de compra: ${separaFecha}`;
      document.querySelector(
        "#horaFinal"
      ).innerHTML = `Hora de compra: ${horaFinal}`;
    });
}
//Funcion que avisa al usuario que el carrito esta vacio y no puede continuar con el proceso de compra.
function avisarCarritoVacio() {
  const comprar = document.getElementById("comprar");
  comprar.onclick = async () => {
    if (carrito.length === 0) {
      await Swal.fire({
        title: `¡No tienes productos en el carrito!`,
        icon: `warning`,
        position: `top`,
        width: `20%`,
        color: `#d7cdb3`,
        background: `#222`,
      });
    }
  };
}
avisarCarritoVacio();

//DOM formulario e inputs
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

//Regexp para los inputs del formulario
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  dni: /^\d{8}$/, // 8 numeros.
  direccion: /^[a-zA-Z0-9\s.+-]{5,40}$/, // Letras y espacios, pueden llevar acentos.
  ciudad: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
  provincia: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
};

//Se setea todos los campos como falsos al inicio del formulario
const campos = {
  nombre: false,
  apellido: false,
  correo: false,
  dni: false,
  direccion: false,
  ciudad: false,
  provincia: false,
};

//En esta funcion usamos un switch segun el target en el que se posicione el usuario, para llamar a la funcion validarCampo
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;
    case "apellido":
      validarCampo(expresiones.apellido, e.target, "apellido");
      break;
    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;
    case "dni":
      validarCampo(expresiones.dni, e.target, "dni");
      break;
    case "direccion":
      validarCampo(expresiones.direccion, e.target, "direccion");
      break;
    case "ciudad":
      validarCampo(expresiones.ciudad, e.target, "ciudad");
      break;
    case "provincia":
      validarCampo(expresiones.provincia, e.target, "provincia");
      break;
  }
};
//Aca se modifica el DOM del formulario cuando los inputs cumplen o no con las restricciones
const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    //Aca cambiamos el DOM cuando los inputs cumplen con las restricciones
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true; // Cambiamos los valores de los campos a true para que cumpla con la condicion del evento submit del formulario
  } else {
    //Aca cambiamos el DOM cuando los inputs NO cumplen con las restricciones
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false; // Cambiamos los valores de los campos a false para que NO cumpla con la condicion del evento submit del formulario
  }
};

//Aca para cada input del formulario se llama a la funcion validarFormulario cuando se oprime una tecla y cuando deja de ser el foco.
inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

// Evento submit del formulario
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const terminos = document.getElementById("terminos");

  //Aca tomamos los valores booleanos de campos
  if (
    campos.nombre &&
    campos.apellido &&
    campos.correo &&
    campos.dni &&
    campos.direccion &&
    campos.ciudad &&
    campos.provincia &&
    terminos.checked
  ) {
    const data = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      correo: document.getElementById("correo").value,
      direccion: document.getElementById("direccion").value,
      dni: document.getElementById("dni").value,
      ciudad: document.getElementById("ciudad").value,
      provincia: document.getElementById("provincia").value,
    };

    class Usuario {
      constructor(nombre, apellido, correo, direccion, dni, ciudad, provincia) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.direccion = direccion;
        this.dni = dni;
        this.ciudad = ciudad;
        this.provincia = provincia;
      }
    }
    listaUsuarios.push(
      new Usuario(
        data.nombre,
        data.apellido,
        data.correo,
        data.direccion,
        data.dni,
        data.ciudad,
        data.provincia
      )
    );
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));

    formulario.reset(); // Le hacemos reset a los inputs del formulario

    document //Aca quitamos el mensaje de "LLene todas la areas correctamente" del formulario
      .getElementById("formulario__mensaje")
      .classList.remove("formulario__mensaje-activo");

    //Aca añadimos el mensaje de "el proceso fue exitoso" del formulario
    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");

    setTimeout(() => {
      //Aca el mensaje durara 3segundos y se removera
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 3000);

    //Removemos el icono de "correcto" de cada input
    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((icono) => {
        icono.classList.remove("formulario__grupo-correcto");
      });

    setTimeout(() => {
      obtenerDate(); //Llamamos a esta funcion para obtener la fecha y hora de la compra

      Swal.fire({
        // Sweetalert que muestra el "ticket" de compra
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        title: `¡Gracias por tu compra!`,
        html: `
                <div>
                  <ul class="d-flex flex-row justify-content-evenly">
                    <li id="separaFecha"></li>
                    <li id="horaFinal"></li>
                  </ul>
                </div>
                <p>Cliente: ${data.nombre} ${data.apellido}</br></br>
                DNI: ${data.dni}</br></br>
                Direccion: ${data.direccion}</br></br>
                Ciudad: ${data.ciudad}</br></br>
                Provincia: ${data.provincia}</br></br>
                Total: $${precioTotal}</br></br>
               <p>Estaremos contactando contigo a traves del correo: ${data.correo}</p>
                `,
        icon: "success",
        position: `top`,
        width: `40%`,
        confirmButtonText: "Listo!",
      }).then((result) => {
        if (result.value) {
          // Cuando el usuario oprima el boton "Listo!" te llevara a la pagina de compras nuevamente
          window.location.href = "../partes/shop.html";
        }
      });
      carrito.length = 0; //Se vacia el carrito
      if (carrito.length === 0) {
        localStorage.removeItem("carrito");
      }
      actualizarCarrito();
    }, 3000);
  } else {
    //En caso de no cumplir con la condcion, el formulario mandara este mensaje
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
  }
});
