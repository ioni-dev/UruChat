import { Template } from "meteor/templating";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.html";
import { Messages } from '../lib/collections.js';
import { Meteor } from 'meteor/meteor';

// Aqui me subscribo a la publicacion del servidor
Meteor.subscribe('messages.server', 5);


// Aqui defino el comportamiento que permite mostrar los mensajes
// en el helper
Template.chatBody.helpers({
  messages: function() {
    return Messages.find({},{
    });
  }
});


// Controla el envio de el mensaje
Template.chatInput.events({
  'submit .writeMessageForm': function (event) {
    event.preventDefault();
    let text = event.target.writeMessageInput.value;
    // Aqui llamo al metodo del servidor y le paso el la variable
    // que contine el texto que escribe la persona
    Meteor.call('insertMessage', text, function(err, result){
      if(err) {
        throw new Meteor.Error('message not found', "Can't find any message");
      } else {
       event.target.writeMessageInput.value = ' ';

      }
    });

  }
});

// Configuracion del account
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});
