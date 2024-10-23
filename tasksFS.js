const fs = require("fs").promises;

class TaskManager {
  constructor(path) {
    this.tasks = [];
    this.categories = [];
    this.path = path;
  }
  async addTask(newTask) {
    try {
      const tasksJSON = await fs.readFile(this.path, "utf-8");
      let tasksParsed = JSON.parse(tasksJSON || "[]");
      this.tasks = tasksParsed;
      this.tasks.push(newTask);
      await fs.writeFile(
        this.path,
        JSON.stringify(this.tasks, null, 4),
        "utf-8"
      );
      return "Tarea agregada";
    } catch (error) {
      console.error(error);
    }
  }
  async getTasks() {
    let readTasks = await fs.readFile("./tasksData.json", "utf-8");
    this.tasks = JSON.parse(readTasks);
    console.log("Tareas pendientes: ");
    this.tasks.forEach(function (task) {
      if (!task.completed) {
        console.log(
          "- Nombre: " +
            task.name +
            " - Categoría: " +
            task.category +
            " - Fecha límite: " +
            task.deadLine
        );
      }
    });
  }
  async deleteTask() {
    let readTasks = await fs.readFile("./ taskData.json", "utf-8");
    this.tasks = JSON.parse(readTasks);
    console.log("Tareas: ");
    this.tasks(function deleteTask(index) {
      if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        console.log("Tarea eliminada.");
      } else {
        console.log("Índice de tarea incorrecto.");
      }
    });
    return this.tasks;
  }
}

module.exports = TaskManager;
