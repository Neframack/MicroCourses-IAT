MICROCOURSES MERN STACK WEB APP

Run in two seperate terminals
Backend 
- cd backend 
- node server.js

Frontend
- cd frontend
- npm start

Tech Stack
- Frontend: React (Create React App, base CSS)
- Backend: Node.js, Express.js
- Database: MongoDB Atlas (cloud)
- Other: Multer for image upload, RESTful API, Git for version control

Features
- Homepage with searchable, alphabetically sorted courses
- Course details page with modules, image, and delete functionality
- Add course pop up with image upload
- Delete course with confirmation and image cleanup
- Data Stored and retrived in backend server and mongodb
- Report on caching, Load Balancing, and high availability

API End Points
| Method | Endpoint           | Description                      |
|--------|--------------------|----------------------------------|
| GET    | `/courses`         | Get all courses                  |
| GET    | `/courses/:id`     | Get course by ID                 |
| POST   | `/courses`         | Add new course (with image)      |
| DELETE | `/courses/:id`     | Delete course and image file     |



CODE Overview
Backend/
- server.js: Starts the Express server, connects to MongoDB Atlas, configures middleware 
(e.g., JSON parsing, CORS, static file hosting), and routes API traffic to courseRoutes.js.

- models/Course.js: Defines the course schema using Mongoose. It includes fields like title, 
description, instructor, duration, category, image, and modules.

- routes/courseRoutes.js: Handles all course-related API endpoints:
    - GET /courses: Get all courses
    - GET /courses/:id: Get one course by ID
    - POST /courses: Add a new course (with image upload)
    - DELETE /courses/:id: Delete a course and its image

- middleware/upload.js: Configures Multer for handling image uploads, including destination folder (/uploads) and filename formatting logic

- uploads/: Stores uploaded course images for frontend display.

- scripts/seed.js: Populates MongoDB with sample courses for testing and demo purposes.

- .env: Stores environment variables such as MONGO_URI



Frontend/
- src/App.js: Defines routing between the home page and course details page.

- src/pages/HomePage.js: Displays all courses using cards. Features include:
    - Search bar
    - Add Course modal popup
    - Courses ordered alphabetically

- src/pages/CourseDetails.js: Shows a selected course’s full information. Includes:
    - Course image and module list
    - Delete functionality with confirmation popup

- src/components/CourseCard.js: A reusable component for rendering each course in a styled card layout.

- src/pages/HomePage.css & CourseDetails.css: Contains layout and styling logic (e.g., Flexbox layouts, responsive design).



## Technical Details

### API Routes & Functionality

- GET /courses
  - Input: None  
  - Output: JSON array of all courses from MongoDB  
  - Used In: `HomePage.js` (on load)

- GET /courses/:id
  - Input: `id` (MongoDB ObjectId)  
  - Output: JSON of the selected course  
  - Used In:`CourseDetails.js`

- POST /courses
  - Input: Form data (`title`, `description`, `image`, etc.)  
  - **Output: JSON confirmation + newly created course data  
  - Used In: `Homepage.js`

- DELETE /courses/:id
  - Input: `id` (MongoDB ObjectId)  
  - Output: JSON success message  
  - Used In: `CourseDetails.js` (delete button)



## Problem-Solving

### Challenges Faced & Solutions

- MongoDB Atlas Auth Errors 
  - Problem: Initial connection failed due to incorrect credentials.  
  - Solution: Recreated DB user with proper read/write access and updated the `.env` file.

- Image Uploads Not Displaying  
  - Problem: Uploaded images weren’t loading on the frontend.  
  - Solution: Used `express.static` to serve the `/uploads` folder. Hardcoded `http://localhost:5000/uploads/...` during local development.

- Delete Image on Course Deletion  
  - Problem: Images remained even after the course was deleted.  
  - Solution: Used Node's `fs` module to unlink (delete) the associated image in the backend's DELETE route.

- Search & Add Functionality  
  -*Problem: Search and "Add Course" popup conflicted in state handling.  
  - Solution: Managed local state with `useState` and refetched the course list after add/delete.

---

## Achievements

- **Full CRUD Support**  
  Users can create, read, and delete courses. Each course includes metadata and an image upload.

- **Responsive UI with Clean UX**  
  Modern and user-friendly layout, with popup forms instead of page reloads.

- **Organized Codebase**  
  Clear separation between models, routes, frontend components, and database scripts.

- **Optimized Data Handling**  
  State is efficiently managed using React hooks with minimal re-renders or full page reloads.

- **Error Handling Implemented**  
  Includes validation, try-catch blocks, and user alerts for broken inputs or API failures.

---