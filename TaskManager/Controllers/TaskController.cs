using Microsoft.AspNetCore.Mvc;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    public class TaskController : Controller
    {
        // Public static list to store tasks
        public static List<TaskItem> tasks = new List<TaskItem>();

        // Method to display the task view
        public IActionResult Index()
        {
            return View("Task", tasks);
        }

        // Method to create a new task
        [HttpPost]
        public IActionResult Create(TaskItem newTask)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
            }

            newTask.Id = tasks.Count + 1;
            tasks.Add(newTask);
            return Json(new { success = true, id = newTask.Id });
        }

        // Method to return a specific task based on ID
        [HttpGet]
        public IActionResult GetTaskById(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }
            return Json(task);
        }

        // Method to generate a new ID when opening the creation modal
        [HttpGet]
        public IActionResult GetNewTaskId()
        {
            int newId = tasks.Any() ? tasks.Max(t => t.Id) + 1 : 1;
            return Json(newId);
        }

        // Method to view details based ID
        [HttpGet]
        public IActionResult Details(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            return View(task);
        }

        // Method to edit an existing task
        [HttpPost]
        public IActionResult EditTask(TaskItem editedTask)
        {
            if (!ModelState.IsValid)
            {
                return Json(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage) });
            }

            var task = tasks.FirstOrDefault(t => t.Id == editedTask.Id);
            if (task == null)
            {
                return NotFound();
            }

            task.Title = editedTask.Title;
            task.Description = editedTask.Description;
            task.Status = editedTask.Status;
            task.DueDate = editedTask.DueDate;

            return Json(new { success = true });
        }

        // Method to delete a task
        [HttpPost]
        public IActionResult Delete(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return Json(new { success = false, message = "Nenhuma tarefa cadastrada." });
            }

            tasks.Remove(task);
            return Json(new { success = true });
        }
    }
}
