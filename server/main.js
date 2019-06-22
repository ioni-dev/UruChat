import { Meteor } from 'meteor/meteor';
import { Messages } from '../lib/collections.js';

Meteor.startup(() => {
  // code to run on server at startup

});
Meteor.methods({
  insertMessage: function(text) {
    if(!this.userId){
      alert("user not available");
    }
    var user = Meteor.users.findOne(this.userId);
      // Inserto el mensaje
    return Messages.insert({
      userId: this.userId,
      username: user.username,
      text: text,
      timestamp: Date.now()
    });
  }
});

Messages.remove({});
// publish un set de records (nombre del set, callback)
// Uso function en lugar de arrow para hacer uso del this

Meteor.publish('messages.server', function(limit) {
// para usarios loggeados
 if(this.userId){
   return Messages.find({}, {
      sort: { timestamp: -1 }
  });
}
// Llama al subscrie del cliente
  this.ready();
});
