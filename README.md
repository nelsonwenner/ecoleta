<p align="center">
  <img alt="Ecoleta" src="./frontend/src/assets/logo.svg" />
</p>

<h1 align="center">A technological method for trash collection</h1>

<blockquote align="center">
A application developed at Next Level Week promoted by <a href="http://github.com/rocketseat">Rocketseat</a>
</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/nelsonwenner/ecoleta?color=%2304D361">

  <a href="https://github.com/nelsonwenner">
    <img alt="Made by @nelsonwenner" src="https://img.shields.io/badge/made%20by-%40nelsonwenner-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/nelsonwenner/ecoleta/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/nelsonwenner/ecoleta?style=social">
  </a>
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/40550247/88659849-18f6c800-d0ac-11ea-8c40-f3648726b915.png" />
</div>

## :rocket: Technologies

* [ReactJS](https://reactjs.org/)
* [Node](https://nodejs.org/en/)
* [Knex](http://knexjs.org/)

## :electric_plug: Prerequisites

- [Node.js LTS (>= 12.x)](https://nodejs.org/)

## :information_source: Getting Started

1. Fork this repository and clone it on your machine.
2. Change the directory to `ecoleta` where you cloned it.

## :closed_lock_with_key: Getting started the API Restful backend

```shell
/* After clone this repo, enter in the API folder */
$ cd backend

/* Create `.env` of the system */
$ cp .env.example .env

/* Install dependencies */
$ npm install

/* Run the migrations and seeds */
$ npm run knex:migrate && npm run knex:seed

/* Run the development server /*
$ npm run dev
```
  * Open backend, the host [localhost:3333](http://localhost:3333) 

## :computer: Getting started the web application

```shell
/* After clone this repo, enter in the Web folder */
$ cd frontend

/* Create `.env` of the system */
$ cp .env.example .env

/* Install dependencies */
$ npm install

# Run the project
$ npm start
```
  * Certify yourself that the backend is running on [localhost:3333](http://localhost:3333), Open frontend, the host [localhost:3000](http://localhost:3000) 

## :memo: License
This project is under the MIT license. See the [LICENSE](LICENSE.md) for more information.

---
