import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/grid";
import Card from "@material-ui/core/card";
import Typography from "@material-ui/core/typography";

import { makeStyles } from "@material-ui/core/styles";
import RowBody from "../../components/RowBody";
import RowHeader from './../../components/RowHeader';
import UpperCard from './../../components/UpperCard';
import { deleteCitizenRequest, getApplyCitizens, createCitizen } from './../../Services/store/index';
import Loader from './../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import {  signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
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

export default function CitizensRequestCard() {

    const [citizens, setCitizens] = useState([])
    const [loading, setLoading] = useState(true)
    const [render, setRender] = useState(true)


    const dispatch = useDispatch()


    useEffect(() => {
        setLoading(true)
        getApplyCitizens()
            .then(res => {
                console.log("All Citizens", res.data)
                if (res.data.success) {
                    setLoading(false)
                    setCitizens(res.data.data) // set the state
                } else {
                    setLoading(false)
                    Alert("Error", res.data.error?.message)
                }
            })
        return () => {
            setCitizens([])
        }
    }, [render])

    const accept = (id) => {
        console.log("Accepted id ", id)
        setLoading(true)
        createCitizen(id)
            .then((result) => {
                console.log("Result", result.data)
                const { data } = result
                if (data.success) {
                    signInWithEmailAndPassword(auth, data.credential.email, data.credential.password)
                        .then((userCredential) => {
                            var user = userCredential.user;
                            console.log("USER", user)
                            var user = auth.currentUser;
                            sendEmailVerification(user)
                                .then(function () {
                                    console.log("Email Sent")
                                    signOut(auth)
                                        .then(() => {
                                            console.log('User signed out!')
                                            setLoading(false)
                                            Alert('Citizen Registered!', '', 'success', 'Ok', '#00b59c')
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
            })
    }
    const deleteRequest = (id) => {
        setLoading(true)
        deleteCitizenRequest(id)
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
            })
    }

    const reject = (id) => {
        console.log("Reject")
        setLoading(true)
        deleteCitizenRequest(id)
            .then((result) => {
                if (result.data.success) {
                    // console.log("Result", result)
                    setLoading(false)
                    Alert('Citizen Request Rejected!', '', 'success', 'Ok', '#00b59c')
                    setRender(!render)
                    // setRender(render ? false : true)
                }
                else {
                    console.log("Failed")
                    Alert('Error', 'Failed to reject!')
                    // notify("danger", "tr", result.error.message)
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
                Citizens Requests
            </Typography>
            <Grid container>
                <Grid item xs={12} >
                    <Grid container direction="row-reverse">
                        <UpperCard
                            text="View Citizens Requests List"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.bottomCard}>
                        <RowHeader />
                        {citizens.length === 0 ?
                            <Typography variant="h5" className={classes.bodyTitle}>
                                No Citizens Requests Available
                            </Typography>
                            :
                            <Card className={classes.listCard}>

                                {citizens.map((item, index) => {
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
                                            acceptText="You want to accept a citizen request"
                                            rejectText="You want to reject a citizen request"
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
