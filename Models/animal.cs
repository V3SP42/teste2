using System.Text.Json.Serialization;
using ZooAPI.Models;

namespace ZooAPI.Models
{
    public class Animal
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }
        public string Especie { get; set; } = string.Empty;
        public string Habitat { get; set; } = string.Empty;
        public string PaisOrigem { get; set; } = string.Empty;

        [JsonIgnore]
        public List<Cuidado>? Cuidados { get; set; }
    }
}