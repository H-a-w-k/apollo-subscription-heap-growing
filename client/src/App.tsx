import React, { useEffect } from "react";
import { WebSocketLink } from "@apollo/client/link/ws";
import {
  split,
  HttpLink,
  InMemoryCache,
  ApolloClient,
  gql,
  useQuery,
  ApolloProvider,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache({
  typePolicies: {
    Subscription: {
      fields: {
        booksUpdated: {
          merge: false,
        },
      },
    },
    Book: {
      keyFields: ["id"],
    },
  },
});

const client = new ApolloClient({
  link,
  cache,
});

const query = gql`
  query booksQuery {
    books {
      id
      title
    }
  }
`;

const subscription = gql`
  subscription booksSubscription {
    books: booksUpdated {
      id
      title
    }
  }
`;

const MemoryLeakFinder = () => {
  const { data, subscribeToMore } = useQuery(query);

  useEffect(() => {
    subscribeToMore({
      document: subscription,
    });
    //Add for steeper curve
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // subscribeToMore({
    //   document: subscription,
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <p>Looking for leaks!! {data?.books?.[0]?.title}</p>;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <MemoryLeakFinder></MemoryLeakFinder>
    </ApolloProvider>
  );
}

export default App;
