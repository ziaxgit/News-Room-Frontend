# [News Room](https://zias-news.netlify.app/)

Welcome to the News Room! A fully responsive news website built using React.js, styled with CSS and Material UI. This web application features a homepage with a list of articles that can be filtered by topics and sorted by different factors. Contains individual article pages for users to read the content and allows voting functionality. Users can participate in discussion of an article by posting or deleting comments. 

It consumes data from the [News Room API](https://github.com/ziaxgit/News-Room-API), which is hosted separately on the backend.

## [Click here to view live demo](https://zias-news.netlify.app/)

### Screenshots
![image](https://github.com/ziaxgit/News-Room-Frontend/assets/112583896/28a92733-432f-4377-929a-3e16218b0ea2)
![Screenshot from 2024-05-11 20-26-14](https://github.com/ziaxgit/News-Room-Frontend/assets/112583896/b460fa41-a440-4e11-9c59-8a040d3aad61)
![Screenshot from 2024-05-11 20-29-18](https://github.com/ziaxgit/News-Room-Frontend/assets/112583896/a2873ef9-0d99-49c9-8d69-2c72ec0c1645)
![Screenshot from 2024-05-11 20-26-32](https://github.com/ziaxgit/News-Room-Frontend/assets/112583896/6e9afcd2-2992-4476-9fda-e6aff2d8cf96)
![Screenshot from 2024-05-11 20-26-49](https://github.com/ziaxgit/News-Room-Frontend/assets/112583896/5281aabc-487a-4aa8-bd44-81c29dc23212)

This project aims to demonstrate some of the skills learnt in front end part of the Northcoders bootcamp, mostly dedicated to React subjects including:

-   React Virtual DOM
-   React Lifecycle
-   React Routing
-   Optimistic Rendering
-   Error Handling
-   API requests and handling/displaying response data

## How to Use

1. Upon visiting the app, you'll see a list of articles displayed on the homepage. You can click on any article to view its details, including the full content and comments.
2. To interact with the articles, you can upvote or downvote them by clicking the respective buttons.
3. You can also post your comments on an article by navigating to the article details page and using the comment form at the bottom.
4. To explore different topics, you can use the navigation bar at the top, which lists all available topics. Clicking on a topic will filter the articles based on the selected category.

**Errors**

Bad route errors result in the relevant 400/404 page.

Bad requests include:

-   Page route does not exist
-   Topic does not exist
-   Article Id does not exist

API errors result in the API error status code and message being displayed to the user.

## Running the Project Locally

First ensure you have the following installed:

- Node.js (Minimum version required: 16.0.0)

You can check your Node version by running the following command in your terminal:

```bash
node --version
```

To run the News Room on your local machine, follow these steps:

1. Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/ziaxgit/News-Room-Frontend.git
```

2. Navigate to the project directory:

```bash
cd News-Room-Frontend
```

3. Install the required dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. The app should now be running on your local server at `http://localhost:3000`.

Now, you can play around with the app locally and test its features.

Please note that the app will make API requests to the backend, so make sure the backend server is also running and accessible.

If you encounter any issues or have any questions, feel free to raise an issue on the GitHub repository. Happy coding!
