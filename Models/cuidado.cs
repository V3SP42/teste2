using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ZooAPI.Models

{
    public class Cuidado
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; } = string.Empty;

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public string Frequencia { get; set; } = string.Empty;

        public int AnimalId { get; set; }

        [JsonIgnore] 
        public Animal? Animal { get; set; }
    }
}