# Sentiment Analysis App  
  
This is a small React application for sentiment analysis. It allows users to select a sentiment analysis model, input a query, and get the analysis results.  
  
## Features  
  
- Fetch and display sentiment analyzers  
- Initiate sentiment analysis classification
- Display classification status  
- Add new sentiment analysis models  
  
## Getting Started  
  
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.  
  
### Prerequisites  
  
You need to have Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/).  
  
### Installation  
  
1. Clone the repository:  
    ```sh  
    git clone https://github.com/anunomac/mc-genai-frontend-test.git  
    cd mc-genai-frontend-test/app
    ```  
  
2. Install dependencies:  
    ```sh  
    npm install  
    ```  
  
3. Create a `.env` file in the root directory and add your API URL (not necessary for local deployment&tests):  
    ```sh  
    REACT_APP_API_URL=http://your-api-url  
    ```  
  
4. Start the development server:  
    ```sh  
    npm start  
    ```  
  
### Deployment  
  
To create a production build, use:  
```sh  
npm run build  
```  
  
## Usage  
  
- Open the application in your browser.  
- Select a sentiment analysis model.  
- Enter a query and click "Start Analysis".  
- View the classification status.  
  
## API  
  
The application interacts with the following API endpoints:  
  
- `GET /api/models/` - Fetch sentiment analyzers  
- `POST /api/models/` - Add a new sentiment analysis model  
- `POST /api/classifications/` - Initiate sentiment analysis  
- `GET /api/classifications/` - Fetch classification status  
  
