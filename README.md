# Adobe_Assignment

Social Media Platform
This repository contains the solution for a simple social media platform consisting of a backend API and a frontend UI with analytics pages. The platform supports creating, reading, updating, and deleting operations for user profiles and posts. Users can also "like" and "unlike" posts. The analytics pages display insights on user engagement and content popularity.

Backend API
Models
The backend API includes two models:

User - Contains the following fields:

id (unique identifier)
name (string, 1-50 characters)
email (string, valid email format)
bio (optional string, 0-200 characters)
created_at (timestamp, automatically set when the user is created)
updated_at (timestamp, automatically updated when the user is updated)
Post - Contains the following fields:

id (unique identifier)
user_id (foreign key referencing the User model)
content (string, 1-300 characters)
created_at (timestamp, automatically set when the post is created)
updated_at (timestamp, automatically updated when the post is updated)
likes (integer, non-negative)
Endpoints
The following endpoints are implemented in the backend API:

User Endpoints
POST /users - Create a new user.
GET /users/{id} - Retrieve a user by id.
PUT /users/{id} - Update a user's name or bio by id.
DELETE /users/{id} - Delete a user by id.
GET /analytics/users - Retrieve the total number of users.
GET /analytics/users/top-active - Retrieve the top 5 most active users, based on the number of posts.
Post Endpoints
POST /posts - Create a new post. The request should include the user_id.
GET /posts/{id} - Retrieve a post by id.
PUT /posts/{id} - Update a post's content by id.
DELETE /posts/{id} - Delete a post by id.
POST /posts/{id}/like - Increment the like count of a post by id.
POST /posts/{id}/unlike - Decrement the like count of a post by id. The count should not go below 0.
GET /analytics/posts - Retrieve the total number of posts.
GET /analytics/posts/top-liked - Retrieve the top 5 most liked posts.
Validation
Basic validation is implemented for the input data. The backend API ensures that required fields are present and in the correct format. It also ensures that the maximum length of string fields is not exceeded.

Testing
Test cases are written to verify the functionality of the backend API.

Frontend UI
The frontend UI is a responsive web application built using React. The following components are implemented:

UserForm - A form for creating and updating user profiles.
PostForm - A form for creating and updating posts.
UserList - A list of users, with options to view, edit, and delete users.
PostList - A list of posts, with options to view, edit, delete, like, and unlike posts.
UserAnalytics - A page displaying user analytics, such as the total number of users and the top 5 most active users.
PostAnalytics - A page displaying post analytics, such as the total number of posts and the top 5 most liked posts.
App - The main application component that combines the other components.
Integration with Backend API
The frontend UI is integrated with the backend API using Axios to make HTTP requests to the API endpoints. 

Instructions
Clone the repository.
Install the dependencies for the backend and the frontend.
Set up the database.
Run the backend API.
