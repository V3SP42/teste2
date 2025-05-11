using Microsoft.EntityFrameworkCore;
using ZooAPI.Models;

namespace ZooAPI.Data
{
    public class ZooContext : DbContext
    {
        public ZooContext(DbContextOptions<ZooContext> options) : base(options) { }

        public DbSet<Animal> Animais { get; set; }
        public DbSet<Cuidado> Cuidados { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cuidado>()
                .HasOne(c => c.Animal)
                .WithMany(a => a.Cuidados)
                .HasForeignKey(c => c.AnimalId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}