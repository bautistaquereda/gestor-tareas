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
    return this.tasks;
  }
}

module.exports = TaskManager;
