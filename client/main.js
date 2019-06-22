import { Template } from "meteor/templating";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.html";
import { Messages } from '../lib/collections.js';
import { Meteor } from 'meteor/meteor';

// Aqui me subscribo a la publicacion del servidor
Meteor.subscribe('messages.server', 5);


// Aqui defino el comportamiento que permite mostrar los mensajes
Template.chatBody.helpers({
  messages: function() {
    return Messages.find({},{
      sort: { timestamp: -1}
    });
  }
});


// Controla el envio de el mensaje
Template.chatInput.events({
  'submit .writeMessageForm': function (event) {
    event.preventDefault();
    let text = event.target.writeMessageInput.value;
    console.log(text);
    // Aqui llamo al metodo del servidor y le paso el la variable
    // que contine el texto que escribe la persona
    Meteor.call('insertMessage', text, function(err, result){
      if(err) {
        console.log(err.reason);
      } else {
         console.log('sended by: ', result);
         event.target.writeMessageInput.value = '';
      }
    });
    Messages.insert({
      text: text,
      timestamp: Date.now()

    });
  }
});

// Configuracion del account
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
