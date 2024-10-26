using CookBook.API.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSqlServer<CookBookContext>(builder.Configuration.GetConnectionString("SQL"));

var app = builder.Build();

app.MapControllers();
app.MapGet("/", () => "Hello World!");

app.Run();
