# CNG-logistics-backend
The backend (Express and PostgreSQL) of the CNG SAS logistics project

## Environment Variables
There are three environment variables stored in `.env` (a file at the project root, which is not committed):

- `PORT`: it holds the value of the port the backend listens on. In the code, it defaults to 3000 if not set.
- `FRONTEND_URL`: it stores the URL of the frontend and allows CORS to work. For development I'm using `http://localhost:5173` (without final slash), while for production, the host will set it to the Netlify URL.
- `DATABASE_URL`: it contains the host, role, port, database and password for the corresponding cng database (the format is `postgresql://<role>:<password>@<host>:<port>/<database>`). For development this will be a local database with no password; however, for production, the host will handle it.
