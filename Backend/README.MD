# 📘 Backend for App

- [`📚 Root`](../README.md)/[`📕 Frontend`](../Frontend/README.MD)/
- [`📚 Root`](../README.md)/`📘 Backend`/

## 📖 Table of Contents

- [📘 Backend for App](#-backend-for-app)
  - [📖 Table of Contents](#-table-of-contents)
  - [👀 Motivation 🔝](#-motivation-)
  - [🧰 Technology Stack 🔝](#-technology-stack-)
  - [🤵‍♂️ Team communication channels 🔝](#️-team-communication-channels-)
  - [🧑‍💻 Developer Teams 🔝](#-developer-teams-)
  - [🗃️ Project info 🔝](#️-project-info-)
    - [📚 License 🔝](#-license-)
    - [📚 Workspaces 🔝](#-workspaces-)
    - [📚 Deploy 🔝](#-deploy-)
  - [🛠️ Requirements 🔝](#️-requirements-)
    - [1. Clone the repository from GitHub](#1-clone-the-repository-from-github)
    - [2. Navigate to the backend folder](#2-navigate-to-the-backend-folder)
    - [3. Install the necessary dependencies](#3-install-the-necessary-dependencies)
    - [4 In the backend folder, create a .env file](#4-in-the-backend-folder-create-a-env-file)
    - [5. Add the following keys to the .env file](#5-add-the-following-keys-to-the-env-file)
    - [6. Run the following command to start the server](#6-run-the-following-command-to-start-the-server)
    - [7. Open your browser and navigate to http://localhost:3001/api/v1/docs](#7-open-your-browser-and-navigate-to-httplocalhost3001apiv1docs)
  - [🎚️ Scripts 🔝](#️-scripts-)
  - [🩻 Progress Report on Router Development 🔝](#-progress-report-on-router-development-)
    - [✨ Root Base](#-root-base)
    - [✨ Start Route 🔝](#-start-route-)
    - [⛔ Invalid Route 🔝](#-invalid-route-)
    - [📑 Docs Route 🔝](#-docs-route-)
    - [🔐 Authorization Routes 🔝](#-authorization-routes-)

## 👀 Motivation [🔝](#-backend-for-app)

Elegimos utilizar Python junto con PostgreSQL para el backend de nuestra aplicación de recursos humanos porque estas tecnologías nos ofrecen una solución robusta y escalable. Python es conocido por su legibilidad y facilidad de uso, lo que acelera el desarrollo y permite a nuestro equipo implementar nuevas funcionalidades rápidamente. Por otro lado, PostgreSQL, como una de las bases de datos relacionales más avanzadas, proporciona una gestión eficiente y segura de datos, garantizando la integridad y consistencia necesaria en la administración del talento humano. Esta combinación nos permite construir una plataforma confiable y flexible, capaz de adaptarse a las necesidades cambiantes del proyecto.

## 🧰 Technology Stack [🔝](#-backend-for-app)

[![Python Link](https://img.shields.io/badge/Python-%20%233776AB?style=for-the-badge&logo=Python&logoColor=%23FFFFFF 'Python Link')](https://www.python.org/) [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](#) [![Django](https://img.shields.io/badge/Django-%23092E20.svg?logo=django&logoColor=white&style=for-the-badge)](#) [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff&style=for-the-badge)](#)

## 🤵‍♂️ Team communication channels [🔝](#-backend-for-app)

[![Slack Link](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white "Slack Link")](https://slack.com) [![Discord Link](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white "Discord Link")](https://discord.com) [![LinkedIn Link](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white "LinkedIn Link")](https://linkedIn.com) [![Github Link](https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white 'Github Link')](https://github.com/No-Country-simulation/s18-03-m-python-react)

## 🧑‍💻 Developer Teams [🔝](#-backend-for-app)

| ![Avatar](https://avatars.githubusercontent.com/u/139293883?s=96&v=4) |![Avatar](https://avatars.githubusercontent.com/u/162047014?s=96&v=4) |
|:-:|:-:|
| **Anthony Bañon** | **Juan Novas**  |
| [![Github Link](https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white 'Github Link')](https://github.com/anthonybanion)[![LinkedIn Link](https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white 'LinkedIn Link')](https://www.linkedin.com/in/anthonybanion/) | [![Github Link](https://img.shields.io/badge/github-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white 'Github Link')](https://github.com/JuanNovas)[![LinkedIn Link](https://img.shields.io/badge/linkedin%20-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white 'LinkedIn Link')](https://www.linkedin.com/in/juan-novas/) |

## 🗃️ Project info [🔝](#-backend-for-app)

### 📚 License [🔝](#-backend-for-app)

| License | [![License Link](https://img.shields.io/badge/MIT-FF0000?style=for-the-badge&logo=amazoniam&logoColor=white "License Link")](./LICENSE.MD) |
| :-----: | :----------------------------------------------------------------------------------------------------------------------------------------: |

### 📚 Workspaces [🔝](#-backend-for-app)

|     Name     |   Path   |     Description      |
| :----------: | :------: | :------------------: |
| `🎛️ Backend` | /backend | application Back-End |

### 📚 Deploy [🔝](#-backend-for-app)

| Description |                                                                                 Deploy                                                                                 |                                link                                 |
| :---------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------: |
|   Backend | Por desplegar | Sin enlace |
|  Data Base | Por desplegar | Sin enlace |

## 🛠️ Requirements [🔝](#-backend-for-app)

Make sure you have **Docker** installed. If you don't have it, click [here](https://www.docker.com) to go to the official site and download it.

### 1. Clone the repository from GitHub

```sh
git clone https://github.com/No-Country-simulation/s18-03-m-python-react.git
```

### 2. Navigate to the backend folder

```sh
cd s18-03-m-python-react
```

### 3. Execute the container

```sh
docker-compose up -d --build
```

### 4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)


### ✨ Root Base

[http://localhost:3000](http://localhost:3000)

### ✨ Start Route [🔝](#-backend-for-app)

| Method | Router  | Endpoint | Documentation | Api Key | Token |
| :----: | :-----: | :------: | :-----------: | :-----: | :---: |
|  Get   |    /    |    ✔️    |      ❌       |   ❌    |  ❌   |
|  Get   |  /api   |    ✔️    |      ❌       |   ❌    |  ❌   |
|  Get   | /api/v1 |    ✔️    |      ❌       |   ❌    |  ❌   |

### ⛔ Invalid Route [🔝](#-backend-for-app)

| Method | Router | Endpoint | Documentation | Api Key | Token |
| :----: | :----: | :------: | :-----------: | :-----: | :---: |
|  Get   |  /\*   |    ✔️    |      ✔️       |   ❌    |  ❌   |

### 📑 Docs Route [🔝](#-backend-for-app)

| Method |    Router    | Endpoint | Documentation | Api Key | Token |
| :----: | :----------: | :------: | :-----------: | :-----: | :---: |
|  Get   | /api/v1/docs |    ✔️    |      ✔️       |   ❌    |  ❌   |

### 🔐 Authorization Routes [🔝](#-backend-for-app)

| Method |     Router     | Endpoint | Documentation | Api Key | Token |
| :----: | :------------: | :------: | :-----------: | :-----: | :---: |
|  Get   | /user/profile  |    ✔️    |      ✔️       |   ✔️    |  ✔️   |
|  Post  | /user/register |    ✔️    |      ✔️       |   ✔️    |  ❌   |
|  Post  |  /user/login   |    ✔️    |      ✔️       |   ✔️    |  ❌   |
