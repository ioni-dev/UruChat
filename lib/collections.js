import { Mongo } from 'meteor/mongo';
// Collections tienen que estar disponibles para el cliente y el servidor
// Lo creo aqui y los exporto
export const Messages = new Mongo.Collection('messages');
