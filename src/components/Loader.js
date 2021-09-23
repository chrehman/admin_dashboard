import React from 'react'
import Grid from "@material-ui/core/grid";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({

    circularContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    circularStyle: {
        color: "#00b59c"
    }
}));


const Loader = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.circularContainer}>
            <CircularProgress className={classes.circularStyle} />
        </Grid>
    )
}

export default Loader
