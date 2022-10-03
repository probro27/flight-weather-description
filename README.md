# OpenAI API - Flight Weather Description Generator

## Usage

- Go the web interface [here](https://flight-weather-description.vercel.app/). 
- Get weather codes from [here](https://flightplanning.navcanada.ca/cgi-bin/Fore-obs/metar.cgi). 
- Input the weather codes in the web interface. 
- Read the description. 

## To contribute

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd flight-weather-description
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   ```bash
   $ cp .env.example .env
   ```

6. Add your [API key](https://beta.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! For the full context behind this example app, check out the [tutorial](https://beta.openai.com/docs/quickstart).
