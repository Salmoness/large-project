# TrivAI

A competitive online trivia game powered by AI.

## Features

- Simple accounts with email validation and password recovery!
- Auatomatically generate quizzes using the power of AI!
- Browse through and host any generated quiz!
- Host quizzes and play with others using an access code!
- Play quizzes with an access code! No account required!
- View live scoreboards!

## Web Application

TrivAI uses the MERN stack.

### Environment File

Create a file named `.env` in the root directory of the project and fill in the following required parameters:

```
MONGODB_URI=
JWT_SECRET=
SENDGRID_API_KEY=
OPENAI_API_KEY=
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

TrivAI uses Flutter for its mobile application.

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
- DigitalOcean (Hosting)
- GoDaddy (Domain)
- Flutter (Mobile)
- Figma (UI Prototyping)
- SendGrid (Email Component)
- NPM (NodeJS Package Manager)

## Contributors

- Zid Daniel
- Dylan Kuneman
- Aaron Maryniewski
- Saymon Rivas
- Ethan Tsillas

## License

MIT License
