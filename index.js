const express = require('express')
const app = express()
const config = require('./config');
const request = require('request');
//Get authorized and make API calls
app.get('/', (req, res) => {

    // STEP 1: Get authorization code

    if (req.query.code) {

        // Zoom's authorization url

        let url = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=' + config.redirectUrl;

        // We need to exchange the code to obtain an Oauth token.
        request.post(url, function (error, response, body) {

        // Response should be a JSON payload.
            body = JSON.parse(body);
            console.log("Your access token:", JSON.stringify(body.access_token));
            
            // STEP 2: Get refresh token
            let refresh_token = body.refresh_token

            if (body.access_token) {

                //STEP 3
                // We can now use the access token to make API calls -- 1. Here we are using the Create Meetings API to create a meeting
                // for ourself (the user who authorizes the app after running it) -- hence, the me context. 
                /*
                 To create a meeting for a different user, replace "me" with their userid or email address and share your publishable url to
                 have them authorize your app. To use the publishable url without approval, the user must be under the same account as you.
                 Otherwise, you can request for sharing (without publishing the app) approval via Marketplace. */


                     /* Set the meeting topic, type of meeting, start-time and duration for the meeeting.
                        You can provide additional information in the request body. 
                        Check https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate for reference. */

                request.post({
                     url: 'https://api.zoom.us/v2//users/me/meetings',
                     headers: {'content-type' : 'application/json'},
                     body:JSON.stringify({"topic": "{YourMeetingTopic}", "type":"{YourMeetingType- must be int, choose from(1, 2, 3 ,8)}", "start_time": "{MeetingStartTime - e.g: 2019-04-19T23:00:00Z}", "duration": "{MeetingDurationInMinutes - must be int}"})
                 },
                  function (error, response, body) {
                    if(error){
                        console.log('Error in API ', error)
                    }else{
                        body = JSON.parse(body);
                        //display response in console
                        console.log('Meeting created: ', body);
                    }

                  
                }).auth(null, null, true, body.access_token);

                // Step 4: List user's meetings. 
                //Find the reference guide for List Meetings API here: https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetings
                request.get({
                   
                     url: 'https://api.zoom.us/v2/users/me/meetings',

                     headers: {'content-type' : 'application/json'},
                 },
                  function (error, response, body) {
                    if(error){
                        console.log('Error in API ', error)
                    }else{
                        body = JSON.parse(body);
                        //display response in console
                        console.log('Your list of meetings: ', body);
                    }


                }).auth(null, null, true, body.access_token);

                  // Step 5. Delete a user's meeting.
                  //Find the reference guide for Delete Meeting API here: https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingdelete
                   
                    request.post({
                    //Additionally, if your meeting has an occurence_id, you can provide the occurence_id as a Query parameter along with the url.
                     url: 'https://api.zoom.us/v2/meetings/{meetingID}',
                     headers: {'content-type' : 'application/json'},
                     
                 },
                  function (error, response, body) {
                    if(error){
                        console.log('Error in API ', error)
                    }else{
                        body = JSON.parse(body);
                        //display response in console
                        console.log('Meeting deleted:', body);
                    }
                 }).auth(null, null, true, body.access_token);



            
            } else {
               console.log("Something is not right.");
            }


        }).auth(config.clientID, config.clientSecret);

        return;
    }

   
    //If no code is provided, redirect the user to get the code.
    res.redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=' + config.clientID + '&redirect_uri=' + config.redirectUrl);
});

app.listen(3000, () => console.log('Zoom api oauth sample app listening on port 3000!'))
 