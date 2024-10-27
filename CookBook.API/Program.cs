using System.Reflection;
using CookBook.API.Data;
using CookBook.API.Features.Authentication;
using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSqlite<CookBookContext>(builder.Configuration.GetConnectionString("SQLITE"));
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

var app = builder.Build();

app.MapAuthentication();

app.Run();
