## User Registration and Authentication

1. **User Register (Roles: Guest, Admin)**
   - Endpoint: `POST localhost:3000/api/auth/register`
   - Request Body:
     ```json
     {
       "username": "john_doe",
       "email": "john.doe@example.com",
       "password": "johndoe123",
       "role": "guest"
     }
     ```

   - User Sign-in
     - Endpoint: `POST localhost:3000/api/auth/login`
     - Request Body:
       ```json
       {
         "email": "john.doe@example.com",
         "password": "johndoe123"
       }
       ```

## App Management

2. **Create Multiple Apps on Platform**
   - Endpoint: `POST localhost:3000/api/apps/create`
   - Request Body:
     ```json
     {
       "appName": "Seagram",
       "apiKey": "dsajkbhnd12j34daks",
       "whitelistedDomains": ["example.com", "example.org"]
     }
     ```

   - User Accesses API Only with API Key
     - Endpoint: `GET localhost:3000/api/apps/create/:id`

## Document Upload and Permissions

3. **Admin Can Upload Docs for All Users and Assign Access**
   - Endpoint: `POST localhost:3000/api/document/create/id`
   - Request Body:
     ```json
     {
       "title": "DocumentTitle",
       "file": "path/to/your/document.pdf",
       "allowedRoles": ["admin", "user"],
       "allowedUsers": ["user@example.com", "anotheruser@example.com"],
       "permission": "private"
     }
     ```
