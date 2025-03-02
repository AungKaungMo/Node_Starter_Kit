# Node.js Starter Kit

A powerful and flexible Node.js starter kit that includes authentication, session management, file handling, and reusable components. Built with **Express, Prisma, MySQL, Typescript and Zod validation**, this starter kit simplifies development by automating error handling and providing a structured architecture.

## Features

✅ **User Authentication** – Login, Register, Logout  
✅ **Session Management** – Token-based authentication with refresh tokens  
✅ **Session Logout** – Handle session-based logout  
✅ **User Management** – Get user list  
✅ **File Upload & Delete** – Manage file storage  
✅ **Auto Try-Catch Handling** – No need to manually wrap functions in try-catch  
✅ **Reusable Error Component** – Centralized error handling  
✅ **Password Hashing with Bcrypt**  
✅ **Zod Validations** – Strong data validation  
✅ **Custom Middleware** – Authentication, error handling, and more  
✅ **Docker Support** – Easily deploy with Docker  

## Tech Stack
- **Node.js & Express** – Backend framework
- **Typescript - Type safety
- **Prisma** – Database ORM
- **MySQL** – Relational database
- **Zod** – Schema validation
- **Bcrypt** – Secure password hashing
- **JWT & Sessions** – Authentication system
- **Multer** – File upload handling
- **Docker** – Containerization

## Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/AungKaungMo/Node_Starter_Kit.git
   cd nodejs-starter-kit
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables** (create a `.env` file and configure your database, JWT secrets, etc.)

   #### Sample `.env` File:
   ```env
      NODE_ENV=local
      DEBUG=true
      PORT=3000
      APP_ORIGIN=http://localhost:5143
      JWT_REFRESH_SECRET=jfoaifh4h3$@90fjeoia
      JWT_SECRET=121jofaho4@!h98*&ji

      MYSQL_PORT=3306
      MYSQL_DATABASE=check_in_out
      MYSQL_USER=root
      MYSQL_PASSWORD=password
      DATABASE_URL="mysql://root:password@mysql_db:3306/check_in_out"
   ```

4. **Run the development server**
   ```sh
   npm run dev
   ```

5. **Run with Docker**
   ```sh
   docker-compose up --build
   ```

   Other useful Docker commands:
   ```sh
   docker-compose down         # Stop and remove containers
   docker-compose restart      # Restart containers
   docker ps                   # List running containers
   docker logs -f <container>  # View logs in real-time
   ```

## Folder Structure
```
📜 docker-compose.yml  # Configuration of container
📜 Dockerfile          # Installing necessary items
📂 node_modules
📂 uploads             # For storaging image
📂 src
 ┣ 📂 assets       # Project's image
 ┣ 📂 config       # Business logic handlers
 ┣ 📂 constants    # Project's image
 ┣ 📂 helpers      # Business logic handlers
 ┣ 📂 logs         # Project's image
 ┣ 📂 controllers  # Business logic handlers
 ┣ 📂 middlewares  # Custom middleware functions
 ┣ 📂 models       # Prisma models
 ┣ 📂 prisma       # Database schema
 ┣ 📂 schema       # Zod validation schema
 ┣ 📂 types        # Typescript's type
 ┣ 📂 routes       # API routes
 ┣ 📂 services     # Business logic services
 ┣ 📂 utils        # Helper functions
 ┣ 📜 app.js       # Main Express application
 ┣ 📜 server.js    # Server entry point
```

## Contributing
Feel free to contribute to this project! Fork the repo, make your changes, and submit a PR.

## License
This project is open-source and available under the [MIT License](LICENSE).

---
✨ **Built with love using Node.js, Prisma, and MySQL** ✨


