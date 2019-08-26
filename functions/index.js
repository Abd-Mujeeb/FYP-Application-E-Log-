const functions = require('firebase-functions');
const user_admin = require('firebase-admin');
user_admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    // check request is made by an admin
    if ( context.auth.token.user_admin !== true){
        return { error: 'only admins can add user' }
    }

    // get user and add custom claim (admin)
    return user_admin.auth().getUserByEmail(data.email).then(user => {
        return user_admin.auth().setCustomUserClaims(user.uid, {
            user_admin: true
        });
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin`
        }
    }).catch(err => {
        return err;
    });
});

