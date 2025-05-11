# 🕵️‍♂️ Secret Clubhouse

In this project, I built a private clubhouse where members can post anonymously. Outside visitors can read the stories, but they don’t see who wrote them - only members inside the clubhouse can see the authors behind each post.

The app focuses on **user authentication** and **session handling**, building on what I learned in previous projects. It also gave me a chance to deepen my skills with **PostgreSQL databases** and server-side logic using **Express** and **Passport.js**.

## Setup Instructions

1. **Clone the Repository**

   ```sh
   git clone https://github.com/ScaxCodes/secret-clubhouse.git
   cd secret-clubhouse
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file in the root directory (or verify its existence) with:

   ```
   DATABASE_URL=postgresql://<YOUR_USERNAME>@localhost:5432/secret_clubhouse
   SECRET_KEY=123
   ADMIN_KEY=789
   ```

4. **Set Up the Database**

   - Ensure you have PostgreSQL installed and running.
   - Run the seed script to create the database, tables, and sample data:

   ```sh
   cd db
   bash seed.sh
   cd ..
   ```

5. **Run the Application**  
   Start the server in development mode:
   ```sh
   npm run dev
   ```
   Visit `http://localhost:8000` in your browser.

## Project Implementation Details

- **Authentication:**  
  User authentication is handled by Passport.js using a local strategy ([`passport-config.js`](./auth/passport-config.js)).  
  The session is managed using `express-session`.

- **Database Interaction:**  
  PostgreSQL is used as the primary database. Queries are defined in [`queries.js`](./db/queries.js) and a connection pool is provided in [`pool.js`](./db/pool.js).  
  The database schema and sample data are set up with the [`seed.sh`](./db/seed.sh) script.

- **User Roles:**  
  Users can sign up, log in, and then join the club (as member or admin) using a secret key on `/join-the-club`.  
  Admin-specific actions (like deleting messages) are protected and only accessible to users marked as admin in the database.  
  Club membership and admin status are updated in [`userController.js`](./controllers/userController.js) and the associated queries in [`queries.js`](./db/queries.js).

- **Message Posting:**  
  Users can post messages to share secret stories.  
  Only members can see the author and the date of a message.
  Message-related functionality is implemented in [`messageController.js`](./controllers/messageController.js) with proper access restrictions based on the user's role.

- **Views and Routing:**  
  The views for rendering HTML pages are built using EJS (located in the [`views/`](./views) directory).  
  The routing logic is split between public routes ([`router.js`](./routes/router.js)) and protected routes ([`protectedRouter.js`](./routes/protectedRouter.js)).
