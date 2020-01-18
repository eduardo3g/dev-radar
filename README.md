# DevRadar
The purpose of this project is to make it easier to search for developers near your region.
With DevRadar it is possible to filter developers by technologies they use and find them in a distance of up to 10km. The developers' data
are retrieved from Github's public API.

# Features
- Registers developers using their data from Github, just by passing their username (Web only)
- Search by developers filtering by the techlogies they use (Mobile only)
- When you select a developer in the MapView, you can access their Github page inside a WebView
- The maps are loaded in real-time. If a user is registered and his profile matches the current filter, his profile is shown on the map
in real time

# Backend
- Node.js with ExpressJS framework
- MongoDB
- Mongoose
- Socket.io (Web Socket Protocol)

# Web
- ReactJS
- Styled Components

# Mobile
- Expo
- React Native
- React Navigation
- Socket.io Client (Web Socket Protocol)
- MapView (using the device's native maps)
- WebView (to display developers' Github page)

# Run this project
Running this project is really simple, however you need to download some required tools.
- Visual Studio Code (IDE)
- Yarn ou NPM (package managers)
- MongoDB Compass - it is a GUI to manage your MongoDB database. You also need to create a free cluster on https://cloud.mongodb.com/
- Download the app `Expo Client` on App Store (iOS) or Play Store (Android)

Once you're done with all those downloads, just open the project and run `yarn install` to get all the required project dependencies.
Follow the steps bellow to run all the clients (backend, web and mobile)

- Backend: access the backend repository typing `cd /backend` then run `yarn dev`. It runs on port `http://localhost:3333`
- Web: access the web repository typing `cd /web` then run `yarn start`. It runs on port `http://localhost:3000`
- Mobile: access the mobile repository typing `cd /mobile` then run `yarn start`. A new window will open using your default browser
showing a Expo web page. Get the IP Address on the bottom left side and change it on your source code. The file you need to replace
the IP is `mobile/services/api.js`. On `baseURL` you need to use YOUR IP address.
