/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  // setting this to true means it only saves the attributes seen here. 
  tableName: 'user', 
  adapter: 'mysql-adapter', 
  migrate: 'safe',


  schema: true,
  
  attributes: {
  	username: {
  		type: 'string', 
  		required: true
  	}, 

  	email: {
  		type: 'string',
  		required: true, 
  		unique: true
  	}, 

  	password: {
  		type: 'string'
  	} 
  }
};

