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

- [App Wireframes](https://balsamiq.cloud/snv27r3/pjqchyn/r2278)

# Scripts

## Testing

### Backend Tests

`yarn test`: When run inside the `/server` directory, runs all backend tests _(work in progress)_

### Frontend Tests

`yarn test`: When run inside the `/client` directory, runs all frontend tests _(work in progress)_

## Running

From the root directory:

`cd client && yarn start`: Runs the frontend client
`cd server && yarn dev`: Runs the backend server

> **Note:** Make sure you delete `node_modules` directories when dependencies change between merges.

# Environment Variables

These reside in the `/server/.env` file, which is not checked into git.

| Variable | Description |
| :------- | :---------- |
| `XXXXX`  | .....       |

## Heroku Variables

Our Heroku backend lives at https://backwoods-tracker.herokuapp.com.

Make sure you define the `JWT_SECRET`, `NODE_ENV` variables in the Heroku dashboard.

## Deployment

The app front-end is deployed on Netlify and the back-end is deployed on Heroku.

### Front-end Deployment

The front-end is deployed via Netlify. For the build settings the base directory is `client`, build command is `yarn build`, publish directory is `client/build`

### Back-end Deployment

TODO: How to set up back-end deployement

# API

TODO: Add sections for different routes

# App Usage & User Story

## User Access

Users are required to sign in to use the app.

## Favorite a stock

## Load reports

## Search for a stock

## Pay for Subscription

1. Go to `Billing` section
2. Fill out payment form
3. Select a plan
4. Click `Buy Now`

## Settings

1. Update your phone number
2. Click `Save`
3. Choose to receive notifications via text or email

# Tech Stack

## Backend Dependencies

### [bcryptjs](https://www.npmjs.com/package/bcryptjs)

Bcrypt is an adaptive hash function which adjusts the cost of hashing, which means that in the future as computers become more powerful, simply increasing the salt rounds will suffice at keeping Main Course secure due to the amount of processing time that would be required to generate all possible password combinations.

### [cors](https://github.com/expressjs/cors)

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers.

### [dotenv](https://github.com/motdotla/dotenv)

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

### [Express](http://expressjs.com/)

A prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability.

### [JSON Web Tokens](https://www.npmjs.com/package/jsonwebtoken)

JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties. JsonWebToken is the implementation for node.js.

# Contributing

Currently we're only accepting PRs from members of our team. Feel free to check back later!

# Issues

If you would like to report an issue, bug, or improvement, please [file an issue](https://github.com/Lambda-School-Labs/labspt2-investor-data-app/issues/new)
