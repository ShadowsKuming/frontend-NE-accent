
# Presentable Game (Vue.js Frontend)

This project is the frontend for the "Presentable Game" web application, built with Vue.js. It interacts with a SpringBoot backend.

## Project Structure

```plaintext
.idea/
node_modules/
presentable-game/
  ├── public/
  └── src/
      ├── assets/
      ├── components/
      │   └── TermsOfUse.vue
      ├── router/
      │   └── index.js
      ├── utils/
      └── views/
          ├── GameView.vue
          ├── HomeView.vue
          ├── PersonalInformation.vue
          ├── RankingView.vue
          └── ResultView.vue
      ├── App.vue
      ├── main.js
.gitignore
babel.config.js
jsconfig.json
package.json
package-lock.json
README.md
vue.config.js
```

This project contains the following key components:
- **HomeView.vue**: The home page view.
- **GameView.vue**: The main game interface.
- **PersonalInformation.vue**: User information page.
- **RankingView.vue**: Displays the ranking of players.
- **ResultView.vue**: Shows the results of the game.
  
## Getting Started

To get started with this project, follow these steps:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine (recommended version >= 12).

### Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd presentable-game
npm install
```

### Running the Development Server

To start the development server, use the following command:

```bash
npm run serve
```

By default, the development server will run on port **8080**. You can access the app at `http://localhost:8080`.

### Changing the Default Port

If you wish to run the development server on a different port, you can configure the port in the `vue.config.js` file:

```javascript
module.exports = {
  devServer: {
    port: 8080 // Change this to your desired port
  }
};
```

### Backend (SpringBoot)

This Vue.js frontend connects to a backend built with SpringBoot. Make sure your SpringBoot server is running and accessible before starting the frontend. You may need to adjust API endpoint URLs in the frontend if the backend is hosted on a different URL or port.

### Deployment

To build the project for production:

```bash
npm run build
```

This will generate the optimized production files in the `dist/` directory. You can serve these files on any static file server.

## Additional Notes

- Ensure the backend SpringBoot server is correctly configured with CORS settings to allow requests from the frontend.
- For production, you may want to set up environment variables to manage API base URLs or other sensitive data. Refer to Vue's documentation for environment configuration.

## License

This project is licensed under the MIT License.
