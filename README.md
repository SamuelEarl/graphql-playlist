# What is this repo?
This is the code that I wrote while following this GraphQL, React, Express, and MongoDB  tutorial: https://www.youtube.com/playlist?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f.

That tutorial was created before React Hooks came about, but my code has been updated to use React Hooks.


# Run the app
In a terminal, `cd` into the the `server` directory and run `npm start`. This will run the Express server and the GraphQL server. Then open another terminal and `cd` into the `client` directory and run `npm start` again. This will run the React development server. Open a browser and go to `http://localhost:3000/` to view the app.

The `.env` has a `DATABASE_URL` variable with a URL string from mLab. So to get this app to work, you will have to create a MongoDB instance somewhere like mLab or MongoDB Atlas. Then you will have to create a `.env` file and include a `DATABASE_URL` variable that points to your MongoDB instance.
