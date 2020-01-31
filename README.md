# DevRadar
The purpose of this project is to make it easier to search for developers near your region.
With DevRadar it is possible to filter developers by the technologies they use and find them within a maximum distance of 10km. The developer data is retrieved from Github's public API.

# Features
- Register developers using their data from Github, just by passing their username as a parameter (Web only)
- Search developers filtering by the techlogies they use (Mobile only)
- When you select a developer on the MapView, you can access their Github page inside a WebView
- The maps are loaded in real-time. If a new user is registered and his profile matches the current filter, his profile is shown on the map in real time

# Backend
- Node.js with ExpressJS framework
- MongoDB
- Mongoose
- Axios
- Socket.io (Web Socket Protocol)

# Web
- ReactJS
- Styled Components
- Axios

# Mobile
- Expo
- React Native
- React Navigation
- Axios
- Socket.io Client (Web Socket Protocol)
- MapView (using the device's native maps)
- WebView (to display developers' Github page)

# Run this project
Running this project is really simple, however you need to download some required/recommended tools.
- Visual Studio Code (IDE)
- Yarn or NPM (package managers)
- MongoDB Compass - it is a GUI to manage your MongoDB database. You also need to create a free cluster on https://cloud.mongodb.com/
- Download the app `Expo Client` on App Store (iOS) or Play Store (Android). It will be use to emulate you React Native app.

Once you're done with all those downloads, just open each project (backend, web and mobile folders) and run `yarn install` to get all the required project dependencies.

Follow the steps bellow to run all the clients (backend, web and mobile).

- Backend: access the backend repository typing `cd /backend` then run `yarn dev`. It runs on port `http://localhost:3333`

- Web: access the web repository typing `cd /web` then run `yarn start`. It runs on port `http://localhost:3000`. <br />
<b>IMPORTANT</b>: allow the use of your current location for a better user experience.

- Mobile: access the mobile repository typing `cd /mobile` then run `yarn start`. A new window will open on your default browser
showing a Expo web page. Get the mobile application IP address on the bottom left side and change it on your source code. The file you need to replace the IP is `mobile/services/api.js`. Then go back to your browser and scan the QR Code using your cellphone. If you already have the app `Expo Client` installed, it will immediately notify you to open the app.

# Preview
<p align="center"><img src="https://scontent.fcgh7-1.fna.fbcdn.net/v/t1.0-9/s960x960/82508796_2611496132412683_1196367267764371456_o.jpg?_nc_cat=109&_nc_ohc=RBjs64gffikAX9ZE_Hl&_nc_ht=scontent.fcgh7-1.fna&_nc_tp=1002&oh=24ec6918ed4031578f11eb6d91a8a723&oe=5E9848D0" alt="Demonstração DevRadar mobile" style="width: 100px;height=100px;" /></p>
