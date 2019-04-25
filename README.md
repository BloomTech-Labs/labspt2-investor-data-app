<h1 align="center">
  <a href="https://getpickem.co">
    <!-- <img alt="Pickem" src="" width="120" /> -->
    Pick Em
  </a>
      <h3>Automated system that analyzes key financial indicators for beginners and sophisticated investors.</h3>
</h1>

[Pick Em](https://getpickem.co/) is a investor application that makes it easier to research stocks and make better investment decisions. Our easy to use app provides both beginner and sophisticated investors with an automated system that analyzes key financial indicators. Pickem will allow the customer to determine whether a buy signal is warranted.

## Team

<!-- prettier-ignore -->
| [**Stefan Clem**](https://github.com/iepoch) | [**Colin Dismuke**](https://github.com/cpdis) | [**Bruce Cabanayan**](https://github.com/bcabanayan) | [**William Yturralde**](https://github.com/willieino) | [**Rob Salzberg**](https://github.com/robsalzberg) | [**Ryan McLaughlin**](https://github.com/rlmclaughlin) |
|:------------:|:------------:|:-----------:|:-----------:|:-----------:|:-----------:|
| [<img src="https://avatars1.githubusercontent.com/u/7504929?s=400&v=4" width="80">](https://github.com/iepoch) | [<img src="https://avatars2.githubusercontent.com/u/1472001?s=400&v=4" width="80">](https://github.com/cpdis) | [<img src="https://avatars2.githubusercontent.com/u/33612344?s=400&v=4" width="80">](https://github.com/bcabanayan) | [<img src="https://avatars0.githubusercontent.com/u/36480614?s=400&v=4" width="80">](https://github.com/willieino) | [<img src="https://avatars0.githubusercontent.com/u/23406868?s=400&v=4" width="80">](https://github.com/robsalzberg) | [<img src="https://avatars3.githubusercontent.com/u/35788643?s=400&v=4" width="80">](https://github.com/rlmclaughlin) |
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/iepoch) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/cpdis) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/bcabanayan) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/willieino) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/robsalzberg) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/rlmclaughlin) |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/iepoch/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/colindismuke) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/bruce-cabanayan-107757150/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/william-yturralde-601325a3/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/robsalzberg/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/) |

# Quick Start

1. Put your environment variables at `/server/.env`
2. Inside `/server` install all dependencies and spin up the server:
   ```
   $ yarn && yarn start
   ```
3. Inside `/client` install all dependencies and start the front-end:
   ```
   $ yarn && yarn start
   ```

Now just open [http://localhost:3000](http://localhost:3000) to visit the frontend, or query the server endpoints directly at [http://localhost:5000](http://localhost:5000).

# Resources

- [Wireframes](https://balsamiq.cloud/snv27r3/pjqchyn/r2278)

# Scripts

## Testing

### Backend Tests

`yarn test`: When run inside the `/server` directory, runs all backend tests _(work in progress)_

### Frontend Tests

`yarn test`: When run inside the `/client` directory, runs all frontend tests _(work in progress)_

## Running

From the root directory:

`cd client && yarn start`: Runs the frontend client

`cd server && yarn start`: Runs the backend server

> **Note:** Make sure you delete `node_modules` directories when dependencies change between merges.

# Environment Variables

These reside in the `/server/.env` file, which is ignored by `git` for security reasons.

TODO: Add all required environment variables.

| Variable | Description |
| :------- | :---------- |
| `XXXXX`  | .....       |

## Heroku Variables

Our Heroku backend lives at [https://pickemm.herokuapp.com/](https://pickemm.herokuapp.com/).

Make sure you define the `JWT_SECRET` and `NODE_ENV` variables in the Heroku dashboard.

## Deployment

The app front-end is deployed on Netlify and the back-end is deployed on Heroku.

### Front-end Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/3c5e4a27-9835-460d-a3a4-f7d3fa47a6f6/deploy-status)](https://app.netlify.com/sites/pickem/deploys)

The front-end is deployed via Netlify. For the build settings the base directory is `client`, build command is `yarn build`, publish directory is `client/build`

### Back-end Deployment

TODO: How to set up back-end deployement

# API

TODO: Fill our the `req` and `res` columns of the API tables.

## Users Routes

| Method | Endpoint             | Request | Response |
| ------ | -------------------- | ------- | -------- |
| GET    | /api/users           |         |          |
| POST   | /api/users           |         |          |
| GET    | /api/users/:id/:acct |         |          |
| GET    | /api/users/:uid      |         |          |
| PUT    | /api/users/:uid      |         |          |
| DELETE | /api/users/:uid      |         |          |

## Favorites Routes

| Method | Endpoint            | Request | Response |
| ------ | ------------------- | ------- | -------- |
| GET    | /api/favorites      |         |          |
| GET    | /api/favorites/:uid |         |          |
| DELETE | /api/favorites/:uid |         |          |
| PUT    | /api/favorites/:uid |         |          |
| POST   | /api/favorites/:uid |         |          |

## Billing Routes

| Method | Endpoint         | Request | Response |
| ------ | ---------------- | ------- | -------- |
| GET    | /api/billing     |         |          |
| GET    | /api/billing/:id |         |          |
| POST   | /api/billing     |         |          |

## Stripe Routes

| Method | Endpoint    | Request | Response |
| ------ | ----------- | ------- | -------- |
| POST   | /api/stripe |         |          |

# App Usage & User Story

## User Access

Users are required to sign in to use the app.

## Favorite a stock

1. Navigate to the Dashboard.
2. Click on the gold star on one of the stock cards shown at the top of the page.
3. Marvel at it showing in the Favorites section below.

## Search for a stock

1. Navigate to _Reports_. By default AAPL will load.
2. Click in the search box and begin typing the symbol of the company you're looking for.
3. Either press enter or click on the stock symbol you were looking for.
4. Wait as data is retrieved and the charts load.

## Pay for Subscription

1. Navigate to _Billing_.
2. Click _Pay With Card_.
3. Fill out payment form.
4. Click _Pay_.

## Settings

1. Update your phone number.
2. Click _Save_.
3. Choose to receive notifications via text or email.

# Tech Stack

## Backend Dependencies

### [Node.js](https://nodejs.org/en/)

An open-source, cross-platform JS run-time environment that executes JS outside of the browser. Node.js is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability.

### [Express](http://expressjs.com/)

A prebuilt Node.js framework that makes creating server side applications simple, fast, and flexible.

### [PostgreSQL](https://www.postgresql.org/)

PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.

### [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken)

JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties. JsonWebToken is the implementation for node.js.

### [cors](https://github.com/expressjs/cors)

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers.

### [dotenv](https://github.com/motdotla/dotenv)

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

### [faker.js](https://github.com/marak/Faker.js/)

Generates massive amounts of fake data in the browser and node.js.

## Frontend Dependencies

### [React 16 / ReactDOM](https://reactjs.org/)

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

### [React Router](https://www.npmjs.com/package/react-router-dom)

DOM bindings for React Router. Declarative routing for React.

### [React Redux](https://github.com/reduxjs/react-redux)

Official React bindings for Redux. Performant and flexible.

### [Redux](https://redux.js.org/)

A state management tool making it possible to store the entire state of the application in a single store. This means a unidirectional data flow, and as the application scales we have predictable state updates which subsequently make things easier to test and introduce new features. Redux also has solid documentation and an active community, meaning that as new devs become introduced to the project it's likely that any problems they face would have already been encountered by someone else, thus making solutions easy to find.

### [Redux Thunk](https://github.com/reduxjs/redux-thunk)

A middleware that allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. This functionality makes it easier to scale and implement features given diverse needs in a growing project.

### [Firebase](https://firebase.google.com/)

Provides an end-to-end identity solution, supporting email and password accounts, phone auth, and Google, Twitter, Facebook, and GitHub login, and more.

Firebase Authentication integrates tightly with other Firebase services, and it leverages industry standards like OAuth 2.0 and OpenID Connect.

### [axios](https://www.npmjs.com/package/react-axios)

A lightweight, promise-based HTTP client with an intuitive API that makes interfacing with a REST API simple.

### [Stripe](https://stripe.com/docs/)

A powerful, simple, and seamless payment commerce solution.

### [react-stockcharts](https://github.com/rrag/react-stockcharts)

Highly customizable stock charts built with React and D3.

### [react-autosuggest](https://github.com/moroshko/react-autosuggest)

WAI-ARIA compliant autosuggest component built in React.

### [Material-UI](https://material-ui.com/)

React components that implement Google's Material Design.

### [Styled Components](https://www.styled-components.com/docs/)

Has a thriving community and offers the ability to directly style multiple components within a file. The syntax used is familiar to JavaScript and improves code cleanliness and makes it easy to get up and going for those without a lot of css experience. Styled components are also very efficient, improving load time for users.

# Contributing

Currently we're only accepting PRs from members of our team.

# Issues

If you would like to report an issue, bug, or improvement, please [file an issue](https://github.com/Lambda-School-Labs/labspt2-investor-data-app/issues/new).
