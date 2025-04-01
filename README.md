## User Task Dashboard
this project demonstrate how we solve the problem of missing important task that need to be finished within due date due to poor visibility. 

## Project Overview.
```
├── client          # contains react app
└──  backend        # contains backend stuffs
└── README.md       # Project documentation
```

## Tech Stack
- **Frontend**: React, JavaScript, CSS, axios`react-hot-toast` for notifications.
- **Backend** : Node, express , mongodb , cors , dotenv
- **Real time communication** : Socket
- **Caching** :  Redis in-memory data

## Installation
```bash
  https://github.com/arun-kumar-1995/missed-task-deadline.git
```

## Install dependencies
```bash
cd client
npm install
cd backend
npm install
```

## SAMPLE CONFIG FILE
- create a config file inside configs folder say .env.development haning all the development related credentials
```
# ------------------------------
# Application Configuration
# ------------------------------

PORT=5500

# ------------------------------
# Database Configuration
# ------------------------------


MONGO_URL=mongodb url
DB_NAME=User-Task

JWT_SECRET="taskmanagement" 
TOKEN_EXPIRE=1

#---------------------------
# REDIS 
#----------------------------

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0


#---------------------------
# SESSION
#----------------------------

SESSION_SECRET=f3a1b8c94d2e7a6d3b5e1f

# ------------------------------
# Logging and Debugging
# ------------------------------

LOG_LEVEL=info            
ENABLE_DEBUG=true


# ------------------------------
# FRONTEND REQUEST
# ------------------------------


FRONTEND_URL=http://localhost:5173
```
