Echo — Real-Time Opinion Polls (Node.js + Express + MongoDB)

Echo is a full-stack web application that lets users express their opinions on various topics and vote on others. It offers:

* Real-time opinion creation and voting.
* Autorefreshing polls.
* Trending sort using a custom scoring formula.

Features
* Submit new opinions with a simple interface.
* Live voting results with animated bars.
* Trending sorting.
* Auto-refresh polls every 5 seconds.
* Seeds starter opinions on first run.

Folder Structure

echo/
├── client/
│   ├── index.html
│   ├── opinion.html
│   ├── script.js
│   └── style.css
│
├── server/
│   ├── models/
│   │   └── Opinion.js
│   ├── routes/
│   │   └── opinion.js
│   ├── db.js
│   ├── seed.js
│   └── index.js
│
├── .env
└── README.md

API Endpoints

* `GET /api/opinions?sort=latest|trending` — Fetch top 10 opinions.
* `POST /api/opinions` — Submit a new opinion.
* `POST /api/opinions/:id/vote` — Vote (yes/no) on an opinion.

Language/Stack Used

* Node.js
* Express.js
* MongoDB + Mongoose
* JavaScript 
* HTML/CSS

How to Run

1. Install dependencies
   npm install

2. Set up MongoDB
    Ensure Mongo is running locally or update `.env`:
     MONGO_URI=mongodb://127.0.0.1:27017/echo

3. Start the server
   node server/index.js

4. Open in browser
   http://localhost:3000

Author
* Samiksha Patil.
