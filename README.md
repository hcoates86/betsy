# Betsy

## Database Schema

![db-schema]

[db-schema]: ./images/schema.png



## Backend Routes

### Users
`POST /api/users/`
* Signs a new user up

### Session
`GET /api/session/`
* Returns the information for the logged in user

`POST /api/session/`
* Logs in a user

`DELETE /api/session/`
* Logs out a user

### Product Listings
`GET /api/listings/`
* Returns the information for all Product Listings

`POST /api/listings/new/`
* Creates a Product Listing

`PUT /api/listings/:productId/`
* Edits a Product Listing

`GET /api/listings/:productId/`
* Returns the information for one Product Listing

`DELETE /api/listings/:productId/`
* Deletes a Product Listing

`POST /api/listings/:productId/images/`
* Add an Image to a Product Listing based on the Listing's id

`GET /api/listings/:productId/reviews/`
* Returns all Reviews belonging to a specific Product Listing

`POST /api/listings/:productId/reviews/`
* Creates a new Review for a specific Product Listing

### Reviews
`PUT /api/reviews/:reviewId/`
* Edits a Review

`DELETE /api/reviews/:reviewId/`
* Deletes a Review

### Shopping Cart

`GET /api/cart/`
* Returns the information for all items in the logged in user's Shopping Cart

`POST /api/cart/:productId/`
* Adds a Product Listing to the cart

`PUT /api/cart/:productId/`
* Edits the quantity of a Product Listing in the Cart
  
`DELETE /api/cart/:productId/`
* Deletes a Product Listing from the cart

### Category
`GET /api/category/:categoryId/`
* View all Product Listings in a Category
