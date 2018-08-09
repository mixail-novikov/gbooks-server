export default {
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

      return isbn
        ? `https://books.google.com/books?isbn=${isbn}`
        : `https://books.google.com/books?id=${id}`;
    }
  }
};
