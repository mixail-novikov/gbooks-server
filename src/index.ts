import axios from 'axios';
import { GraphQLServer } from "graphql-yoga";
// import { mergeTypes, fileLoader } from 'merge-graphql-schemas';

interface IVolumesArgs {
  q: string;
  filter?: string;
  orderBy?: string;
  printType?: string;
}

interface IHTTPClient {
  get<T>(arg1?: any, arg2?: any): Promise<T>;
}

interface IServerContext {
  client: IHTTPClient
}

const resolvers = {
  Book: {
    title(obj: any) {
      return obj.volumeInfo.title;
    },
    subtitle(obj: any) {
      return obj.volumeInfo.subtitle;
    },
    description(obj: any) {
      return obj.volumeInfo.description;
    },
    image(obj: any) {
      return obj.volumeInfo.imageLinks.smallThumbnail;
    },
    previewLink(obj: any) {
      return obj.accessInfo.embeddable ? obj.volumeInfo.previewLink : null;
    },
    greenLink(obj: any) {
      // NOTE Гугл не отдает это поле в ответе, пытаемся вычислить
      const isbn = obj.volumeInfo.industryIdentifiers[0].identifier;
      const id = obj.id;

      return isbn ? `https://books.google.com/books?isbn=${isbn}` : `https://books.google.com/books?id=${id}`
    }
  },
  Query: {
    volumes: (_: any, { q, printType, orderBy, filter }: IVolumesArgs, { client }: IServerContext) => {
      return client.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q,
          filter,
          orderBy,
          printType
        }
      }).then((response: any) => response.data);
    }
  }
};

const typeDefs = `
type VolumeResponse {
  totalItems: Int
  items: [Book]
}

type Book {
  id: String,
  title: String,
  subtitle: String,
  description: String,
  image: String,
  previewLink: String,
  greenLink: String,
}

type Query {
  volumes(q: String!, filter: String, orderBy: String, printType: String): VolumeResponse
}
`;

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    client: axios
  }
});
server.start(() => console.log("Server is running on localhost:4000"));
