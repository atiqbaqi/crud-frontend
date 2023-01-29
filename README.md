# Front-end client of a CRUD API

This repository is a front-end client built with nodeJS and Ejs a template engine of javascript which consumes a back-end API to perform CRUD operation.

## Installation guide

### 💪🏻 Non-Docker

Required Tools: 
- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads) 

1. You need to install nodejs and its package manager npm.

2. Clone git repository -
    ```bash
    git clone https://github.com/atiqbaqi/crud-frontend.git
    ```

3. Go to the application folder and open a terminal.

4. Install the application dependencies with the next command:
    >npm install

5. Execute the next command in the terminal.
    >npm start

### 🐳 Docker

1. Build image
```bash
docker build -t crud-frontend .
```
2. create container from image and run
```bash
docker run --name crud-frontend --rm -p 8081:8081 crud-frontend
```

<b>Finally access using the following url: <a href="http://localhost:8081" target="__blank">http://localhost:8081</a></b>

## Technologies used

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
<br/>
![EJS](https://img.shields.io/static/v1?label=EJS&message=Javascript%20Template%20Engine&color=green)

## Browsers support

![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=for-the-badge&logo=Firefox-Browser&logoColor=white)
![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![Safari](https://img.shields.io/badge/Safari-000000?style=for-the-badge&logo=Safari&logoColor=white)
![Opera](https://img.shields.io/badge/Opera-FF1B2D?style=for-the-badge&logo=Opera&logoColor=white)

