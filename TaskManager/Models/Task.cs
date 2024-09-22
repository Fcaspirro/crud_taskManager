using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    public class TaskItem
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O título é obrigatório.")]
        [MinLength(3, ErrorMessage = "O título deve ter pelo menos 3 caracteres.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [MinLength(5, ErrorMessage = "A descrição deve ter pelo menos 5 caracteres.")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "O status é obrigatório.")]
        public string Status { get; set; } = string.Empty;

        [Required(ErrorMessage = "A data de conclusão é obrigatória.")]
        public DateTime? DueDate { get; set; }
    }
}
