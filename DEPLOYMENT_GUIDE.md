# FocusFlow - Ultimate Free Deployment Guide 🚀

This is a comprehensive, step-by-step guide to deploying your FocusFlow application absolutely for free. We will use **MongoDB Atlas** for the database, **Render** for the NodeJS backend, and **Vercel** for the React frontend.

---

## Step 1: Prepare Your Code
We have already updated all the API URLs in your frontend (in `App.jsx` and `AuthContext.jsx`) to use `import.meta.env.VITE_API_BASE_URL`. This means your frontend will dynamically connect to your live backend instead of localhost!

### Push Everything to GitHub
1. Go to [GitHub.com](https://github.com/) and create a new repository called `focusflow`.
2. Open strings of terminal in your project root (`FocusFlow` folder) and run:
   ```bash
   git init
   git add .
   git commit -m "Ready for Deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/focusflow.git
   git push -u origin main
   ```

---

## Step 2: Ensure MongoDB Atlas is Ready 🗄️
Render needs to connect to the internet to reach your Database.
1. Log into [MongoDB Atlas](https://account.mongodb.com/).
2. Go to **Network Access** (on the left sidebar).
3. Click **Add IP Address**.
4. Click **ALLOW ACCESS FROM ANYWHERE** (`0.0.0.0/0`). This is perfectly fine and required for free hosting platforms.
5. Go back to **Database** and click **Connect**, then **Drivers**, and copy your `MongoDB URI` (it contains your username and password).

---

## Step 3: Deploy Backend on Render ⚙️
Render gives you a free instance to run Node servers.
1. Go to [Render.com](https://render.com/) and create a free account (sign up with GitHub).
2. Click **New +** and select **Web Service**.
3. Select **Build and deploy from a Git repository** and click Next.
4. **Connect your GitHub** and select your `focusflow` repository.
5. Fill out the form:
   - **Name**: `focusflow-backend`
   - **Root Directory**: `backend` (⚠️ THIS IS CRITICAL!)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
6. Scroll down to **Environment Variables** and add three variables:
   - `PORT` = `5000`
   - `MONGO_URI` = `mongodb+srv://<your-username>:<your-password>@cluster...` (Paste your MongoDB connection string from Step 2)
   - `JWT_SECRET` = `supersecretfocusflowkey2026` (or any random long string)
7. Click **Create Web Service**. 
8. **Wait roughly 3-5 minutes.** Once you see `Your service is live 🎉`, copy the backend URL at the top left (it will look like `https://focusflow-backend-xxxx.onrender.com`).

---

## Step 4: Deploy Frontend on Vercel 🎨
Vercel is the absolute best (and free) platform for Vite/React applications.
1. Go to [Vercel.com](https://vercel.com/) and sign up with GitHub.
2. Click **Add New** -> **Project**.
3. Import your `focusflow` GitHub repository.
4. **Configure the Project:**
   - **Project Name**: `focusflow-app`
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click the EDIT button and select `frontend`. (⚠️ CRITICAL!)
5. Expand **Environment Variables**:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://focusflow-backend-xxxx.onrender.com/api` (Paste your Render backend URL from Step 3, **and make sure to add `/api` at the very end!**)
6. Click **Deploy**.
7. **Wait 1 minute.** The confetti will fly, and Vercel will give you a live URL for your React app!

---

## Step 5: You're Done! 🎉
Click on your new Vercel URL. You can share this globally.
- You can create an account, log in, manage tasks, and run Pomodoros over the live web!
- Your data is globally persistent!
- Both platforms (Render and Vercel) have CI/CD integration. Whenever you run `git push`, your live server will automatically update with your new code.

Happy Coding!
