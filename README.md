# Netflix Application (movie streaming platform)
![](readmeAsset/dating1.gif)
## How long did it take ?
2 weeks

## challenge accepted ?
- [x] team project (coordination is key to success)
- [x] own local webserver using docker compatible with any os
- [x] no security breaks


## What did I learn ?
  * omniauth login
  * manage a movie torrent api
  * stream the movie while downloading the torrent on server
  * react.js
  * redux
  * node.js
  * bootstrap and templating
  * socket.io
  * implementing working UI fast with react
  * working very fast with deadlines
  * working with team mates


![](readmeAsset/register.gif)

## What is this project ?
This is a movie streaming app that has 3 main features :

### 1. User Features
A user can register. A user can login with various method (facebook / google / 42network). A user can change his information and can upload personnal movies. Users can see other users page.

### 2. Gallery of Movie and Search Engine

![](readmeAsset/search.gif)

### 3. Search Engine (sorting and filtering)
You can search for specific user according to specific tags, geographic proximity, age and fame. You can also sort the selection through these properties.

### 4. Notifications and Chat
Once two users have liked each other (match) their pictures appear in the user selection of the chat page and they can exchange messages (they can chat).
Notification system is in place : a user receives a notification if : 
  * a user consult your profile
  * a user likes your profile
  * a user sends you a message
  * a user dislike your profile

![](readmeAsset/chat.gif)
For more information about the project please see the pdf subject available in french and english at ![subject](https://github.com/nepriel/netflix-42/tree/master/subjects "subject").

### How do I run it on my laptop ?
Edit your `/etc/hosts` file:

```
127.0.0.1   si.hpt.local
127.0.0.1   app.hpt.local
127.0.0.1   mongo.hptdb.local
```

Navigate to frontend

```bash
cd frontend
```

Copy the env variables for developement environment

```bash
cp .env-template .env
```

Navigate to backend

```bash
cd backend
```

Copy the env variables for developement environment

```bash
cp .env-template .env
```

Within the backend path creat a new foldder (if it does not exist)

```bash
mkdir uploads
```

Build the project from the root directory
```bash
docker-compose up --build
```

Within the backend path creat a new foldder (if it does not exist)

```bash
mkdir uploads
```

et voilà ! consult the frontend at this link ![fontend](http://localhost:5000 "localhost").

![alt text](https://github.com/nepriel/dating-site/blob/master/readmeAsset/correction.PNG "result of evaluation of project")
