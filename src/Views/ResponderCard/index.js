import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/grid";
import Card from "@material-ui/core/card";
import Typography from "@material-ui/core/typography";

import { makeStyles } from "@material-ui/core/styles";
import RowBody from "../../components/RowBody";
import RowHeader from './../../components/RowHeader';
import UpperCard from './../../components/UpperCard';
import Loader from "../../components/Loader";
import { getResponders } from './../../Services/store/index';
import { getUsers, userDelete, userDisable } from "../../Services/auth";
import Alert from './../../components/Alert';
import { userEnable } from './../../Services/auth/index';




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

export default function ResponderCard() {


    const [responders, setResponders] = useState([])
    const [authResponders, setAuthResponders] = useState([])
    const [loading, setLoading] = useState(true)
    const [render, setRender] = useState(true)


    useEffect(() => {
        setLoading(true)
        getUsers()
            .then(res => {
                if (res.data.success) {
                    setAuthResponders(res.data.result) // set the state
                    setLoading(false)
                } else {
                    Alert("Error", res.data.error.message)
                    setLoading(false)
                }
            })
        getResponders()
            .then(res => {
                console.log("All Responders", res.data.data)
                if (res.data.success) {
                    setResponders(res.data.data) // set the state
                    setLoading(false)
                } else {
                    Alert("Error", res.data.error?.message)
                    setLoading(false)
                }
            })
    }, [render])


    const deleteUser = (id) => {
        console.log("Delete", id)
        setLoading(true)
        userDelete(id)
            .then((result) => {
                if (result.data.success) {
                    Alert('Responder Account Deleted!', '', 'success', 'Ok', '#00b59c')
                    setRender(!render)
                    setLoading(false)
                }
                else {
                    setLoading(false)
                    console.log("Failed")
                    Alert("Error", result.data.error?.message)
                }
            })
            .catch((err) => {
                setLoading(false)
                Alert("Error", err)
            })
    }
    const disableUser = (id) => {
        console.log("Disable", id)
        setLoading(true)
        userDisable(id)
            .then((result) => {
                if (result.data.success) {
                    setLoading(false)
                    Alert('Responder Account Disabled!', '', 'success', 'Ok', '#00b59c')
                    setRender(!render)
                }
                else {
                    setLoading(false)
                    Alert("Error", result.data.error?.message)
                }
            })
            .catch((err) => {
                setLoading(false)
                Alert("Error", err)
            })
    }

    const enableUser = (id) => {
        console.log("Enable", id)
        setLoading(true)
        userEnable(id)
            .then((result) => {
                if (result.data.success) {
                    setLoading(false)
                    Alert('Responder Account Enabled', '', 'success', 'Ok', '#00b59c')
                    setRender(!render)
                }
                else {
                    setLoading(false)
                    Alert("Error", result.data.error?.message)
                }
            })
            .catch((err) => {
                setLoading(false)
                Alert("Error", err)
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
                Responders
            </Typography>
            <Grid container>
                <Grid item xs={12} >
                    <Grid container direction="row-reverse">
                        <UpperCard
                            text="View Responders List"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.bottomCard}>
                        <RowHeader />
                        {responders.length === 0 ?
                            <Typography variant="h5" className={classes.bodyTitle}>
                                No Responder Registered Yet
                            </Typography>
                            :
                            <Card className={classes.listCard}>
                                {responders.map((item, index) => {
                                    const responder = authResponders.find(c => c.uid === item.id)
                                    if (responder) {
                                        {/* console.log("Citizen", responder) */}
                                        const userName = item.firstName + " " + item.lastName
                                        return (
                                            <RowBody
                                                key={index}
                                                name={userName}
                                                email={item.email}
                                                disabled={responder.disabled}
                                                onAccept={() => { }}
                                                onEnable={() => enableUser(item.id)}
                                                onDisable={() => disableUser(item.id)}
                                                onDelete={() => deleteUser(item.id)}
                                            />
                                        )
                                    }
                                })}
                            </Card>}
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
