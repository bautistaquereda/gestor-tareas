const fs = require("fs").promises;
const prompt = require("prompt-sync")({ sigint: true });
const CategoriesManager = require("./categories-manager-fs.js")

const categoriesManager = new CategoriesManager("./src/data/categories-data.json")

class TaskManager {
  constructor(path) {
    this.tasks = [];
    this.categories = [];
    this.path = path;
  }
  async addTask(receivedName) {
    try {
      const tasksJSON = await fs.readFile(this.path, "utf-8");
      let tasksParsed = JSON.parse(tasksJSON || "[]");
      this.tasks = tasksParsed;
      this.categories = await categories.getCategories()
      if (this.categories.length > 0) {
        let categoryIndex = parseInt(
          prompt(
            "Ingrese el índice de la categoría para la nueva tarea (dejar en blanco en caso de no tener categoría): "
          )
        );
        if ((categoryIndex >= 0 && categoryIndex < this.categories.length) || categoryIndex == undefined || categoryIndex == null) {
          let receivedDeadLine = prompt(
            "Ingrese la fecha límite (dejar en blanco en caso de no tener): "
          );
          let inputTask = {
            name: receivedName,
            completed: false,
            deadLine: receivedDeadLine || null,
            category:
              categoryIndex !== undefined && categoryIndex !== null
                ? categoryIndex
                : "Otros",
          };
          this.tasks.push(inputTask);
          await fs.writeFile(
            this.path,
            JSON.stringify(this.tasks, null, 4),
            "utf-8"
          );
        } else {
          console.log("Índice de categoría incorrecto.");
        }
      } else {
        let receivedDeadLine = prompt(
          "Ingrese la fecha límite (dejar en blanco en caso de no tener): "
        );
        let inputTask = {
          name: receivedName,
          completed: false,
          deadLine: receivedDeadLine || null,
          category: "Otros",
        };
        this.tasks.push(inputTask);
        await fs.writeFile(
          this.path,
          JSON.stringify(this.tasks, null, 4),
          "utf-8"
        );
      }
      console.log("Tarea agregada con exito.");
      return "Tarea agregada";
    } catch (error) {
      console.error(error);
    }
  }
  async getPendingTasks() {
    let readTasks = await fs.readFile(this.path, "utf-8");
    if (readTasks) {
      this.tasks = JSON.parse(readTasks);
      if (this.tasks.length > 0) {
        console.log("Tareas pendientes: ");
        this.tasks.forEach(function (task, index) {
          if (!task.completed) {
            console.log(
              "- Índice: " +
              index +
              " - Nombre: " +
              task.name +
              " - Categoría: " +
              task.category +
              " - Fecha límite: " +
              task.deadLine
            );
          }
        });
      }
    } else {
      console.log("No hay tareas");
    }
  }
  async getTasks() {
    let readTasks = await fs.readFile(this.path, "utf-8");
    if (readTasks) {
      this.tasks = JSON.parse(readTasks);
      if (this.tasks.length > 0) {
        this.tasks.forEach(function (task, index) {
          if (task) {
            console.log(
              "- Índice: " +
              index +
              " - Nombre: " +
              task.name +
              " - Categoría: " +
              task.category +
              " - Fecha límite: " +
              task.deadLine +
              " - Completada: " +
              (task.completed ? "Si" : "No")
            );
          }
        });
      }
    } else {
      console.log("No hay tareas");
    }
    return this.tasks;
  }
  async deleteTask(index) {
    try {
      let readTasks = await fs.readFile(this.path, "utf-8");
      if (readTasks) {
        this.tasks = JSON.parse(readTasks);
        if (index >= 0 && index < this.tasks.length) {
          this.tasks.splice(index, 1);
          console.log("Tarea eliminada.");
        } else {
          console.log("Índice de tarea incorrecto.");
        }
        fs.writeFile(this.path, JSON.stringify(this.tasks, null, 4), "utf-8");
        return this.tasks;
      } else {
        console.error("No hay tareas creadas.");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  async toggleTask(index, complete) {
    let readTasks = await fs.readFile(this.path, "utf-8");
    if (readTasks) {

      this.tasks = JSON.parse(readTasks);
      if (complete.toLowerCase() == "true" || complete.toLowerCase() == "false") {
        this.tasks[index].completed = complete.toLowerCase() === "true" ? true : false

        await fs.writeFile(this.path, JSON.stringify(this.tasks, null, 4), "utf-8");
        console.log(complete.toLowerCase() ? "Tarea actualizada: completada." : "Tarea actualizada: pendiente.");
      } else {
        console.log("Error en la sintaxis.");
      }
      return
    } else {
      console.error("No hay tareas creadas.");
    }
  }
  async updateTask(index, newName, newDeadLine = null, newCategoryIndex) {
    let readTasks = await fs.readFile(this.path, "utf-8");

    if (readTasks) {
      this.tasks = JSON.parse(readTasks);
      if (index >= 0 && index < this.tasks.length) {
        categoriesManager.getCategories()
        const task = {
          "name": newName ? newName : this.tasks[index].name,
          "deadLine": newDeadLine ? newDeadLine : this.tasks[index].deadLine,
          "category": newCategoryIndex ?? this.tasks[index].category,
          "completed": this.tasks[index].completed
        }
        this.tasks[index] = task

        await fs.writeFile(this.path, JSON.stringify(this.tasks, null, 4), "utf-8");
        console.log("Modificación correcta.");
      } else {
        console.log("Índice de tarea incorrecto.");
      }
    } else {
      console.error("No hay tareas creadas.")
    }
  }
}
module.exports = TaskManager;
