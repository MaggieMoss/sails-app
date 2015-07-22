/**
* Stories.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	title: {
  		type: 'string', 
  		required: true
  	}, 

  	coverImage: {
  		type: 'string',
  	}, 

  	author: {
  		type: 'string'
  	}, 

  	category: {
  		type: 'string'
  	}, 

    user_id: {
      type: 'int'
    }
  }
};

