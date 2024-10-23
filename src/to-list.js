const prompt = require("prompt-sync")({ sigint: true });
const CategoriesManager = require("./controllers/categories-manager-fs.js");
const TaskManager = require("./controllers/tasks-manager-fs.js");

const tasksManager = new TaskManager("./data/tasks-data.json");
const categoriesManager = new CategoriesManager("./data/categories-data.json");

// array tasks and categories

let tasks = [];
let categories = [];

// get categories

async function getCategories() {
  const categories = await categoriesManager.getCategories();
  return categories;
}

// add categories

async function addCategories(categoryName) {
  const categoriesAdded = await categoriesManager.addCategory(categoryName);
  console.log("Categoría " + categoryName + " agregada con exito.");
  return categoriesAdded;
}

// add tasks

async function addTask(receivedName) {
  const addedTask = await tasksManager.addTask(receivedName);
  return addedTask;
}

// delete tasks

async function deleteTask(index) {
  const taskDeleted = await tasksManager.deleteTask(index);
  return taskDeleted;
}

// complete tasks

async function completedTask(index) {
  const taskCompleted = await tasksManager.completeTask(index);
  return taskCompleted;
}

// edit tasks

async function updateTask(index, newName, newDeadLine = null, newCategoryIndex) {
  const taskUpdate = await tasksManager.updateTask(index, newName, newDeadLine, newCategoryIndex);
  return;
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

async function getPendingTasks() {
  const tasks = await tasksManager.getPendingTasks();
  return "Tareas pendientes: " + "/n", tasks;
}
async function getTasks() {
  const tasks = await tasksManager.getTasks();
  return tasks

}

// get menu

function getMenu() {
  console.log("--- MENÚ ---");
  console.log("1 - Agregar tarea.");
  console.log("2 - Eliminar tarea.");
  console.log("3 - Modificar tarea.");
  console.log("4 - Mostrar categorías.");
  console.log("5 - Agregar categoría.");
  console.log("6 - Filtrar tareas por categoría.");
  console.log("7 - Visualizar cantidad de tareas completadas por categoría.");
  console.log("8 - Visualizar tareas pendientes.");
  console.log("9 - Mostrar tareas.");
  console.log("0 - Salir.");
}

// user interface

async function userInterface() {
  let option = -1;

  while (true) {
    getMenu();
    option = parseInt(prompt("Ingrese la opción seleccionada: "));
    if (option == 0) {
      console.log("Adiós.");
      break;
    }
    if (option < 0 || option > 9) {
      console.log("Opción incorrecta.");
      continue;
    }
    switch (option) {
      case 1:
        await getPendingTasks()
        let newTasksName = prompt("Ingrese el nombre de la tarea nueva: ");
        await addTask(newTasksName);
        break;

      case 2:
        await getTasks()
        let deleteIndex = parseInt(prompt("Ingrese el índice de la tarea a eliminar: "));
        await deleteTask(deleteIndex);
        break;

      case 3:
        await getTasks()
        let indexTask = parseInt(prompt("Ingrese el índice a modificar: "));

        let option = parseInt(
          prompt([
            console.log("¿Qué propiedad desea modificar?"),
            console.log("1 - Nombre."),
            console.log("2 - Fecha límite."),
            console.log("3 - Categoría."),
            console.log("4 - Actualizar estado."),
          ])
        );

        switch (option) {
          case 1:
            let newName = prompt("Ingrese el nuevo nombre de su tarea: ");
            await updateTask(indexTask, newName, null, null, null);
            break;
          case 2:
            let newDeadLine = prompt(
              "Ingrese la nueva fecha límite para su tarea: "
            );
            await updateTask(indexTask, null, newDeadLine, null, null);
            break;
          case 3:
            await getCategories()
            let newCategoryIndex = parseInt(
              prompt("Ingrese el nuevo índice de categoría: ")
            );
            await updateTask(indexTask, null, null, newCategoryIndex, null);
            break;
          case 4:
            await getTasks()
            let complete = prompt("Ingresar true en caso de que esté completada o false en caso de que esté pendiente: ")
            const completedTask = await tasksManager.toggleTask(indexTask, complete);
            console.log("Tarea modificada con éxito.");

          default:
            break;
        }

        break;

      case 4:
        await getCategories();
        break;

      case 5:
        let newCategory = prompt("Ingrese el nombre de la nueva categoría: ");
        await addCategories(newCategory);

        break;

      case 6:
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

      case 7:
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

      case 8:

        await getPendingTasks();
        break;

      case 9:
        console.log("--- LISTA DE TAREAS ---");
        await getTasks();
        break;

      default:
        console.log("Opción inválida.");
        return;
    }
  }
}

userInterface();
