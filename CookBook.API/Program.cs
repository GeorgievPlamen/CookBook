using CookBook.API.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSqlite<CookBookContext>(builder.Configuration.GetConnectionString("SQLITE"));

var app = builder.Build();

app.MapControllers();
app.MapGet("/", () => "Hello World!");

app.Run();
