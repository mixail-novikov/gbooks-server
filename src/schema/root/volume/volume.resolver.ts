export default {
  Query: {
    volume: (_: any, { id }: any, { client }: any) =>
      client
        .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
        .then((response: any) => response.data)
  }
};
