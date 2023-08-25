# API Documentation: UsersRoutes

The `UsersRoutes` API provides endpoints for managing user resources. This API allows creating, retrieving, updating, and deleting user information.

## Endpoints

### 1. Create a User

- **URL:** `/`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Success Response:**
  - **Status Code:** 201 Created
- **Error Responses:**
  - **Status Code:** 400 Bad Request
    ```json
    {
      "message": "User already exists"
    }
    ```

### 2. Get All Users

- **URL:** `/`
- **Method:** GET
- **Success Response:**
  - **Status Code:** 200 OK
  - **Response Body:**
    ```json
    [
      {
        "id": "user_id_1",
        "name": "John Doe",
        "email": "johndoe@example.com"
      },
      {
        "id": "user_id_2",
        "name": "Jane Smith",
        "email": "janesmith@example.com"
      }
      // ...
    ]
    ```

### 3. Get User by ID

- **URL:** `/:id`
- **Method:** GET
- **URL Parameters:**
  - `id`: User's unique ID
- **Success Response:**
  - **Status Code:** 201 OK
  - **Response Body:**
    ```json
    {
      "id": "user_id",
      "name": "John Doe",
      "email": "johndoe@example.com"
    }
    ```
- **Error Response:**
  - **Status Code:** 404 Not Found
    ```json
    {
      "message": "Resource not found"
    }
    ```

### 4. Update User

- **URL:** `/:id`
- **Method:** PUT
- **URL Parameters:**
  - `id`: User's unique ID
- **Request Body:**
  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com",
    "password": "newpassword"
  }
  ```
- **Success Response:**
  - **Status Code:** 200 OK
- **Error Response:**
  - **Status Code:** 404 Not Found
    ```json
    {
      "message": "Resource not found"
    }
    ```

### 5. Delete User

- **URL:** `/:id`
- **Method:** DELETE
- **URL Parameters:**
  - `id`: User's unique ID
- **Success Response:**
  - **Status Code:** 200 OK
- **Error Response:**
  - **Status Code:** 404 Not Found
    ```json
    {
      "message": "Resource not found"
    }
    ```

## Data Types

### User Object

- `id` (string): Unique identifier for the user.
- `name` (string): User's name.
- `email` (string): User's email address.
- `password` (string): User's hashed password.

## Notes

- This API uses the [Fastify](https://www.fastify.io/) framework.
- User passwords are stored in hashed form using bcrypt.
- The API performs data validation using Zod schemas.

## Example Usage

To create a new user, make a POST request to the `/` endpoint with the required user information in the request body. For example, using `curl`:

```sh
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}' http://localhost:3000/
```

For other endpoints, replace `/` with the appropriate endpoint path and adjust the method and request parameters accordingly.

Remember to replace `http://localhost:3000/` with the actual base URL of your API server.
