Accounts.oauth.registerService('angellist');

if (Meteor.isClient) {
  Meteor.loginWithAngellist = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    AngelList.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  var autopublishedFields = _.map(
    // don't send access token. https://dev.twitter.com/discussions/5025
    AngelList.whitelistedFields.concat(['id', 'screenName']),
    function (subfield) { return 'services.angellist.' + subfield; });

  Accounts.addAutopublishFields({
    forLoggedInUser: autopublishedFields,
    forOtherUsers: autopublishedFields
  });
}
