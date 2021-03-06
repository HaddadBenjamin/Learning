﻿using Learning.AggregateRoot.Domain.Audit.Aggregates;
using Learning.AggregateRoot.Infrastructure.DbContext.Mappers;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Learning.AggregateRoot.Infrastructure.Audit.DbContext.Mappers
{
    public class AuditDatabaseChangeMapper : AggregateMap<AuditDatabaseChange>
    {
        protected override void Map(EntityTypeBuilder<AuditDatabaseChange> entity)
        {
            entity.HasKey(auditDatabaseChange => auditDatabaseChange.Id);

            entity.Property(auditDatabaseChange => auditDatabaseChange.WriteAction).IsRequired();
            entity.Property(auditDatabaseChange => auditDatabaseChange.TableName).HasMaxLength(50);
            entity.Property(auditDatabaseChange => auditDatabaseChange.WriteAction).HasMaxLength(20);

            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Id);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.EntityId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.TableName);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.WriteAction);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Changes);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.CorrelationId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.Date);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.UserId);
            entity.HasIndex(auditDatabaseChange => auditDatabaseChange.ImpersonatedUserId);
        }
    }
}