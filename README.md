# Betsy

## Database Schema

![db-schema]

[db-schema]: ./images/schema.png



## Backend Routes

### Users
`GET /api/users/`
* Returns the information for all users

`GET /api/users/:id`
* Returns the information for one user

### Sessions
`GET /api/auth/`
* Returns the information for the logged in user

`POST /api/auth/signup`
* Signs a new user up

`POST /api/auth/login`
* Logs in a user

`DELETE /api/auth/`
* Logs out a user

### Product Listings
`GET /api/listings/`
* Returns the information for all Product Listings

`POST /api/new-listing/`
* Creates a Product Listing

`PUT /api/listing/:id`
* Edits a Product Listing

`GET /api/listing/:id`
* Returns the information for one Product Listing

`PUT /api/listing/:id`
* Edits a Product Listing

`DELETE /api/listing/:id`
* Deletes a product listing

`POST /api/listing/:id/images`
* Add an Image to a Listing based on the Listing's id

`GET /api/listing/:id/reviews/`
* Returns all reviews belonging to a specific listing

`POST /api/listing/:id/`
* Creates a new review for a specific product listing


### Reviews
`PUT /api/review/:id`
* Edits a review

`DELETE /api/review/:id`
* Deletes a review

### Product Images
`DELETE /api/images/:id`
* Deletes an image

### Shopping Cart

`GET /api/cart/`
* Returns the information for all items in a cart

`POST /api/cart/`
* Adds a Product Listing to the cart

`DELETE /api/cart/:id`
* Deletes a Product Listing from the cart
