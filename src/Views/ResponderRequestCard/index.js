import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/grid";
import Card from "@material-ui/core/card";
import Typography from "@material-ui/core/typography";

import { makeStyles } from "@material-ui/core/styles";
import RowBody from "../../components/RowBody";
import RowHeader from './../../components/RowHeader';
import UpperCard from './../../components/UpperCard';
import { deleteResponderRequest, getApplyResponders, createResponder } from './../../Services/store/index';
import Loader from './../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../../firebase";

import Alert from './../../components/Alert';

const useStyles = makeStyles((theme) => ({
    heading: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        color: "#00b59c",
        textTransform: 'uppercase',
    },
    bottomCard: {
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        borderRadius: 20,
        padding: 25,
    },
    listCard: {
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        marginTop: 30,
    },
    bodyTitle: {
        textAlign: 'center',
        color: 'grey',
        marginTop: 30
    }
}))

export default function RespondersRequestCard() {

    const [responders, setResponders] = useState([])
    const [loading, setLoading] = useState(true)
    const [render, setRender] = useState(true)


    const dispatch = useDispatch()


    useEffect(() => {
        setLoading(true)
        getApplyResponders()
            .then(res => {
                console.log("All Responders", res.data)
                if (res.data.success) {
                    setLoading(false)
                    setResponders(res.data.data) // set the state
                } else {
                    setLoading(false)
                    Alert("Error", res.data.error?.message)
                }
            })
        return () => {
            setResponders([])
        }
    }, [render])

    const accept = (id) => {
        console.log("Accepted id ", id)
        setLoading(true)
        createResponder(id)
            .then((result) => {
                console.log("Result", result.data)
                const { data } = result
                if (data.success) {
                    signInWithEmailAndPassword(auth, data.credential.email, data.credential.password)
                        .then((userCredential) => {
                            // Signed in
                            var user = userCredential.user;
                            console.log("USER", user)
                            var user = auth.currentUser;
                            sendEmailVerification(user)
                                .then(function () {
                                    // Email sent.
                                    console.log("Email Sent")
                                    signOut(auth)
                                        .then(() => {
                                            console.log('User signed out!')
                                            setLoading(false)
                                            Alert('Responder Registered!', '', 'success', 'Ok', '#00b59c')
                                            deleteRequest(id)

                                        })
                                        .catch(function (error) {
                                            console.log("Error signout", error)
                                            Alert('Error', error)
                                            setLoading(false)
                                        }
                                        )
                                })
                                .catch(function (error) {
                                    console.log("Email Error", error)
                                    setLoading(false)
                                    Alert('Error', error)

                                });
                        })
                        .catch((error) => {
                            console.log("Error")
                            console.log(error)
                            setLoading(false)
                            Alert('Error', error)

                        });
                }
                else {
                    console.log("Failed")
                    setLoading(false)
                    Alert('Error', 'Email already exist!')

                }
            })
            .catch((err) => {
                setLoading(false)
                Alert('Error', err)
            })

    }
    const deleteRequest = (id) => {
        setLoading(true)
        deleteResponderRequest(id)
            .then((result) => {
                if (result.data.success) {
                    setLoading(false)
                    setRender(!render)

                }
                else {
                    console.log("Failed")
                    Alert('Error', 'Failed to reject!')

                }
            })
            .catch((err) => {
                console.log("ERROR", err)
                // notify("danger", "tr", err)
            })
    }
    const reject = (id) => {
        console.log("Reject")
        setLoading(true)
        deleteResponderRequest(id)
            .then((result) => {
                if (result.data.success) {
                    setLoading(false)
                    Alert('Responder Request Rejected!', '', 'success', 'Ok', '#00b59c')
                    setRender(!render)

                }
                else {
                    console.log("Failed")
                    Alert('Error', 'Failed to reject!')

                }
            })
            .catch((err) => {
                console.log("ERROR", err)
                // notify("danger", "tr", err)
            })
    }

    const classes = useStyles();

    if (loading) {
        return <Loader />
    }
    return (
        <>
            <Typography variant="h3"
                className={classes.heading}
            >
                Responders Requests
            </Typography>
            <Grid container>
                <Grid item xs={12} >
                    <Grid container direction="row-reverse">
                        <UpperCard
                            text="View Responders Requests List"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.bottomCard}>
                        <RowHeader />
                        {responders.length === 0 ?
                            <Typography variant="h5" className={classes.bodyTitle}>
                                No Responders Requests Available
                            </Typography>
                            :
                            <Card className={classes.listCard}>

                                {responders.map((item, index) => {
                                    const userName = item.firstName + " " + item.lastName
                                    return (
                                        <RowBody
                                            key={index}
                                            name={userName}
                                            email={item.email}
                                            date={new Date().toISOString()}
                                            onAccept={() => accept(item.id)}
                                            onReject={() => reject(item.id)}
                                            firstBtnText="Accept"
                                            secondBtnText="Reject"
                                            acceptText="You want to accept a responder request"
                                            rejectText="You want to reject a responder request"
                                        />
                                    )
                                })}
                            </Card>}
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
