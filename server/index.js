const { PubSub, ApolloServer, gql } = require("apollo-server");

const pubsub = new PubSub();
const typeDefs = gql`
  type Book {
    id: Int
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
  type Subscription {
    booksUpdated: [Book]
  }
`;
const books = [
  {
    id: 1,
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
  },
  {
    id: 2,
    title: "Jurassic Park",
    author: "Michael Crichton",
  },
];

const BOOKS_UPDATED = "BOOKS_UPDATED";

let i = 1;

setInterval(() => {
  books[0].title = "Harry Potter and the Chamber of Secrets " + i++;
  pubsub.publish(BOOKS_UPDATED, { booksUpdated: books });
}, 500);

const resolvers = {
  Query: {
    books: () => books,
  },
  Subscription: {
    booksUpdated: {
      subscribe: () => pubsub.asyncIterator([BOOKS_UPDATED]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      // check from req
      const token = req.headers.authorization || "";

      return { token };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
