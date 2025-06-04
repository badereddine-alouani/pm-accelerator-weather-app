Great! Here's the **improved and finalized version** of your `README.md`, customized for use with **npm only** and polished for clarity and professionalism:

---

# Weather App Frontend

A full-featured **Next.js** frontend application built for the **PM Accelerator Technical Assessment**. It allows users to fetch and manage real-time weather data, save records, and export data—all with a clean, modern UI.

---

## 🌟 Features

- 🔍 **Location Input**: Search by city name, zip code, or GPS coordinates
- ☀️ **Real-Time Weather**: Fetch current conditions and a 5-day forecast using the **OpenWeatherMap API**
- 📝 **CRUD Operations**: Create, read, update, and delete saved weather records
- 📤 **CSV Export**: Download stored weather data
- 🧩 **ShadCN UI**: Accessible, modern components with **Tailwind CSS** styling
- ⚠️ **Error Handling**: Clear feedback and input validation
- 📌 **PM Accelerator Info**: Includes a description and link to the program

---

## 🔧 Prerequisites

- **Node.js** (version 18 or later)
- **npm**
- Backend API running and accessible at the configured base URL
- **OpenWeatherMap API Key**

---

## 🛠️ Environment Setup

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

### 🔑 Get Your OpenWeatherMap API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up and log in
3. Generate a new API key under your account
4. Paste it in your `.env.local` file

---

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd weather-app-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. Visit [http://localhost:3000](http://localhost:3000)

---

## 📡 Backend API Specification

The app expects the following endpoints to be available at `NEXT_PUBLIC_API_BASE_URL`:

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | `/api/weather`     | Get all weather records |
| POST   | `/api/weather`     | Create new record       |
| PUT    | `/api/weather/:id` | Update existing record  |
| DELETE | `/api/weather/:id` | Delete a weather record |

### 📄 Expected Record Schema

```json
{
  "id": "string",
  "location": "string",
  "startDate": "string (ISO format)",
  "endDate": "string (ISO format)",
  "temperature": "number",
  "description": "string",
  "humidity": "number",
  "windSpeed": "number",
  "createdAt": "string (ISO format)"
}
```

---

## 📘 Usage Guide

1. **Add Weather Data**

   - Enter a location and date range
   - Click "Fetch Weather"
   - Review the data, then "Save"

2. **View & Manage Records**

   - View all saved weather records
   - Edit or delete as needed

3. **Export to CSV**

   - Click "Export CSV" to download your data

4. **PM Accelerator Info**

   - Click the "About" button to learn about the internship program

---

## 🧱 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **ShadCN UI + Tailwind CSS**
- **Lucide React** (icons)
- **OpenWeatherMap API**

---
