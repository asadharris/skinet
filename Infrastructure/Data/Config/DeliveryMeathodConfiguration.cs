using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class DeliveryMeathodConfiguration : IEntityTypeConfiguration<DeliveryMeathod>
    {
        public void Configure(EntityTypeBuilder<DeliveryMeathod> builder)
        {
            builder.Property(d => d.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}