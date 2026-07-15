# AI CRM HCP

AI CRM HCP is a healthcare field-force CRM built for the assignment workflow around:

- Managing healthcare professionals
- Logging interactions with AI-assisted extraction
- Saving and editing interaction records
- Tracking follow-ups in a clean dashboard

## Tech Stack

- Frontend: React, Vite, Material UI, React Router
- State: React hooks, Redux toolkit scaffold
- Backend: FastAPI
- Database: PostgreSQL with SQLAlchemy
- AI: LangGraph, Groq

## What the app covers

### Dashboard

- Summary cards for HCP count, total interactions, today’s interactions, and pending follow-ups
- Recent interaction preview
- Quick navigation to the main workflows

### HCP management

- List HCPs with search
- Create new HCP
- Edit HCP details
- Delete HCP records

### Interaction logging

- Select an HCP
- Enter a structured interaction manually
- Use the AI assistant to extract:
  - doctor name
  - products discussed
  - summary
  - next follow-up
  - sentiment
- Save interaction
- Save and add another
- Edit saved interactions from history

### Follow-up and history

- View all logged interactions
- Search by doctor, product, sentiment, or summary
- Open an interaction for edit

## API Overview

### HCP

- `GET /api/hcps/`
- `POST /api/hcps/`
- `GET /api/hcps/{id}`
- `PUT /api/hcps/{id}`
- `DELETE /api/hcps/{id}`

### Interactions

- `GET /api/interactions/`
- `GET /api/interactions/history`
- `GET /api/interactions/{id}`
- `POST /api/interactions/`
- `PUT /api/interactions/{id}`

### Dashboard

- `GET /api/dashboard/stats`

## Local setup

### Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and backend at `http://127.0.0.1:8000`.

## Assignment implementation notes

- The interaction history route is now separate from the dynamic interaction detail route, so history loads correctly.
- The interaction screen supports both save and update workflows.
- The saved interaction flow now includes a clear action bar for save, reset, and save-and-add-another.
- The history screen links directly into edit mode for each interaction.

## Status

This repo now has a completed working implementation for the main assignment flow with cleaner navigation and UI.
