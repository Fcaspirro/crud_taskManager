using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    public class HomeController : Controller
    {
        // Static list to access tasks from the TaskController
        private static List<TaskItem> tasks = TaskController.tasks;

        // Method to display the home page
        public IActionResult Index()
        {
            // Counting status tasks
            var pendingCount = tasks.Count(t => t.Status == "Pendente");
            var inProgressCount = tasks.Count(t => t.Status == "Em andamento");
            var completedCount = tasks.Count(t => t.Status == "Concluído");

            // Displaying the counts
            ViewData["PendingCount"] = pendingCount;
            ViewData["InProgressCount"] = inProgressCount;
            ViewData["CompletedCount"] = completedCount;

            return View();
        }

        // Method to display the error page
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
