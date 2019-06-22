import { Meteor } from 'meteor/meteor';
import { Messages } from '../lib/collections.js';

Meteor.startup(() => {
  // code to run on server at startup

});
Meteor.methods({
  insertMessage: function(text) {
    var user = Meteor.users.findOne(this.userId);
      // Inserto el mensaje
    console.log(user)
    return Messages.insert({
      userId: this.userId,
      username: user.username,
      text: text,
      timestamp: Date.now()
    });
  }
});

Messages.remove({});
// Retornando el mongo cursor, esto esta disponible para el cliente
// Uso function en lugar de arrow para hacer uso del this

Meteor.publish('messages.server', function(limit) {
// para usarios loggeados
 if(this.userId){
  return Messages.find({}, {
    limit: limit,
    sort: { timestamp: -1 }
  });
}
  this.ready();
});
