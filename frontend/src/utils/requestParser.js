/* const toJSON = (_) => _.json();
export default (type, url) => {

    

const getArticles = async () => {
  const fetcher = await fetch("https://dev.to/api/articles").then(toJSON);
  return fetcher;
};
}; */

const toJSON = (_) => _.json();

export default (type, url, params) => {
  var result = null;
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
    PUT: async () => {
      try {
        var formdata = new FormData();
        Object.keys(params).map((p) => formdata.append(p, params[p]));
        var requestOptions = {
          method: "PUT",
          body: formdata,
          redirect: "follow",
        };

        const fetcher = await fetch(url, requestOptions);
        return fetcher;
      } catch (e) {
        console.log(e);
      }
    },
  };

  if (type === "GET") {
    result = http[type];
  } else {
    result = http[type]();
  }

  return result;
};
