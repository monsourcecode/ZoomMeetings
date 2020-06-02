const env = process.env.NODE_ENV || 'production'

//insert your API Key & Secret and Redirect URL for each environment, keep this file local and never push it to repo.
const config = {
	development :{
		clientID : 'a7IgUaZ_RlSIC6zGIRK7Gg',
		clientSecret : '2A255iHNEEPLpuBkEVdpEJl5o3jnBvI1BpBe',
		redirectUrl : ''
	},
	production:{	
		clientID : 'a7IgUaZ_RlSIC6zGIRK7Gg',
		clientSecret : '2A255iHNEEPLpuBkEVdpEJl5o3jnBvI1BpBe',
		redirectUrl: ''
	}
};

module.exports = config[env]
