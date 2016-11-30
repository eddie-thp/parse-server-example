// Android push test
Parse.Cloud.define('pushRequestNotification', function(request, response) {

  // request has 2 parameters: params passed by the client and the authorized user
  var user = request.user;
  var params = request.params;
  
  var toUserObjectId = params.toUserObjectId;
  var toUserFcmToken = params.toUserFcmToken;
  var requestObjectId = params.requestObjectId;
  var notificationTitle = params.notificationTitle;
  var notificationBody = params.notificationBody;
  
  Parse.Cloud.httpRequest({
    method: 'POST',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
      'Authorization': 'key=' + process.env.FCM_TOKEN,
      'Content-Type': 'application/json'
    },
    body: {
      notication: {
      title: notificationTitle,
      body: notificationBody
    },
    to: toUserFcmToken,
    data: {
      requestObjectId: requestObjectId
    }
  }).then(function(httpResponse) {
    console.log("### PUSH OK: " + httpResponse.text);
  }, function(httpResponse) {
    console.error('Request failed with response code ' + httpResponse.status);
    console.error('Response ' + httpResponse.text);
  });

  /*
  // use to custom tweak whatever payload you wish to send
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo("deviceType", "android");

  var payload = {
    */
  
  /*
  payload.notification = {};
  payload.to = toUserFcmToken;
  payload.notification.title = title;
  payload.notification.body = body;
  payload.data = {};
  payload.data.requestObjectId = requestObjectId;
  */
 
/*
  if (customData) {
      payload.customdata = customData;
  }
  else if (launch) {
      payload.launch = launch;
  }
  else if (broadcast) {
      payload.broadcast = broadcast;
  }
*/
  // Note that useMasterKey is necessary for Push notifications to succeed.

  Parse.Push.send({
  where: pushQuery,      // for sending to a specific channel
  data: payload,
  }, { success: function() {
     console.log("#### PUSH OK");
  }, error: function(error) {
     console.log("#### PUSH ERROR" + error.message);
  }, useMasterKey: true});

  response.success('success');
});
