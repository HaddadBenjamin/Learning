﻿using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Infrastructure.Audit.DbContext.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Learning.AggregateRoot.Infrastructure.Audit.DbContext
{
    public class AuditDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbSet<AuditCommand> AuditCommands { get; set; }
        public DbSet<AuditQuery> AuditQueries { get; set; }
        public DbSet<AuditEvent> AuditEvents { get; set; }
        public DbSet<AuditDatabaseChange> AuditDatabaseChanges { get; set; }

        public AuditDbContext(DbContextOptions<AuditDbContext> options) : base(options) {}//=> Database.ExecuteSqlCommand("SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new AuditCommandMapper().Map(modelBuilder);
            new AuditQueryMapper().Map(modelBuilder);
            new AuditEventMapper().Map(modelBuilder);
            new AuditDatabaseChangeMapper().Map(modelBuilder);
        }
    }
}