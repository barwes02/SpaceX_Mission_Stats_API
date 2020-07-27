const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const cors = require("cors");
const schema = require("./schema");

const app = express();

// Allow cross-origin
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // Disable in production
    graphiql: true
  })
);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Servr started on port ${PORT}`));
