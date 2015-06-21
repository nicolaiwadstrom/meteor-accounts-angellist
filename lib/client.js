Angel = {};

Angel.requestCredential = function (options, credentialRequestCompleteCallback) {

  if (!credentialRequestCompleteCallback && typeof options === "function") {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({ service: "angellist" });
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }

  var credentialToken = Random.id();
  var scope = "";


  if (options && options.requestPermissions) {
    scope = options.requestPermissions.join(",");
  }

  
  // Quick bugfix, scope should apparently come the client in this case and not the non existent config.scope  
  var loginUrl =
    "https://angel.co/api/oauth/authorize" +
      "?response_type=code" +
      "&client_id=" + config.clientId +
      "&scope=" + scope +
      "&redirect_uri=" + Meteor.absoluteUrl("_oauth/angellist?close=close") +
      "&state=" + credentialToken;

  var dimensions = { width: 990, height: 650 };
  Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback, dimensions);

};