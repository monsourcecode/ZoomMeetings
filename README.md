# ZoomMeetings
This app allows you to create a Zoom meeting, list your Zoom meetings and delete a specific Zoom meeting on behalf of the Zoom user who authorizes the app.

# Getting Started

### Install

Clone the repo using git clone.
` git clone https://github.com/zoom/zoom-oath-sample-app.git`

> Install the dependent node modules.
``` npm install ```

### Quick Start



> In the config.js file, input your clientID, clientSecret, and redirectUrl. Please note to test locally, the redirectUrl can't be localhost, you can use ngrok or a similar service instead. 
``` 
   const config = {
	development :{
		clientID : '',
		clientSecret : '',
		redirectUrl : ''
	},
	production:{	
		clientID : '',
		clientSecret : '',
		redirectUrl: ''
	}
}; 
```
> Set your environment varaibles.
` export NODE_NEV=[environment name] (e.g. export NODE_NEV=production) `
> Replace the variables enclosed in {} with your variables. 
`For instance, {your_meetingId} should be replaced with the authorized user's Meeting ID. 

> Start the node app.
` node.index.js `

> Go to localhost:3000 in the browser
If this is the first time, you're running the app, you have to authorize the app and then, you can view the response in your console.
