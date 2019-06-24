import { Meteor } from 'meteor/meteor';
import { Messages } from '../lib/collections.js';

// To be honest, i don't need this method for this app, that's why it's commented
// Meteor.startup(() => {
//   // code to run on server at startup
//
// });

// I defined the insertMessage to insert the data to the mongo Collection
Meteor.methods({
  insertMessage: function(text) {
    // First the user verification, it throws a simple error
    if(!this.userId){
      alert("user not available");
    }
    // I get the current user
    var user = Meteor.users.findOne(this.userId);

    return Messages.insert({
      userId: this.userId,
      username: user.username,
      text: text,
      timestamp: Date.now(),
      class: ''
    });
  }
});

Messages.remove({});
// publish a set of records (set name, callback)


Meteor.publish('messages.server', function() {
// for logged users
 if(this.userId){
   return Messages.find({}, {
     // the sorting solution, in this way i can show the recent message
     // at the bottom
      sort: { timestamp: -1 }
  });
}
// this is helpful to notify the subscribe method from the client side
// that a new change has been made and it's completed.
  this.ready();
});
