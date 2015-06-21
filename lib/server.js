Angel = {};

var getUser = function (accessToken) {
  var params = { access_token: accessToken };
  var result = HTTP.get("https://api.angel.co/1/me", { params: params });
  if (result.error) throw result.error;
  return result.data;
};

Oauth.registerService("angellist", 2, null, function(query) {

  var response    = getTokenResponse(query);
  var accessToken = response.accessToken;


  var serviceData = { accessToken: accessToken };
  var user = getUser(accessToken);  
  var fields = ["id", "name", "image"];
  serviceData = _.extend(serviceData, _.pick(user, fields));

  /*
  var whiteListed = ["first_name", "last_name"];
  var fields = _.pick(whiteListed);
  _.extend(serviceData, fields);
  serviceData.id = serviceData.uid;
  delete serviceData.uid;
  */

  return {
    serviceData: serviceData,
    /*
    options: {
      profile: {
        profile: fields
      }
    }
    */
  };

});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
var getTokenResponse = function (query) {

  var config = ServiceConfiguration.configurations.findOne({service: "angellist"});
  if (!config) {
    throw new ServiceConfiguration.ConfigError("Service not configured");
  }

  var responseContent;

  try {

    // Request an access token
    var params = {
      client_id:     config.clientId,
      client_secret: config.secret,
      code:          query.code,
      grant_type: 	"authorization_code",
      redirect_uri: Meteor.absoluteUrl("_oauth/angellist?close")
    };
    responseContent = HTTP.post("https://angel.co/api/oauth/token", { params: params }).content;

  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Angellist. " + err.message), { response: err.response });
  }

  // Success!  Extract the AngelList access token and key from the response
  var parsedResponse = JSON.parse(responseContent); // access_token, token_type
  var accessToken = parsedResponse.access_token;
  if (!accessToken) {
    throw new Error("Failed to complete OAuth handshake with AngelList " + "-- can't find access token in HTTP response. " + responseContent);
  }

  return {
    accessToken: accessToken,
  };

};

Angel.retrieveCredential = function(credentialToken) {
    return Oauth.retrieveCredential(credentialToken);
};