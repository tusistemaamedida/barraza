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
      var formdata = new FormData();
      Object.keys(params).map((p) => formdata.append(p, params[p]));
      var requestOptions = {
        method: "PUT",
        body: formdata,
        redirect: "follow",
      };

      const fetcher = await fetch(url, requestOptions);
      if (fetcher.status != 200) {
        throw new Error("error");
      } else {
        return fetcher;
      }
    },
    POST: async () => {
      try {
        var formdata = new FormData();
        Object.keys(params).map((p) => formdata.append(p, params[p]));
        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        const fetcher = await fetch(url, requestOptions).then(toJSON);
        if (fetcher.statusCode !== 200 && fetcher.statusCode !== 201) {
          throw fetcher.body.message;
        }
        return fetcher;
      } catch (e) {
        throw new Error(e);
      }
    },
    DELETE: async () => {
      try {
        var formdata = new FormData();
        Object.keys(params).map((p) => formdata.append(p, params[p]));
        var requestOptions = {
          method: "DELETE",
          body: formdata,
          redirect: "follow",
        };

        const fetcher = await fetch(url, requestOptions).then(toJSON);
        if (fetcher.statusCode !== 200 && fetcher.statusCode !== 201) {
          throw fetcher.body.message;
        }
        return fetcher;
      } catch (e) {
        throw new Error(e);
      }
    },
    PATCH: async () => {
      var formdata = new FormData();
      Object.keys(params).map((p) => formdata.append(p, params[p]));
      var requestOptions = {
        method: "PATCH",
        body: formdata,
        redirect: "follow",
      };

      const fetcher = await fetch(url, requestOptions);
      if (fetcher.status != 200) {
        throw new Error("error");
      } else {
        return fetcher;
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
