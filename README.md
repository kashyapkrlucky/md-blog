## **Markdown Blogging Platform**

### **Overview**

The Markdown Blogging Platform allows users to:

1. **Authenticate** using email and password.
2. **Create, edit, and delete blog posts** with Markdown content.
3. **Generate AI summaries** for each blog post using OpenAI.
4. **Search and filter blog posts** by title or content.
5. **Manage user sessions** with login/logout functionality.

The app integrates **Next.js** for frontend, **MongoDB** for data storage, and **NextAuth.js** for authentication.

---

### **App Flow and Features**

#### **1. Authentication**

- **Login Page**: Users can log in using their email and password through **NextAuth.js**. If the login is successful, they are redirected to the dashboard.
- **Session Management**: User sessions are managed by **NextAuth.js**, which securely stores user data (email, name) in cookies. Once authenticated, user data is accessible across pages, and users can log out at any time.
- **Session Handling**: The session information is available through a context (provided by **SessionProvider**) which helps check if the user is logged in and display the appropriate navigation options.

#### **2. Dashboard**

- After logging in, users are taken to the **Dashboard**. Here, they can:
  - **Create a New Post**: Using a simple form, users can enter a title and content (in Markdown format) for a new blog post. Once submitted, the post is saved in the backend database (MongoDB).
  - **Manage Existing Posts**: Users can see a list of their blog posts, with options to edit or delete them. Each blog post is linked to a unique URL, allowing users to access and edit posts individually.

#### **3. Blog Post Creation and Editing**

- **Markdown Content**: When creating or editing a blog post, users write content in **Markdown**. This allows for rich formatting like headers, lists, links, and images.
- **Backend**: The content is stored in **MongoDB**, ensuring that each post is linked to the user who created it. The posts include metadata such as title, content, creation date, and last modification date.

#### **4. AI-Powered Summary Generation**

- **Generate AI Summary**: For each blog post, users can request an AI-generated summary. This is powered by the **OpenAI API**.
  - When a user requests a summary, the content of the blog post is sent to the OpenAI API.
  - The AI returns a short, concise summary of the blog post, which is then displayed alongside the original content.

#### **5. Blog Post List and Search**

- **View All Posts**: On the **Posts Page**, users can view a list of all blog posts.
  - Each post displays the title and a preview of the content.
  - Users can click on a post to view the full content and AI-generated summary (if available).
- **Search and Filter**: Users can search for posts by title or content. The app uses client-side filtering to display only the posts that match the search criteria.

#### **6. Navigation and User Interface**

- **NavHeader**: The navigation bar changes depending on the user's session state.
  - If the user is logged in, the navbar will show the user's name and a "Sign Out" button.
  - If the user is not logged in, the navbar will show a "Login" link.
- **Responsive UI**: The app is designed to be mobile-friendly and responsive, with the UI adapting to various screen sizes.

---

### **App Structure and Flow**

1. **User Authentication**:

   - Users are authenticated using **NextAuth.js**, which supports different authentication strategies.
   - Upon successful login, a session is created, and the user is redirected to the Dashboard.

2. **Dashboard**:

   - The **Dashboard** displays a list of the user’s blog posts, with options to create, edit, or delete them.
   - The creation of a new post triggers a form that captures the title and content in Markdown.

3. **Backend (API)**:

   - The app uses **Next.js API routes** to handle server-side logic for blog posts. The routes interact with the **MongoDB database** to perform CRUD (Create, Read, Update, Delete) operations on blog posts.
   - **AI Summary Generation**: A backend route is responsible for fetching the post content, sending it to OpenAI, and returning a generated summary.

4. **User Interface**:
   - The UI is built using **Tailwind CSS**, ensuring a clean, modern design.
   - Components like **NavHeader** and **BlogForm** are reused across the app for consistency and reusability.
   - The **search** functionality is implemented on the client-side to ensure a fast and responsive search experience.

---

### **Authentication Flow**

1. **Login**:

   - Users input their email and password.
   - **NextAuth.js** authenticates the credentials and creates a session for the logged-in user.
   - On success, the user is redirected to the Dashboard. If unsuccessful, an error message is shown.

2. **Session Management**:
   - Once logged in, the user's session is automatically managed by **NextAuth.js**.
   - The session data is accessible throughout the app, ensuring that the user remains logged in until they sign out.
   - The app checks the session status using the **useSession** hook from **NextAuth.js** to adjust the UI accordingly.

---

### **Post Management**

1. **Creating Posts**:

   - On the **Dashboard**, users can access a form to create a new post.
   - The form captures the **title** and **content** in Markdown.
   - Upon submission, the form data is sent to the backend API route that handles the creation of the post in the **MongoDB** database.

2. **Editing and Deleting Posts**:

   - Each post has options to edit or delete. Editing redirects the user to a form pre-populated with the current post data.
   - The post can be updated in the backend, and the changes are reflected immediately on the Dashboard.

3. **Viewing Posts**:
   - Users can click on any post from the list to view its content, including the AI-generated summary (if available).

---

### **AI Integration**

- The platform integrates with **OpenAI** to generate summaries of blog posts.
- Each time a user requests a summary, the backend sends the post content to OpenAI and receives a generated summary in return.
- The summary is then displayed on the post’s detail page, offering a concise overview of the content.

---

### **Search and Filter**

- **Search Functionality**:
  - The **Posts Page** provides a search bar where users can type to filter blog posts by title or content.
  - The app dynamically filters the posts as the user types in the search bar, making it easy to find specific posts.

---
