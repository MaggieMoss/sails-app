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
  	}, 

    stories: {
      collection: 'stories', 
      via: 'author'
    }
  }, 

  beforeCreate: function(values, next) {
    // if(!values.password) || values.password != values.confirmation) {
    //   return next({err: ["Password doesn't match password confirmation"]})
    // }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if(err) return next(err);
      values.password = encryptedPassword;
      values.online = true;
      next();
    });
  }



};

