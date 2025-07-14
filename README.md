# Trivia Game

A competitive online trivia game.

## Features

- Simple accounts with email validation and password recovery!
- Generate quizzes with the power of AI!
- Browse previously generated quizzes!
- Host quizzes and share them with an access code!
- Play quizzes with an access code! No account required!
- View live quiz scoreboards!

## Web Application

Trivia Game uses the MERN stack.

### Environment File

Create a file named `.env` in the root directory of the project and fill in the following required parameters:

```
MONGODB_URI=
JWT_SECRET=
EMAIL_USER=
EMAIL_PASSWORD=
```

### Deployment Instructions

From the root directory of the project:

Run `cd /frontend && npm install && npm run build` and copy the contents of `/frontend/dist` to `/var/www/html` on a web server of your choice.

To start the backend server: `cd /backend && npm install && npm start`

### Development Instructions

From the root directory of the project:

To start the backend server: `cd /backend && npm install && npm start`

To start the frontend server: `cd /frontend && npm install && npm run dev`

## Mobile Application

Trivia Game uses Flutter for its mobile application.

### Deployment Instructions

From the root directory of the project:

Run `cd /mobile && flutter pub get && flutter build apk` to create an APK.

### Development Instructions

From the root directory of the project:

Run `cd /mobile && flutter pub get && flutter run -d chrome` to emulate the mobile application in Chrome. You can replace `chrome` with a device from `flutter devices`.

## Technologies Used

- TeamGantt (Gantt Chart)
- GitHub (Version Control)
- Discord (Team Communication)
- SwaggerHub (API Testing)
- MongoDB (Database)
- React (Web UI)
- Material Design (UI Components)
- ExpressJS (API)
- NodeJS (Web Server)
- OpenAI (AI Integration)
- Heroku (Hosting and Domain)
- Flutter (Mobile UI)
- Figma (UI Prototyping)
- NodeMailer (Email Component)
- Gmail (Email Provider)
- NPM (NodeJS Package Manager)

## Contributors

- Zid Daniel
- Dylan Kuneman
- Aaron Maryniewski
- Saymon Rivas
- Ethan Tsillas

## License

MIT License
