# BoldNarratives

BoldNarratives is a feature-rich blog management platform that allows users to create, view, and interact with blogs. With powerful sorting, filtering, and search capabilities, users can easily find the content they are interested in. The project is built with modern web technologies to ensure a seamless and efficient user experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Team](#contributors)

## Features
- **SignUp/Signin** Authentication
  ![image](https://github.com/user-attachments/assets/5284db6f-be6e-43bc-ac0c-18b1749491eb)

- **Create Blogs:** Users can create new blog posts with rich content.
  ![image](https://github.com/user-attachments/assets/a6eb947e-71ea-4017-b3b0-91dedc5697b9)

- **View Blogs:** Browse and read blogs with ease.
  ![image](https://github.com/user-attachments/assets/dc1507e3-0a33-439a-b58d-a472a0fc370f)
  
- **Upvote Blogs:** Show appreciation for quality content by upvoting blogs.
  ![image](https://github.com/user-attachments/assets/d5c8a570-9020-49fb-8e44-03e690f6fb30)

- **Comment on Blogs:** Engage with other users by commenting on blog posts.
  ![image](https://github.com/user-attachments/assets/ddc8e0c4-8368-4751-a7f4-a85e5bdfca9f)

- **Delete Comments.** Can delete comments
  ![image](https://github.com/user-attachments/assets/62b8c371-9377-4256-9305-c0188c215d08)

- **Follow Other users** Cna follow other users.
  ![image](https://github.com/user-attachments/assets/4b4326ab-1b34-48df-8eba-3c4cb7f33d1a)

- **Sort Blogs:** Sort blogs by upload time, number of views, trending status, and more.
- **Filter Blogs:** Filter blogs based on genres to find relevant content.
  ![image](https://github.com/user-attachments/assets/303f242b-301d-46b0-9b8a-bc42135856e4)
  
- **Search Blogs:** Search for blogs using keywords.
  ![image](https://github.com/user-attachments/assets/e3765a7e-808e-4c4f-8d48-c7a140fd06b1)

  
## Tech Stack
- **Frontend:**
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Backend:**
  - [Hono](https://honojs.dev/) (serverless backend)
  - [Prisma](https://www.prisma.io/) (ORM)
  - [PostgreSQL](https://www.postgresql.org/) (database)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Lakshya0000/boldnarratives.git
   cd boldnarratives

2. **Navigate to Frontend and install dependencies:**
   ```bash
   cd frontend
   npm i
   cd ..

3. **Navigate to Backend and install dependencies:**
   ```bash
   cd backend
   npm i
   cd ..

4. **Setup Database**
    - Ensure to have a postgress database link and prisma accelerate link.
    - Create a wrangler.toml file in backend folder
    - And copy the content of sample_wrangler to wrangler.toml and in database url add prisma accelerate link and in direct url add postgress sql link and write a jwt secret key
    - Create a .env file and enter the database url and direct url as same as in wrangler.toml

5. **Run Migration and Create a Prisma client**
   - In ``` ./prisma/schema.prisma ``` replace the datasource db block with the below
   ```
   datasource db {
    provider = "postgresql"
    url      = env("DIRECT_URL")
   }
   ```
   - Run ``` npx prisma migrate dev ```
   - Again replace url in datasource db with ``` url = env("DATABASE_URL")  ```
   - Run ``` npx prisma generate --no-engine ```

6. **Run Frontend and Backend**
   ``` npm run dev ```


## Usage
- Create an Account: Sign up to start creating and interacting with blogs.
- Browse Blogs: Use the various sorting and filtering options to find blogs of interest.
- Interact: Upvote, comment, and share your thoughts on blog posts.
- Create Content: Write your own blogs and share them with the world.
- Follow People: Can follow people with same interest

## Contributors
  - [Lakshya Agarwal](https://github.com/Lakshya0000)
  - [Aditya Gunjkar](https://github.com/aditya-gg04)
