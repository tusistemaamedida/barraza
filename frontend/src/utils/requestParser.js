/* const toJSON = (_) => _.json();
export default (type, url) => {

    

const getArticles = async () => {
  const fetcher = await fetch("https://dev.to/api/articles").then(toJSON);
  return fetcher;
};
}; */

const toJSON = (_) => _.json();

export default (type, url, params) => {
  var http = {
    GET: async () => {
      try {
        var objUrl = new URL(url);
        objUrl.search = new URLSearchParams(params).toString();

        var requestOptions = {
          method: "GET",
        };

        const fetcher = await fetch(objUrl, requestOptions).then(toJSON);

        return fetcher;
      } catch (e) {
        console.log(e);
      }
    },
  };
  const result = http[type];

  return result;
};
