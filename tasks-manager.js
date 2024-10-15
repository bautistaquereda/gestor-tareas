const prompt = require("prompt-sync")({ sigint: true });

// array tasks and categories

let tasks = [];
let categories = [];

// get categories

function getCategories() {
  if (categories.length > 0) {
    console.log("Categorías existentes: ");
    categories.forEach(function (category, index) {
      console.log(index + ": " + category);
    });
  }
}

// add categories

function addCategories(categoryName) {
  categories.push(categoryName);
  console.log("Categoría " + categoryName + " agregada con exito.");
}

// add tasks

function addTask(receivedName) {
  getCategories();
  if (categories.length > 0) {
    let categoryIndex = parseInt(
      prompt(
        "Ingrese el índice de la categoría para la nueva tarea (dejar en blanco en caso de no tener categoría): "
      )
    );
    let receivedDeadLine = prompt(
      "Ingrese la fecha límite (dejar en blanco en caso de no tener): "
    );
    if (
      (categoryIndex >= 0 && categoryIndex < categories.length) ||
      categoryIndex == undefined ||
      categoryIndex == null
    ) {
      tasks.push({
        name: receivedName,
        completed: false,
        deadLine: receivedDeadLine || null,
        category:
          categoryIndex !== undefined && categoryIndex !== null
            ? categoryIndex
            : "Otros",
      });
    } else {
      console.log("Índice de categoría incorrecto.");
    }
  } else {
    let receivedDeadLine = prompt(
      "Ingrese la fecha límite (dejar en blanco en caso de no tener): "
    );
    tasks.push({
      name: receivedName,
      completed: false,
      deadLine: receivedDeadLine || null,
      category: "Otros",
    });
  }
  console.log("Tarea agregada con exito.");
}

// delete tasks

function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    console.log("Tarea eliminada.");
  } else {
    console.log("Índice de tarea incorrecto.");
  }
}

// complete tasks

function completedTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    console.log("Tarea completada.");
  } else {
    console.log("Índice de tarea incorrecto.");
  }
}

// edit tasks

function editTask(index, newName, newDeadLine = null, newCategoryIndex) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].name = newName !== undefined ? newName : tasks[index].name;
    tasks[index].deadLine =
      newDeadLine !== undefined ? newDeadLine : tasks[index].deadLine;
    tasks[index].category =
      newCategoryIndex !== undefined ? newCategoryIndex : tasks[index].category;
    console.log("Modificación correcta.");
  } else {
    console.log("Índice de tarea incorrecto.");
  }
}

// filter tasks by categories

function filterTasksByCategory(categoryIndex) {
  let filteredTasks = tasks.filter(function (task) {
    return task.category === categoryIndex;
  });
  return filteredTasks;
}

// completed tasks by categories

function countCompletedTasksByCategory(categoryIndex) {
  let categoryTasks = filterTasksByCategory(categoryIndex);
  let completedTasks = categoryTasks.reduce(function (count, task) {
    return task.completed ? count + 1 : count;
  }, 0);

  let totalTasks = categoryTasks.length;

  console.log(
    "Tareas completadas de la categoría " +
      categoryIndex +
      ": " +
      completedTasks +
      " de " +
      totalTasks +
      " tareas."
  );
}

// get pending tasks

function getPendingTasks() {
  console.log("Tareas pendientes: ");
  tasks.forEach(function (task) {
    if (!task.completed) {
      console.log(
        "- Nombre: " + task.name + " - Categoría: " + categories[task.category]
      );
    }
  });
}

// get menu

function getMenu() {
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

// user interface

function userInterface() {
  let option = -1;

  while (true) {
    getMenu();
    option = parseInt(prompt("Ingrese la opción seleccionada: "));
    if (option == 0) {
      console.log("Adiós.");
      break;
    }
    if (option < 0 || option > 10) {
      console.log("Opción incorrecta.");
      continue;
    }
    switch (option) {
      case 1:
        let newTasksName = prompt("Ingrese el nombre de la tarea nueva: ");
        addTask(newTasksName);
        break;

      case 2:
        if (tasks.length > 0) {
          let deleteIndex = parseInt(
            prompt("Ingrese el índice de la tarea a eliminar: ")
          );
          deleteTask(deleteIndex);
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      case 3:
        if (tasks.length > 0) {
          let completeIndex = parseInt(
            prompt("Ingrese el índice de la tarea completada: ")
          );
          completedTask(completeIndex);
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      case 4:
        if (tasks.length > 0) {
          let index = parseInt(prompt("Ingrese el índice a modificar: "));

          if (index >= 0 && index < tasks.length) {
            let option = parseInt(
              prompt([
                console.log("¿Qué propiedad desea modificar?"),
                console.log("1 - Nombre."),
                console.log("2 - Fecha límite."),
                console.log("3 - Categoría."),
              ])
            );

            switch (option) {
              case 1:
                let newName = prompt("Ingrese el nuevo nombre de su tarea: ");
                editTask(index, newName);
                break;
              case 2:
                let newDeadLine = prompt(
                  "Ingrese la nueva fecha límite para su tarea: "
                );
                editTask(index, undefined, newDeadLine);
                break;
              case 3:
                let newCategoryIndex = parseInt(
                  prompt("Ingrese el nuevo índice de categoría: ")
                );
                if (
                  newCategoryIndex >= 0 &&
                  newCategoryIndex < categories.length
                ) {
                  editTask(index, undefined, undefined, newCategoryIndex);
                }
                break;
              default:
                break;
            }
          } else {
            console.log("Índice incorrecto.");
          }

          editTask(index, editName, editDeadLine);
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      case 5:
        if (categories.length > 0) {
          getCategories();
          break;
        } else {
          console.log("No hay categorías creadas.");
        }

      case 6:
        let newCategory = prompt("Ingrese el nombre de la nueva categoría: ");
        addCategories(newCategory);

        break;

      case 7:
        if (tasks.length > 0 && categories.length > 0) {
          getCategories();
          let categoryIndex = parseInt(
            prompt("Ingrese el índice de la categoría a filtrar: ")
          );
          let tasksCategory = filterTasksByCategory(categoryIndex);

          console.log("Tarea de la categoría seleccionada: ");
          console.log(tasksCategory);
        } else {
          console.log("No hay tarea o categorías creadas.");
        }
        break;

      case 8:
        if (categories.length > 0) {
          getCategories();
          let categIndex = parseInt(
            prompt("Ingrese el índice de la categoría a visualizar: ")
          );
          if (categIndex < categories.length) {
            countCompletedTasksByCategory(categIndex);
          } else {
            console.log("Índice de categoría incorrecta.");
          }
        } else {
          console.log("No hay categorías creadas.");
        }
        break;

      case 9:
        if (tasks.length > 0) {
          getPendingTasks();
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      case 10:
        if (tasks.length > 0) {
          console.log("--- LISTA DE TAREAS ---");
          console.log(tasks);
        } else {
          console.log("No hay tareas creadas.");
        }
        break;

      default:
        console.log("Opción inválida.");
        return;
    }
  }
}

userInterface();
