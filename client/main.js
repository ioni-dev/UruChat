import { Template } from "meteor/templating";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.html";
import { Messages } from '../lib/collections.js';
import { Meteor } from 'meteor/meteor';

// Here is my subscription to the publish method in the server
Meteor.subscribe('messages.server');

// This is the method that deliver the collection content to the html
// in that way i can iterate and render each text and author
Template.chatBody.helpers({
  messages: function() {
    return Messages.find().fetch();
  }});

// This is where i capture the text value of the input
// when i submit the form
Template.chatInput.events({
  'submit .writeMessageForm': function (event) {
    event.preventDefault();
    let text = event.target.writeMessageInput.value;
    // I placed the call method here because i can pass the text variable
    // to the Meteor.method in the server in an easy way
    Meteor.call('insertMessage', text, function(err, result){
      // I can capture the error if there's any and call this meteor methods
      // following the meteor docs this is the best way.
      if(err) {
        throw new Meteor.Error('message not found', "Can't find any message");
      } else {
        // With this i can clear my input box, so the text that was sended
        // can no longer apper, it's more cleaner and not confusing to the user
       event.target.writeMessageInput.value = ' ';
      }
    });

  }
});

// This is the account configuration, i was consulting the Meteor docs
// to make the user register and login with username and password
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
