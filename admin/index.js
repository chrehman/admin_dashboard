const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = require("./safe-citizen-life-firebase-adminsdk-wj3ek-00c2a31ea5.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://safe-citizen-life-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
const db = admin.firestore();



// router of get method
app.get('/', (req, res) => {
    res.send('Welcome to Safe Citizen Life');
    // res.send('hello world');
}
);

// get method
app.get('/citizens', (req, res) => {
    db.collection('citizens').get()
        .then(snapshot => {
            const users = [];
            snapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            res.send({success:true,data:users});
        })
        .catch(error => {
            console.log('Error getting documents', error);
            res.send({success:true,error});
        });
});


app.get('/responders', (req, res) => {
    db.collection('citizens').get()
        .then(snapshot => {
            const users = [];
            snapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            res.send({success:true,data:users});
        })
        .catch(error => {
            console.log('Error getting documents', error);
            res.send({success:true,error});
        });
});


app.get('/applyCitizens', (req, res) => {
    db.collection('applyCitizens').get()
        .then(snapshot => {
            const users = [];
            snapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            res.send({success:true,data:users});
        })
        .catch(error => {
            console.log('Error getting documents', error);
            res.send({success:true,error});
        });
});


app.get('/applyResponders', (req, res) => {
    db.collection('applyCitizens').get()
        .then(snapshot => {
            const users = [];
            snapshot.forEach(doc => {
                users.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            res.send({success:true,data:users});
        })
        .catch(error => {
            console.log('Error getting documents', error);
            res.send({success:true,error});
        });
});

app.post('/createCitizen', function (req, res, next) {
    console.log(req.body)

    admin.firestore().collection("applyCitizens").doc(req.body.id).get().then((result) => {

        let data = result.data()
        admin
            .auth()
            .createUser({
                email: data.email,
                emailVerified: false,
                password: data.password,
                displayName: `${data.firstName} ${data.lastName}`,
                disabled: false,
                type:'citizen'
            })
            .then((userRecord) => {
                admin.firestore().collection('citizens').doc(userRecord.uid)
                    .set({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        address: data.address,
                        city: data.city,
                        country: data.country,
                        bloodGroup: data.bloodGroup,
                        cnic: data.cnic,
                        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
                        urlImg: data.urlImg,
                        dob: data.dob,
                        gender: data.gender,
                    })
                    .then(() => {
                        console.log("Citizens doc written!");
                        let credential = { email: userRecord.email, password: data.password }
                        console.log(credential)
                        res.send({ success: true, credential: credential })
                    })
                    .catch((error) => {
                        console.log("FireStore Admin", error)
                        res.send({ success: false, error: error })
                    })
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
                res.send({ success: false, error: error })
            });
    })
        .catch((error => {
            res.send({ success: false, error: error })
        }))
});

app.post('/deleteCitizenRequest', function (req, res, next) {
    console.log(req.body.id)
    admin.firestore().collection("applyCitizens").doc(req.body.id).delete().then(() => {
        console.log("Document successfully deleted!");
        res.send({ success: true })
    }).catch((error) => {
        console.error("Error removing document: ", error);
        res.send({ success: false, error: error })
    });
});

app.post('/createResponder', function (req, res, next) {
    console.log(req.body)

    admin.firestore().collection("applyResponders").doc(req.body.id).get().then((result) => {

        let data = result.data()
        admin
            .auth()
            .createUser({
                email: data.email,
                emailVerified: false,
                password: data.password,
                displayName: `${data.firstName} ${data.lastName}`,
                disabled: false,
                type:"responder"
            })
            .then((userRecord) => {
                admin.firestore().collection('responders').doc(userRecord.uid)
                    .set({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        address: data.address,
                        city: data.city,
                        country: data.country,
                        bloodGroup: data.bloodGroup,
                        cnic: data.cnic,
                        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
                        urlImg: data.urlImg,
                        dob: data.dob,
                        gender: data.gender,
                    })
                    .then(() => {
                        console.log("Responder doc written!");
                        let credential = { email: userRecord.email, password: data.password }
                        console.log(credential)
                        res.send({ success: true, credential: credential })
                    })
                    .catch((error) => {
                        console.log("FireStore Admin", error)
                        res.send({ success: false, error: error })
                    })
            })
            .catch((error) => {
                console.log('Error creating new user:', error);
                res.send({ success: false, error: error })
            });
    })
        .catch((error => {
            res.send({ success: false, error: error })
        }))
});

app.post('/deleteResponderRequest', function (req, res, next) {
    console.log(req.body.id)
    admin.firestore().collection("applyResponders").doc(req.body.id).delete().then(() => {
        console.log("Document successfully deleted!");
        res.send({ success: true })
    }).catch((error) => {
        console.error("Error removing document: ", error);
        res.send({ success: false, error: error })
    });
});


app.post('/userDelete', function (req, res, next) {
    admin
        .auth()
        .deleteUser(req.body.id)
        .then(() => {
            console.log('Successfully deleted user');
            res.send({ success: true })
        })
        .catch((error) => {
            console.log('Error deleting user:', error);
            res.send({ success: false, error: error })
        });
});

app.post('/userDisable', function (req, res, next) {
    admin
        .auth()
        .getUser(req.body.id)
        .then((userRecord) => {
            console.log('Successfully fetch user', userRecord.toJSON());
            admin
                .auth()
                .updateUser(req.body.id, {
                    ...userRecord.toJSON(),
                    disabled: true,
                })
                .then((userRecord) => {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log('Successfully updated user', userRecord.toJSON());
                    res.send({ success: true })
                })
                .catch((error) => {
                    console.log('Error updating user:', error);
                    console.log({ success: false, error: error })
                });
        })
        .catch((error) => {
            console.log('Error fetching user:', error);
            res.send({ success: false, error: error })
        });
});

app.post('/userEnable', function (req, res, next) {
    admin
        .auth()
        .getUser(req.body.id)
        .then((userRecord) => {
            console.log('Successfully fetch user', userRecord.toJSON());
            admin
                .auth()
                .updateUser(req.body.id, {
                    ...userRecord.toJSON(),
                    disabled: false,
                })
                .then((userRecord) => {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log('Successfully updated user', userRecord.toJSON());
                    res.send({ success: true })
                })
                .catch((error) => {
                    console.log('Error updating user:', error);
                    console.log({ success: false, error: error })
                });
        })
        .catch((error) => {
            console.log('Error fetching user:', error);
            res.send({ success: false, error: error })
        });
});

app.get('/list', function (req, res, next) {
    var usersList = []
    const listAllUsers = (nextPageToken) => {
        // List batch of users, 1000 at a time.
        admin
            .auth()
            .listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
                listUsersResult.users.forEach((userRecord) => {
                    console.log('user', userRecord.toJSON());
                    usersList.push(userRecord.toJSON())
                    // res.send(userRecord)
                });
                // console.log("USERS LIST",usersList[0])
                res.send({success:true,result:usersList})
                if (listUsersResult.pageToken) {
                    // List next batch of users.
                    listAllUsers(listUsersResult.pageToken);
                }
            })
            .catch((error) => {
                console.log('Error listing users:', error);
                res.send({success:false,error:error})
                
            });
    };
    // Start listing users from the beginning, 1000 at a time.
    listAllUsers();
});

// server listening on port
app.listen(port, () => {
    console.log('server is running on port ' + port);
});