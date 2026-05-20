# DocAppoint Server Side

Backend server for the DocAppoint application built with Node.js, Express.js, and MongoDB.

---

## Features

- Get all doctors
- Get single doctor details
- Create booking appointment
- Update booking appointment
- Delete booking appointment
- MongoDB integration
- JWT verification
- Environment variable support

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- dotenv
- cors
- jose-cjs

---

## Installation

Clone the repository:


git clone <your-repository-link>





## Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=2000
DB_USER=your_database_user
DB_PASS=your_database_password
JWT_SECRET=your_secret_key
```

---


## Dependencies

```json
"dependencies": {
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jose-cjs": "^6.2.3",
  "mongodb": "^7.2.0"
}

## Author

Mehedi Hasan Topu

Portfolio: https://topudev.vercel.app/