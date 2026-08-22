# 🧭 Yatri — Intelligent Travel Planning Platform

> Plan smarter. Travel better. Understand every decision.

Yatri is a full-stack intelligent travel planning platform designed to help users discover destinations, build personalized itineraries, manage trips, understand travel budgets, and make better travel decisions using AI-powered intelligence.

Instead of being just a destination search or itinerary generator, Yatri brings **trip planning, budgeting, destination discovery, travel intelligence, collaboration, and AI assistance** into a single platform.

---

## 🚀 Why Yatri?

Planning a trip usually requires switching between multiple applications:

- Destination discovery
- Hotel and activity research
- Itinerary creation
- Budget calculation
- Trip management
- Reviews and recommendations
- Group planning
- AI assistance

This creates fragmented planning and makes it difficult to understand the consequences of travel decisions.

### Yatri solves this by providing a unified travel workspace.

Users can:

1. 🔎 Discover destinations
2. 🗺️ Plan trips
3. 📅 Build itineraries
4. 💰 Understand travel budgets
5. 🧠 Analyze trip decisions
6. 🤖 Get AI-powered assistance
7. 👥 Collaborate with other travelers
8. ⭐ Review and explore experiences
9. 📊 Manage their trips from one platform

---

# ✨ Key Features

## 🔎 Destination Discovery

Explore destinations and discover useful travel information from a centralized interface.

Users can search for destinations and explore destination-related information before adding them to their travel plans.

---

## 🗺️ Intelligent Trip Planner

Create and manage trips through an interactive planning interface.

Users can define:

- Destination
- Travel dates
- Activities
- Experiences
- Budget
- Trip preferences

The planner organizes this information into a structured itinerary.

---

## 📅 Itinerary Management

Build a day-by-day travel plan.

An itinerary can contain:

- Destinations
- Activities
- Experiences
- Travel information
- Budget considerations

The goal is to make trip planning structured rather than maintaining disconnected notes.

---

## 💰 Budget Intelligence

Yatri provides budget-oriented travel intelligence to help users understand how their travel choices affect their overall trip.

The platform can be extended to consider:

- Transportation
- Accommodation
- Activities
- Food
- Experiences
- Available budget

This helps users make more informed decisions instead of simply calculating a final number.

---

## 🧠 Trip Intelligence

Yatri includes an intelligence layer designed to help travelers understand the consequences of their decisions.

Current intelligence components include:

- Experience Budget
- Health Gauge
- Regret Radar
- Trip Debt
- Domino Simulation

These components are designed to make travel planning more decision-oriented.

### Example

Instead of simply saying:

> "Add another activity."

Yatri can help users understand:

> "Adding this activity may increase cost and reduce available recovery time."

This turns itinerary planning into **decision support**.

---

## 🤖 AI Travel Assistant

Yatri integrates AI capabilities to assist users with travel-related tasks.

The backend includes dedicated AI/Gemini routes for integrating AI functionality into the platform.

Possible AI-assisted workflows include:

- Travel recommendations
- Trip planning assistance
- Destination suggestions
- Itinerary improvements
- Travel-related questions

---

## 👥 Group Travel

Traveling with multiple people introduces additional planning challenges.

Yatri provides functionality that can support group-oriented planning and decision making.

The architecture includes dedicated group-related pages and intelligence components.

---

## ⭐ Reviews & Experiences

The backend provides routes for handling travel reviews and experience-related information.

This allows the platform to incorporate user-generated travel information into the travel planning experience.

---

# 🏗️ System Architecture

Yatri follows a full-stack architecture.

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │                     │
                         │ Pages               │
                         │ Components          │
                         │ Context             │
                         │ Services            │
                         └──────────┬──────────┘
                                    │
                              API Requests
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Node/Express      │
                         │      Backend        │
                         │                     │
                         │ server.ts           │
                         │                     │
                         │ API Routes          │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
        Travel APIs             AI/Gemini             Storage
        & Services              Services              Layer



###🛠️ Tech Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
React Router
Lucide React
Backend
Node.js
Express
TypeScript
REST APIs
AI
Google Gemini API
Development
Git
GitHub
npm        
        
### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repository-url>
cd Yatri
npm install
```

If required:

```bash
npm install react-router-dom
```

### Run Locally

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Demo Flow

1. Explore available destinations.
2. Open a destination to view its details.
3. Select the number of travelers.
4. Review the estimated trip cost.
5. Create the trip.
6. Continue to the trip planning page.
7. Build and analyze the itinerary.

## Hackathon Value

Yatri improves travel planning by connecting discovery, planning, budgeting, and decision-making in a single user experience. Instead of providing only destination suggestions, it helps users understand how their choices affect the complete trip.

## Future Scope

- AI-generated itineraries
- User authentication and cloud storage
- Live weather and currency data
- Flight and hotel integrations
- Collaborative trip planning
- Expense tracking and trip sharing

## License

This project is licensed under the MIT License.
