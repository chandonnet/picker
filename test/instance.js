import { Picker } from 'meteor/storyteller:picker';
// TODO replace HTTP with fetch
import { HTTP } from 'meteor/http';
import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';

function getPath(path) {
  return Meteor.absoluteUrl(path);
}

Tinytest.add('normal route', function(test) {
  const id = Random.id();
  Picker.route(`/${id}`, function(params, req, res) {
    res.end("done");
  });

  const res = HTTP.get(getPath(id));
  test.equal(res.content, 'done');
});

Tinytest.add('with params', function(test) {
  const id = Random.id();
  const path = "/post/:id";
  Picker.route(path, function(params, req, res) {
    res.end(params.id);
  });

  const res = HTTP.get(getPath(`post/${id}`));
  test.equal(res.content, id);
});

Tinytest.add('filter only POST', function(test) {
  const id = Random.id();
  const postRoutes = Picker.filter(function(req, res) {
    return req.method === "POST";
  });

  postRoutes.route(`/${id}`, function(params, req, res) {
    res.end("done");
  });

  const res1 = HTTP.get(getPath(`/${id}`));
  test.isFalse(res1.content === "done");

  const res2 = HTTP.post(getPath(`/${id}`));
  test.isTrue(res2.content === "done");
});

Tinytest.add('query strings', function(test) {
  const id = Random.id();
  Picker.route(`/${id}`, function(params, req, res) {
    res.end("" + params.query.aa);
  });

  const res = HTTP.get(getPath(`/${id}?aa=10&bb=10`));
  test.equal(res.content, "10");
});

Tinytest.add('middlewares', function(test) {
  const id = Random.id();

  Picker.middleware(function(req, res, next) {
    setTimeout(function() {
      req.middlewarePass = "ok";
      next();
    }, 100);
  });

  Picker.route(`/${id}`, function(params, req, res) {
    res.end(req.middlewarePass);
  });

  const res = HTTP.get(getPath(`/${id}?aa=10`));
  test.equal(res.content, "ok");
});

Tinytest.add('middlewares - with filtered routes', function(test) {
  const path = `${Random.id()}/coola`;

  const routes = Picker.filter(function(req, res) {
    const matched = /coola/.test(req.url);
    return matched;
  });

  routes.middleware(function(req, res, next) {
    setTimeout(function() {
      req.middlewarePass = "ok";
      next();
    }, 100);
  });

  routes.route(`/${path}`, function(params, req, res) {
    res.end(req.middlewarePass);
  });

  const res = HTTP.get(getPath(path));
  test.equal(res.content, "ok");
});


Tinytest.add('middlewares - with several filtered routes', function(test) {
  const path1 = `${Random.id()}/coola`;
  const path2 = `${Random.id()}/coola`;

  const routes1 = Picker.filter();
  const routes2 = Picker.filter();

  const increaseResultBy = (i) => (req, res, next) => {
    setTimeout(function() {
      req.result = req.result || 0;
      req.result += i;
      next();
    }, 100);
  };

  routes1.middleware(increaseResultBy(1));
  routes2.middleware(increaseResultBy(2));

  Picker.middleware(increaseResultBy(10));

  routes1.route(`/${path1}`, function(params, req, res) {
    res.end(req.result+'');
  });
  routes2.route(`/${path2}`, function(params, req, res) {
    res.end(req.result+'');
  });

  const res1 = HTTP.get(getPath(path1));
  test.equal(res1.content, "11");

  const res2 = HTTP.get(getPath(path2));
  test.equal(res2.content, "12");
});
