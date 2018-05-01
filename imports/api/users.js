import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;

  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });

  if (user.username && user.username.length >= 3) {
    return true;
  } else {
    throw new Meteor.Error(403, 'username must be more than 3 characters');
  }

  return true;
});
