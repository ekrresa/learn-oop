# OOP with ES5
Simulation of an E-commerce site functionality using Objects and knowledge of OOP concepts, Prototypical Inheritance

## Installation
- Clone project.
- Open with text editor.
- Open index.js and have fun with the objects.
- Use console for output.

## Objects
- User
- Admin (Inherits from User)
- Order

## Properties
- User
  - Name*
  - Email*
  - Password*
  - Id (Auto increment)
- Order
  - user_id
  - timeOfOrder
  - dateOfOrder
  - Id (Auto increment)
  - Products in the order*

*Only properties with asterisks should be passed in as arguments during initialization*

## Functionality
### User
- Create a new user.
- Read a single user by his ID.
- Update the details of a user.
- Search for a user by his name.
### Admin
- Read all users.
- Delete a user.
- Delete all users.
### Order
- Create a new order (User).
- Read all the orders (Admin).
- Read one order by its ID (Admin).
- Update order details (Admin).
- Delete one order (Admin).
- Delete all orders (Admin).
