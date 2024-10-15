const prompt = require("prompt-sync")({ sigint: true });

// array tareas y categorias

let tareas = [];
let categorias = [];

// mostrar categorias

function mostrarCategorias() {
  console.log("Categorías existentes: ");
  categorias.forEach(function (categoria, indice) {
    console.log(indice + ": " + categoria);
  });
}

// agregar categorias

function agregarCategorias(nombreCategoria) {
  categorias.push(nombreCategoria);
  console.log("Categoría " + nombreCategoria + " agregada con exito.");
}

// agregar tareas

function agregarTarea(nombreRecibido, fechaLimiteRecibida = null) {
  mostrarCategorias();

  let numeroCategoria = parseInt(
    prompt("Ingrese el índice de la categoría para la nueva tarea: ")
  );

  if (numeroCategoria >= 0 && numeroCategoria < categorias.length) {
    tareas.push({
      nombre: nombreRecibido,
      completada: false,
      fechaLimite: fechaLimiteRecibida,
      categoria: numeroCategoria,
    });
    console.log("Tarea agregada con exito.");
  } else {
    console.log("Índice de categoría incorrecto.");
  }
}

// eliminar tareas

function eliminarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas.splice(indice, 1);
    console.log("Tarea eliminada.");
  } else {
    console.log("Índice de tarea incorrecto.");
  }
}

// completar tareas

function tareaCompletada(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].completada = true;
    console.log("Tarea completada.");
  } else {
    console.log("Índice de tarea incorrecto.");
  }
}

// modificar tareas

function modificarTarea(
  indice,
  nuevoNombre,
  nuevaFechaLimite = null,
  nuevoIndiceCategoria
) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].nombre =
      nuevoNombre !== undefined ? nuevoNombre : tareas[indice].nombre;
    tareas[indice].fechaLimite =
      nuevaFechaLimite !== undefined
        ? nuevaFechaLimite
        : tareas[indice].fechaLimite;
    tareas[indice].categoria =
      nuevoIndiceCategoria !== undefined
        ? nuevoIndiceCategoria
        : tareas[indice].categoria;
    console.log("Modificación correcta.");
  } else {
    console.log("Índice de tarea incorrecto.");
  }
}

// filtrar tareas por categorías

function filtrarTareasPorCategoria(numeroCategoria) {
  let tareasFiltradas = tareas.filter(function (tarea) {
    return tarea.categoria === numeroCategoria;
  });
  return tareasFiltradas;
}

// cantidad de tareas completadas por categoria

function contarTareasCompletadasPorCategoria(numeroCategoria) {
  let tareasCategoria = filtrarTareasPorCategoria(numeroCategoria);
  let tareasCompletadas = tareasCategoria.reduce(function (contador, tarea) {
    return tarea.completada ? contador + 1 : contador;
  }, 0);

  let tareasEnTotal = tareasCategoria.length;

  console.log(
    "Tareas completadas de la categoría " +
      numeroCategoria +
      ": " +
      tareasCompletadas +
      " de " +
      tareasEnTotal +
      " tareas."
  );
}

// mostrar tareas pendientes

function mostrarTareasPendientes() {
  console.log("Tareas pendientes: ");
  tareas.forEach(function (tarea) {
    if (!tarea.completada) {
      console.log(
        "- Nombre: " +
          tarea.nombre +
          " - Categoría: " +
          categorias[tarea.categoria]
      );
    }
  });
}

// mostrar menú

function mostrarMenu() {
  console.log("--- MENÚ ---");
  console.log("1 - Agregar tarea.");
  console.log("2 - Eliminar tarea.");
  console.log("3 - Completar tarea.");
  console.log("4 - Modificar tarea.");
  console.log("5 - Mostrar categorías.");
  console.log("6 - Agregar categoría.");
  console.log("7 - Filtrar tareas por categoría.");
  console.log("8 - Visualizar cantidad de tareas completadas por categoría.");
  console.log("9 - Visualizar tareas pendientes.");
  console.log("10 - Mostrar tareas.");
  console.log("0 - Salir.");
}

// interaccion con el usuario

function interaccionUsuario() {
  let opcion = -1;

  while (opcion != 0) {
    mostrarMenu();
    opcion = parseInt(prompt("Ingrese la opción seleccionada: "));

    switch (opcion) {
      case 1:
        let nombreTareaNueva = prompt("Ingrese el nombre de la tarea nueva: ");
        agregarTarea(nombreTareaNueva);
        break;

      case 2:
        if (tareas.length > 0) {
          let indiceEliminar = parseInt(
            prompt("Ingrese el índice de la tarea a eliminar: ")
          );
          eliminarTarea(indiceEliminar);
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      case 3:
        if (tareas.length > 0) {
          let indiceCompletar = parseInt(
            prompt("Ingrese el índice de la tarea completada: ")
          );
          tareaCompletada(indiceCompletar);
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      case 4:
        if (tareas.length > 0) {
          let indice = parseInt(prompt("Ingrese el índice a modificar: "));

          if (indice >= 0 && indice < tareas.length) {
            let opcion = parseInt(
              prompt([
                console.log("¿Qué propiedad desea modificar?"),
                console.log("1 - Nombre."),
                console.log("2 - Fecha límite."),
                console.log("3 - Categoría."),
              ])
            );

            switch (opcion) {
              case 1:
                let nuevoNombre = prompt(
                  "Ingrese el nuevo nombre de su tarea: "
                );
                modificarTarea(indice, nuevoNombre);
                break;
              case 2:
                let nuevaFechaLimite = prompt(
                  "Ingrese la nueva fecha límite para su tarea: "
                );
                modificarTarea(indice, undefined, nuevaFechaLimite);
                break;
              case 3:
                let nuevoIndiceCategoria = parseInt(
                  prompt("Ingrese el nuevo índice de categoría: ")
                );
                if (
                  nuevoIndiceCategoria >= 0 &&
                  nuevoIndiceCategoria < categorias.length
                ) {
                  modificarTarea(
                    indice,
                    undefined,
                    undefined,
                    nuevoIndiceCategoria
                  );
                }
                break;
              default:
                break;
            }
          } else {
            console.log("Índice incorrecto.");
          }

          modificarTarea(indice, nombreModificar, fechaModificar);
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      case 5:
        if (categorias.length > 0) {
          mostrarCategorias();
          break;
        } else {
          console.log("No hay categorías creadas.");
        }

      case 6:
        let nuevaCategoria = prompt(
          "Ingrese el nombre de la nueva categoría: "
        );
        agregarCategorias(nuevaCategoria);

        break;

      case 7:
        if (tareas.lenght > 0 && categorias.length > 0) {
          mostrarCategorias();
          let numeroCategoria = parseInt(
            prompt("Ingrese el índice de la categoría a filtrar: ")
          );
          let tareasCategoria = filtrarTareasPorCategoria(numeroCategoria);

          console.log("Tareas de la categoria seleccionada: ");
          console.log(tareasCategoria);
        } else {
          console.log("No hay tareas o categorías creadas.");
        }
        break;

      case 8:
        if (categorias.length > 0) {
          mostrarCategorias();
          let numeroCateg = parseInt(
            prompt("Ingrese el índice de la categoría a visualizar: ")
          );
          if (numeroCateg < categorias.length) {
            contarTareasCompletadasPorCategoria(numeroCateg);
          } else {
            console.log("Índice de categoría incorrecta.");
          }
        } else {
          console.log("No hay categorías creadas.");
        }
        break;

      case 9:
        if (tarea.length > 0) {
          mostrarTareasPendientes();
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      case 10:
        if (tareas.length > 0) {
          console.log("--- LISTA DE TAREAS ---");
          console.log(tareas);
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      default:
        console.log("Opción inválida.");
        break;
    }
  }
}

interaccionUsuario();
