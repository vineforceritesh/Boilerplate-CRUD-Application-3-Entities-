using Abp.Zero.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UserCrud.Authorization.Roles;
using UserCrud.Authorization.Users;
using UserCrud.Cities;
using UserCrud.Collages;
using UserCrud.Countries;
using UserCrud.MultiTenancy;
using UserCrud.States;
using UserCrud.Students;

namespace UserCrud.EntityFrameworkCore;

public class UserCrudDbContext : AbpZeroDbContext<Tenant, Role, User, UserCrudDbContext>
{

    public UserCrudDbContext(DbContextOptions<UserCrudDbContext> options)
        : base(options)
    {
    }
    public DbSet<Student> Students { get; set; }

    public DbSet<Collage> Collages { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<State> States { get; set; }
    public DbSet<City> Cities { get; set; }

    }

