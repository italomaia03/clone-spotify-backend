
# Backend for Spotify Clone

This code consists of an activity performed in discipline of Software Projects II.

This is a REST API performs CRUD and authentication operations.


## Table of Contents
* [Technologies](#technologies)
* [Installation](#technologies)
* [Running](#running-locally)
## Technologies

Project created using:

* Express: 4.18.2
* Typescript: 5.0.4
* NodeJS: 18.16.0
* Sequelize-Typescript: 2.1.5
* Sqlite3: 5.1.6
* Jsonwebtoken: 9.0.0



## Installation
It is necessary to have SQLite3 previously installed in your machine.

You can clone this repository.

Running the project requires the installation of NodeJS and NPM. You can get those in the following link:

* [Node Instalation](https://nodejs.org/en)

Give preference to the LTS versions available to your Operating System (Windows, Linux, MacOS, etc.).

### Clonning the repository

Perfoming repository clonning requires to install Git in your machine. 

Access the following link and read the instructions to perform Git installation in case you do not have it.

```
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
```

Get the SSH key below:

```
git@github.com:italomaia03/compass-challenge-week4.git
```

Then, run the following commands:

**Bash**
```bash
  cd ~/[folder-of-choice]/

  git clone git@github.com:italomaia03/clone-spotify-backend.git

  cd ~/[folder-of-choice]/clone-spotify-backend

  npm install
```
**CMD/Powershell**
```powershell
  cd C:\[folder-of-choice]

  git clone git@github.com:italomaia03/clone-spotify-backend.git

  cd C:\[folder-of-choice]\clone-spotify-backend

  npm install
```
Now, all the dependencies are in place and the app is ready to run.
## Running locally

After performing the instalation, run the following command to run the application:

```bash
  tsc
  node dist/app.js
```
or simply:

```bash
  npm run serve
```
By default, the application will run on PORT 3000. If you have another service running on this PORT, you can assign a free port to run the application. The commands are as follow:

**Bash**
Example
```bash
  PORT=5000 npm run serve
```
**CMD**
```bash
  set PORT=5000 (for example)
  npm run serve
```
**Powershell**
```bash
  $env:PORT=5000 (for example)
  npm run serve
```
