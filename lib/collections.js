import { Mongo } from 'meteor/mongo';
// Collections needs to be available to the client and server

export const Messages = new Mongo.Collection('messages');
