interface IHTTPClient {
  get<T>(arg1?: any, arg2?: any): Promise<T>;
}

interface IServerContext {
  client: IHTTPClient;
}

interface IVolumesArgs {
  q: string;
  filter?: string;
  orderBy?: string;
  printType?: string;
}

export default {
  Query: {
    volumes: (
      _: any,
      { q, printType, orderBy, filter }: IVolumesArgs,
      { client }: IServerContext
    ) => {
      return client
        .get("https://www.googleapis.com/books/v1/volumes", {
          params: {
            q,
            filter,
            orderBy,
            printType
          }
        })
        .then((response: any) => response.data);
    }
  }
};
