using System.Reflection;
using System.Text;
using CookBook.API.Data;
using CookBook.API.Features.Authentication;
using CookBook.API.Features.Authentication.Interfaces;
using CookBook.API.Features.Ingredients;
using CookBook.API.Features.Recipes;
using CookBook.API.Services;
using FluentValidation;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSqlite<CookBookContext>(builder.Configuration.GetConnectionString("SQLITE"));
builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
builder.Services.AddAuthentication().AddJwtBearer(opt => opt.TokenValidationParameters = new()
{
    ValidAudience = "CookBook",
    ValidIssuer = "CookBook",
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecretKeyNeverUseLikeThis"))
});
builder.Services.AddAuthorization();
builder.Services.AddCors(opt => opt.AddDefaultPolicy(x => x.AllowAnyOrigin()));
builder.Services.AddSingleton<IJwtGenerator, JwtGenerator>();
builder.Services.AddSingleton<IPasswordManager, PasswordManager>();

var app = builder.Build();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapAuthentication();
app.MapIngredients();
app.MapRecipes();

app.Run();
