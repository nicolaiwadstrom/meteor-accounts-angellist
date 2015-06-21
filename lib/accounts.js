Accounts.oauth.registerService("angellist");

if (Meteor.isClient) {

  Meteor.loginWithAngellist = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Angel.requestCredential(options, credentialRequestCompleteCallback);
  };

} else {

  Accounts.addAutopublishFields({
    forLoggedInUser: ["services.angellist"],
    forOtherUsers: [
      "services.angellist.id",
      "services.angellist.username"
    ]
  });

}