Personal Blog






A personal blog platform where users can write, edit, and read posts with Markdown support. Users can also upload images, either locally or via Cloudinary.

🚀 Quick Start
1. Clone the repository
git clone https://github.com/your-username/personal-blog.git
cd personal-blog/personal-blog-backend


⚠️ Important: Ensure you are in the personal-blog-backend folder for backend setup.

2. Install Backend Dependencies
npm install


⚠️ Important: Backend must be installed before frontend.

3. Install Frontend Dependencies
cd client
npm install

4. Configure Cloudinary (Backend)

Create a Cloudinary account: https://cloudinary.com/

Add credentials to .env in personal-blog-backend:

CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret


⚠️ Important: This enables image uploads to Cloudinary.

5. Run the Application

Backend:

cd ..
npm start


Frontend:

cd client
npm start


🌐 Open your browser: http://localhost:3000

✨ Features

User Authentication – Sign up, login, secure sessions

Post Management – Create, edit, delete posts

Markdown Support – Format posts easily

Image Upload – Local or Cloudinary-based (backend handles cloud uploads)

Responsive Design – Desktop & mobile ready

Search & Filter – Find posts by title or category

🛠 Tech Stack
Frontend

React.js

React Router

CSS

React Markdown

Backend

Node.js

Express.js

MongoDB

JWT Authentication

Multer for file uploads

Cloudinary integration for image storage

📄 License

This project is open-source under the MIT License
.
