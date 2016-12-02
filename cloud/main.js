// Android push test
Parse.Cloud.define('pushRequestNotification', function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user
  var user = request.user;
  var params = request.params;
  
  var toUserFcmToken = params.toUserFcmToken;

  var body = {};
  body["to"] = toUserFcmToken;
  body["data"] = {};
  body["data"]["fromUserObjectId"] = user.objectId;
  
  Object.keys(params).forEach(function(key) {
    body["data"][key] = params[key];
  });

  Parse.Cloud.httpRequest({
    method: 'POST',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      'Authorization': 'key=' + process.env.FCM_TOKEN,
      'Content-Type': 'application/json'
    },
    body: body
  }).then(function(httpResponse) {
    console.log("### PUSH OK: " + httpResponse.text);
  }, function(httpResponse) {
    console.error('Request failed with response code ' + httpResponse.status);
    console.error('Response ' + httpResponse.text);
  });
  
  response.success('success');
});
