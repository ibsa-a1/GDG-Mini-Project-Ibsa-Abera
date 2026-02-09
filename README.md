# End-Points Documentation using Postman

## Project Overview

This document describes the API endpoints of the E-commerce Backend Mini Project.  
All endpoints were tested using Postman, and example requests and responses were verified during development.

The backend follows REST principles and is implemented using **Node.js**, **Express**, **MongoDB Atlas**, and **MVC architecture**.

---

## Installation & Setup

Follow these steps to run the project locally:

```
1. Clone the repository
git clone <your-repository-url>

2. Navigate into the project folder
cd ecommerce-backend

3. Install dependencies
npm install

4. Create a .env file in the root directory and add:
DB_USER= your user name
DB_PASSWORD=Your Password
DB_HOST=The Host Name
DB_NAME=The DataBase name in your MongoDB Atlas
PORT=5000

5. Start the server
npm run dev
```

The server will run at:

```
http://localhost:5000
```

You can now test all endpoints using Postman.

---

## Environment Variables

The application uses environment variables for configuration.

Create a `.env` file in the root directory and define:

```
MONGO_URI = MongoDB Atlas connection string
PORT = server port (default: 5000)
```

Example:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
PORT=5000
```

⚠️ Never commit your `.env` file to GitHub.


## Base URL

`http://localhost:5000`

All requests and responses use JSON format.

---

## Products Endpoints

### 1. GET /products

**Description:**  
Retrieves all products from the database. Supports optional filtering using query parameters.

**Query Parameters (optional):**
- `category` – filter by product category
- `minPrice` – minimum price
- `maxPrice` – maximum price

**Example Request:**
```
GET /products?category=electronics&minPrice=10&maxPrice=100
```

**Success Response (200):**
```json
[
  {
    "_id": "65abc123...",
    "name": "Wireless Mouse",
    "price": 25,
    "stock": 50,
    "category": "electronics"
  }
]
```

---

### 2. GET /products/:id

**Description:**  
Retrieves details of a single product using its ID.

**Example Request:**
```
GET /products/65abc123...
```

**Success Response (200):**
```json
{
  "_id": "65abc123...",
  "name": "Wireless Mouse",
  "price": 25,
  "stock": 50
}
```

**Error Response (404):**
```json
{ "message": "Product not found" }
```

---

### 3. POST /products

**Description:**  
Creates a new product in the database.

**Request Body:**
```json
{
  "name": "Wireless Mouse",
  "description": "Ergonomic wireless mouse with USB receiver",
  "price": 25,
  "stock": 50,
  "category": "electronics",
  "imageUrl": "https://example.com/mouse.jpg"
}
```

**Success Response (201):**
```json
{
  "_id": "65abc123...",
  "name": "Wireless Mouse",
  "price": 25
}
```

---

### 4. PUT /products/:id

**Description:**  
Updates an existing product’s details.

**Example Request:**
```
PUT /products/65abc123...
```

**Request Body:**
```json
{
  "price": 30,
  "stock": 40
}
```

**Success Response (200):**
```json
{
  "message": "Product updated successfully"
}
```

---

### 5. DELETE /products/:id

**Description:**  
Deletes a product from the database.

**Example Request:**
```
DELETE /products/65abc123...
```

**Success Response (200):**
```json
{ "message": "Product deleted" }
```

---

## Cart Endpoints

### 6. GET /cart

**Description:**  
Retrieves the current cart and its items.

**Success Response (200):**
```json
{
  "items": [
    {
      "product": {
        "name": "Wireless Mouse",
        "price": 25
      },
      "quantity": 2
    }
  ]
}
```

---

### 7. POST /cart

**Description:**  
Adds a product to the cart. Validates product existence and stock availability.

**Request Body:**
```json
{
  "productId": "65abc123...",
  "quantity": 2
}
```

**Success Response (201):**
```json
{
  "items": [
    {
      "product": "65abc123...",
      "quantity": 2
    }
  ]
}
```

**Error Responses:**
- 404 – Product not found
- 400 – Insufficient stock

---

### 8. PUT /cart

**Description:**  
Updates the quantity of an existing cart item.

**Request Body:**
```json
{
  "productId": "65abc123...",
  "quantity": 5
}
```

**Success Response (200):**
```json
{
  "message": "Cart updated successfully"
}
```

**Error Responses:**
- 404 – Product not found in cart
- 400 – Invalid quantity or insufficient stock

---

### 9. DELETE /cart/:productId

**Description:**  
Removes a product from the cart.

**Example Request:**
```
DELETE /cart/65abc123...
```

**Success Response (200):**
```json
{
  "message": "Item removed from cart"
}
```

---

## Orders Endpoints

### 10. POST /orders

**Description:**  
Creates an order from the cart. Validates stock, calculates total price, reduces stock, and clears the cart.

**Request Body:**
```json
{
  "customerInfo": {
    "name": "Test User",
    "email": "test@example.com",
    "address": "Addis Ababa, Ethiopia"
  }
}
```

**Success Response (201):**
```json
{
  "_id": "66order123...",
  "total": 50,
  "items": [],
  "createdAt": "2026-02-05"
}
```

---

### 11. GET /orders

**Description:**  
Retrieves all orders.

**Success Response (200):**
```json
[
  {
    "_id": "66order123...",
    "total": 50
  }
]
```

---

### 12. GET /orders/:id

**Description:**  
Retrieves details of a single order.

**Example Request:**
```
GET /orders/66order123...
```

**Success Response (200):**
```json
{
  "_id": "66order123...",
  "total": 50,
  "items": []
}
```

---

## Testing & Documentation

- All endpoints were tested using Postman
- Requests and responses were saved as examples
- A Postman collection was created for:
  - Products
  - Cart
  - Orders
- Error cases were also tested (invalid IDs, insufficient stock)
