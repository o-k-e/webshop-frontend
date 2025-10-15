# 🛒 Ganesha Webshop

<br />
<img width="1105" height="689" alt="ganesha-landing-page-hero" src="https://github.com/user-attachments/assets/be20d38c-0485-468f-817e-5acc8343a7da" />
<img width="1104" height="822" alt="ganesha-landing-page-products" src="https://github.com/user-attachments/assets/b336aba5-b552-4b5d-ab7a-64eac6420dc8" />

<br />
<br />


A full-stack webshop project built with modern technologies, developed for a real client and intended for live production use. The focus is on creating a secure, responsive, and containerized application that is easy to scale, extend, and maintain.

This project is **under active development** and intended for real deployment.

<br />


## 🌐 Live Demo

The webshop is deployed on [Render.com](https://render.com) and accessible at the following link:

[https://webshop-frontend-wl0h.onrender.com](https://webshop-frontend-wl0h.onrender.com)

> **Note:**  
> The first load may take **up to 30–60 seconds**, especially if the app hasn’t been accessed in a while.  
> This delay is due to [Render's free tier](https://render.com/docs/free#spin-down), which **automatically spins down inactive services** to save resources. When you revisit the site, it needs to "wake up" the backend and frontend containers before responding.

### 🔐 Access & Login Info

You can freely browse all **public user pages** (e.g. product listings, search, details) without logging in.

To access the **admin dashboard**, authentication is required.  
Use the following default admin credentials:

```json
{
  "username": "admin",
  "password": "Admin1@34"
}
```

Once logged in, you will be redirected to the protected admin interface.
<br />
<br />


## About the Project

This project is a **work in progress** full-stack webshop built for a real deployment scenario.  
<br />

## 🛠️ Built With

- **Languages:**  
  [![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

- **Backend:**  
  [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)

- **Frontend:**  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)  
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)  
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

- **Database:**  
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

- **Containerization:**  
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)  
  [![NGINX](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://www.nginx.com/)

- **Authentication:** Local storage (planned to add OAUTH2)  
  ![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge&logo=jsonwebtokens)

- **Image Handling:** Local storage (Cloudinary planned for production)  
  ![Local Storage](https://img.shields.io/badge/Image%20Handling-Local%20Storage-blue?style=for-the-badge)
  ![Cloudinary](https://img.shields.io/badge/Cloudinary-Planned-lightgrey?style=for-the-badge&logo=cloudinary)

- **Version Control:**  
  ![Git](https://img.shields.io/badge/Version%20Control-Git-orange?style=for-the-badge&logo=git)
  ![GitHub](https://img.shields.io/badge/Repo-GitHub-black?style=for-the-badge&logo=github)

<br />

## ✨ Features

- **Product Browsing**
  - Browse all products (public)
  - View detailed product pages
  - Category-based filtering
  - Pagination and sorting

- **Search & State Management**
  - Global state management with **Zustand**
    - Stores search term, selected category, sort options, page number, and limit
    - Ensures consistent filtering and pagination across components

- **Authentication & Authorization**
  - User registration and login with **JWT-based authentication**
  - Auto token handling with **AuthContext + Axios interceptor**
  - Role-based access control (separate UI for Admin & User)

- **Admin Features**
  - Admin dashboard
  - Create, update, disable products
  - Upload and manage product images

- **Form Handling & Validation**
  - Forms powered by **React Hook Form + Zod**
  - Real-time validation feedback

- **DevOps & Deployment**
  - Fully containerized with **Docker** + NGINX reverse proxy
  - Deployed on **Render.com**
    <br />
    <br />

### Example: Admin - All Products and Update Product

<img width="1073" height="805" alt="ganesha-admin-landing-page" src="https://github.com/user-attachments/assets/82c5054d-b962-410f-af1b-85881b48037b" />
<br />
<br />
<br />
<img width="884" height="812" alt="ganesha-product-update" src="https://github.com/user-attachments/assets/e51ff44a-da28-4c84-9827-9a72e170877a" />

<br />

## 🧪 To Do

- **E-commerce Features**
  - Implement product stock quantity
  - Add cart and checkout logic (with order summary & persistence)

- **Admin Panel - Dashboard**
  - Overview of product count, categories, and recent activity
  - Dashboard statistics (orders, user activity – future scope)

- **Authentication**
  - Integrate **OAUTH2** login (e.g. Google)

- **Media Handling**
  - Migrate image storage from local to **Cloudinary**

- **Deployment**
  - Explore deployment to **Vercel** / **Railway**
  - Add CI/CD pipeline (GitHub Actions)

---


## Contact

- **Erika Oláhné Klár:**  
  [![GitHub](https://img.shields.io/badge/GitHub-%2312100E.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/o-k-e)  [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/erika-olahne-klar/)

