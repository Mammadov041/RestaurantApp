# 🍽️ Restaurant App

This project is a full-stack restaurant application with:

- **Backend**: ASP.NET 8.0 Web API using Entity Framework Core and SQL Server
- **Frontend**: React.js (with Webpack and Material UI)

---

## 📌 Features

### Backend API (ASP.NET 8.0 + EF Core + SQL Server)
- Built with ASP.NET 8.0 and Entity Framework Core
- SQL Server as the database provider
- Object mapping (using AutoMapper or similar tools)
- RESTful endpoints
- Supports:
  - Selecting user payment methods
  - Creating, updating, and deleting orders
  - User and order management

### Frontend (React.js + Webpack + Material UI)
- React.js with Webpack for modular build
- Material UI for sleek UI components
- Integration with backend API to:
  - Select and store user payment methods
  - View menu items and place orders
  - Modify or cancel existing orders

---

## 🛠️ Technologies

### Backend
- ASP.NET 8.0
- Entity Framework Core
- SQL Server
- AutoMapper (or similar)
- Swagger (for API testing and docs)
- CORS enabled for frontend access

### Frontend
- React.js (with Hooks)
- Webpack 5
- Material UI
- Axios (for API communication)
- React Router

---

## 🔧 Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server)
- [Node.js + npm](https://nodejs.org/)
- [Docker (Optional)](https://www.docker.com/) for containerization

---

### 🔙 Backend Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/restaurant-api.git
   cd restaurant-api
   
2.**Update DB connection string in appsettings.json**
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=RestaurantDb;Trusted_Connection=True;"
}

3.**Apply migrations & run**
dotnet ef database update
dotnet run

4.**API will be available at**
https://localhost:7091

![frontendSide](https://github.com/user-attachments/assets/5d9ec84d-d3bd-4456-ac5a-c12862279d9a)
![backendSide](https://github.com/user-attachments/assets/0262a0b3-9c1b-426a-b5dd-c58a0b30292e)
