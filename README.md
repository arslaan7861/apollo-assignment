# 🩺 Doctor Listing Page – Internship Assignment

## Project Overview

This project is a destination page clone built using **Next.js** that displays a list of doctors. It features dynamic filtering, pagination, and server-side data fetching through RESTful APIs. Designed with scalability and modularity in mind, it is part of an internship assignment to demonstrate front-end and back-end integration capabilities.

---

## 🔧 Technologies Used

| Layer    | Tech Stack                                     |
| -------- | ---------------------------------------------- |
| Frontend | Next.js (React + TypeScript)                   |
| Styling  | Tailwind CSS                                   |
| Backend  | Node.js + Express + MongoDB                    |
| APIs     | REST (`add-doctor`, `list-doctor-with-filter`) |

---

## ✅ Features

- Doctor listing with pagination
- Filtering by city, experience, specialization, etc.
- Modular, reusable React components
- Server-side API integration using MongoDB
- SEO-optimized destination page (`/specialties/general-physician-internal-medicine`)
- Graceful fallback for no results

---

## 🗂️ Key Files & Structure

```
├── app/
│   └── page.tsx              # Entry page with SSR doctor listing
├── components/
│   ├── DoctorCard.tsx        # Displays individual doctor info
│   └── Pagination.tsx        # Pagination component
├── pages/api/
│   ├── add-doctor.ts         # POST API to add doctor
│   └── list-doctor-with-filter.ts # GET API with filters and pagination
├── lib/
│   └── db.ts                 # MongoDB connection handler
├── types/
│   └── doctor.ts             # TypeScript interface for doctor model
└── .env.example              # Example environment file
```

---

## ⚙️ Environment Variables

Before running the project, create a `.env` file based on `.env.example`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
```

Replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB Atlas credentials.  
Alternatively, for local MongoDB:

```env
MONGO_URI=mongodb://localhost:27017/doctorDB
```

---

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/arslaan7861/apollo-assignment.git
cd apollo-assignment
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

```bash
cp .env.example .env
# Edit .env and fill in your MongoDB URI
```

4. **Run the app:**

```bash
npm run dev
```

Visit `http://localhost:3000` to view the destination page clone.

---

## 📬 Contact

Feel free to reach out if you have any questions or feedback.

**[Your Full Name]**  
**[Your Email / LinkedIn / GitHub]**
