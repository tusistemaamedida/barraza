/* const toJSON = (_) => _.json();
export default (type, url) => {

    

const getArticles = async () => {
  const fetcher = await fetch("https://dev.to/api/articles").then(toJSON);
  return fetcher;
};
}; */

const toJSON = (_) => _.json();

export default (type, url) => {
  var http = {
    GET: async () => {
      console.log("object");

      const fetcher = await fetch(url).then(toJSON);
      return fetcher;
    },
  };
  const result = http[type];

  return result;
};
