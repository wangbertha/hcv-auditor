<div align="center">
  <h1 align="center">HCV Auditor</h1>
  <div>
    <img
      src="./frontend/src/assets/home-icon.png"
      alt="Project representative icon #1 (in lieu of logo)"
      width="200"
    />
    <img
      src="./frontend/src/assets/profile-icon.png"
      alt="Project representative icon #2 (in lieu of logo)"
      width="200"
    />
  </div>
</div>

## About The Project

This is a web application for the Chicago Area Fair Housing Alliance (CAFHA), a Chicago-based nonprofit, to assess data for fair housing compliance. The user can view high level data on the Home page, and dig into individual data on the Listing pages. From the Listing pages, they can also record decisions and actions taken.

### Languages & Tools

* Frontend:
  * [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
  * [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
  * [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  * [React.js](https://react.dev/)
  * [Google Cloud App Engine](https://cloud.google.com/appengine/) (deployment)
* Backend:
  * [Node.js](https://nodejs.org/en)
  * [Express.js](https://expressjs.com/)
  * [Google Cloud App Engine](https://cloud.google.com/appengine/) (deployment)

The application reads and writes to a database developed with the [HCV Monitor](https://github.com/ikennedy240/hcv_monitor) project. The database is implemented with [PostgreSQL](https://www.postgresql.org/) and deployed with [Google Cloud SQL](https://cloud.google.com/sql/).

## Getting Started

### Create a dummy database to read/write in development mode

1. Download [PostgreSQL](https://www.postgresql.org/download/)

2. Create a PostgreSQL database called hcv_auditor:\
  CLI: `createdb hcv_auditor`

3. Enter the psql command line:\
    CLI: `psql hcv_auditor`

    * You should now see `hcv_auditor=#` in your terminal

4. Create a table in the database called hcv_match with the following columns:\
    CLI: `CREATE TABLE hcv_match (id integer, url text, dateposted text, dateupdated text, title text, body text, status text, reviewer text, exclusionary text, actions_taken text, referred_to text, notes text);`

5. Copy in data from dummy_data.txt:\
    CLI: `\copy hcv_match from '[enter in the absolute path for dummy_data.txt]/dummy_data.txt' delimiter ',' CSV HEADER`

* Note: To exit the psql command line, enter `\q`

### Set up and run the application

1. Clone the repo:

   ```sh
   git clone https://github.com/wangbertha/hcv-auditor.git
   ```

2. Edit `/backend/.env.example` according to the File Setup comments. This connects the backend to the PostgreSQL database.

3. Open two new terminals - one to run the backend, and one to run the frontend.

4. In the first terminal, install backend packages and run:

   ```sh
   cd backend
   npm install
   npm run dev
   ```

5. In the second terminal, install frontend packages and run:

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

6. Open `http://localhost:5173` to view the application.

## Previews

The web application is an internal tool, and the deployment is not available publicly. Check out animations of the application below!

### Home Page

<img
  src="./homepage-demo.gif"
  alt="Animation of Home page features"
  width="600"
/>

Features:

* View all listings that need to be audited
* Access the link to the original listing source
* Sort listings table by column

### Listing Page

<img
  src="./listingpage-demo.gif"
  alt="Animation of Listing page features"
  width="600"
/>

Features:

* View key information on the selected listing
* Easily direct attention to keywords highlighted in the listing text
* Access the link to the original listing source
* Record their audit results and notes into the database
* Navigate to the next listing in the list

## Pending Improvements

* [x] Finalize development and production modes
* [ ] Transpile to TypeScript
* [ ] Refactor Listing page into efficient components
* [x] Refactor dropdown menus into their own component
* [ ] Sync highlighted keywords in Listing page to [HCV Monitor](https://github.com/ikennedy240/hcv_monitor) project
