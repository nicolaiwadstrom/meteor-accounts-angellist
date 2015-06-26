Package.describe({
  name: "nicolaiwadstrom:meteor-accounts-angellist",
  summary: "Login service for AngelList accounts",
  version: "0.0.8",
  git: "https://github.com/nicolaiwadstrom/meteor-accounts-angellist.git"
});

Package.onUse(function(api) {

  api.use("accounts-base@1.2.0", ["client", "server"]);
  api.imply("accounts-base", ["client", "server"]);
  api.use("accounts-oauth@1.1.5", ["client", "server"]);

  api.use("oauth@1.1.4", ["client", "server"]);
  api.use("oauth2@1.1.3", ["client", "server"]);
  api.use("http@1.1.0", ["server"]);
  api.use("underscore@1.0.3", "server");
  api.use("templating@1.1.1", "client");
  api.use("random@1.0.3", "client");
  api.use("service-configuration@1.0.4", ["client", "server"]);

  api.addFiles("lib/accounts.js");
  api.addFiles("lib/client.js", "client");
  api.addFiles("lib/server.js", "server");

});