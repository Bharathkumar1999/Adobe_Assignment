# Adobe_Assignment

This repository contains the solution for a simple social media platform consisting of a backend API and a frontend UI with analytics pages. The platform supports creating, reading, updating, and deleting operations for user profiles and posts. Users can also "like" and "unlike" posts. The analytics pages display insights on user engagement and content popularity.

Backend API
Models
The backend API includes two models:

User - Contains the following fields:

1. id (unique identifier)
2. name (string, 1-50 characters)
3. email (string, valid email format)
4. bio (optional string, 0-200 characters)
5. created_at (timestamp, automatically set when the user is created)
6. updated_at (timestamp, automatically updated when the user is updated)

Post - Contains the following fields:

id (unique identifier)
1. user_id (foreign key referencing the User model)
2. content (string, 1-300 characters)
3. created_at (timestamp, automatically set when the post is created)
4. updated_at (timestamp, automatically updated when the post is updated)
5. likes (integer, non-negative)

Endpoints
The following endpoints are implemented in the backend API:

User Endpoints
1. POST /users - Create a new user.
2. GET /users/{id} - Retrieve a user by id.
3. PUT /users/{id} - Update a user's name or bio by id.
4. DELETE /users/{id} - Delete a user by id.
5. GET /analytics/users - Retrieve the total number of users.
6. GET /analytics/users/top-active - Retrieve the top 5 most active users, based on the number of posts.

Post Endpoints
1. POST /posts - Create a new post. The request should include the user_id.
2. GET /posts/{id} - Retrieve a post by id.
3. PUT /posts/{id} - Update a post's content by id.
4. DELETE /posts/{id} - Delete a post by id.
5. POST /posts/{id}/like - Increment the like count of a post by id.
6. POST /posts/{id}/unlike - Decrement the like count of a post by id. The count should not go below 0.
7. GET /analytics/posts - Retrieve the total number of posts.
8. GET /analytics/posts/top-liked - Retrieve the top 5 most liked posts.

Validation
Basic validation is implemented for the input data. The backend API ensures that required fields are present and in the correct format. It also ensures that the maximum length of string fields is not exceeded.


Frontend UI
The frontend UI is a responsive web application built using React. The following components are implemented:

1. UserForm - A form for creating and updating user profiles.
2. PostForm - A form for creating and updating posts.
3. UserList - A list of users, with options to view, edit, and delete users.
4. PostList - A list of posts, with options to view, edit, delete, like, and unlike posts.
5. UserAnalytics - A page displaying user analytics, such as the total number of users and the top 5 most active users.
6. PostAnalytics - A page displaying post analytics, such as the total number of posts and the top 5 most liked posts.
App - The main application component that combines the other components.
Integration with Backend API
The frontend UI is integrated with the backend API using Axios to make HTTP requests to the API endpoints. 

Instructions
1. Clone the repository.
2. Install the dependencies for the backend and the frontend.
3. Set up the database.
4. Run the backend API.
