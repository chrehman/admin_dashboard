import React, { PureComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CountUp from 'react-countup';

import Typography from '@material-ui/core/Typography';
import { Grid, Paper } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { getApplyCitizens,getApplyResponders } from './../../Services/store/index';
import { getUsers } from '../../Services/auth';
import Alert from './../../components/Alert';
import Loader from '../../components/Loader';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    headerContainer: {
        marginTop: '7vh',
        padding: '0px 50px',
    },
    paperOne: {
        textAlign: 'center',
        padding: '20px 8px 20px',
        backgroundColor: '#7bcbc0',
        borderRadius: '20px',
        height: '29vh',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    paperTwo: {
        textAlign: 'center',
        padding: '20px 8px 10px',
        backgroundColor: '#00b59c',
        borderRadius: '20px',
        height: '29vh',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    paperThree: {
        textAlign: 'center',
        padding: '20px 8px 20px',
        backgroundColor: '#3ba092',
        borderRadius: '20px',
        height: '29vh',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    paperFour: {
        textAlign: 'center',
        padding: '20px 8px 20px',
        backgroundColor: '#ef8c8c',
        borderRadius: '20px',
        height: '29vh',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    number: {
        fontWeight: 'bold',
        color: '#fff',
        overflowWrap: 'break-word'
    },
    textCitizenRequest: {
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: '10px',
        overflowWrap: 'break-word'
    },
    textResponderRequest: {
        fontWeight: 'bold',
        color: '#fff',
        overflowWrap: 'break-word'
    },
    textUser: {
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: '30px',
        overflowWrap: 'break-word'
    },
    textRescue: {
        fontWeight: 'bold',
        color: '#fff',
        paddingTop: '30px',
        overflowWrap: 'break-word'
    },
    paperPie: {
        textAlign: 'center',
        padding: '20px 8px 20px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        // height: '29vh',

        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)'
    },
    textPie: {
        fontSize: '0.6rem',
        overflowWrap: 'break-word'
    }
});

export default function Home() {
    const classes = useStyles();
    const matches = useMediaQuery(theme => theme.breakpoints.up('lg'));

    const [citizens, setCitizens] = useState([])
    const [responders, setResponders] = useState([])
    const [citizensRequest, setCitizensRequest] = useState([])
    const [respondersRequest, setRespondersRequest] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        setLoading(true);
        getApplyCitizens()
        .then(res => {
            // console.log("All Citizens", res.data)
            if (res.data.success) {
                setCitizensRequest(res.data.data) // set the state
            } else {
                setLoading(false)
                Alert("Error", res.data.error?.message)
            }
        })
        getApplyResponders()
            .then(res => {
                if (res.data.success) {
                    setRespondersRequest(res.data.data) // set the state
                } else {
                    setLoading(false)
                    Alert("Error", res.data.error?.message)
                }
            })
        getUsers()
            .then(res => {
                if (res.data.success) {
                    setUsers(res.data.result) // set the state
                    setLoading(false)
                } else {
                    Alert("Error", res.data.error.message)
                    setLoading(false)
                }
            })
        // setLoading(false)

    } , [])



    
    

    const data = [
        { name: 'Group A', value: citizensRequest.length+respondersRequest.length },
        { name: 'Group B', value: users.length },

        { name: 'Group C', value: users.length },
    ];

    const barData = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    const COLORS = ['#147ad6', '#79d2de', '#ec6666'];

    if(loading) {
        return(
            <Loader/>
        )
    }
    return (
        <>
            <Grid container spacing={3} className={classes.headerContainer} justifyContent="center">

                <Grid item xs={12} sm={11} md={4} lg={3} >
                    <Paper className={classes.paperOne} elevation={3}>
                        <Typography variant="h2" component="h2" className={classes.number}>
                            <CountUp start={0} end={citizensRequest.length} duration={3} />
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.textCitizenRequest}>
                            PENDING CITIZENS REQUESTS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={11} md={4} lg={3}>
                    <Paper className={classes.paperTwo} elevation={3}>
                        <Typography variant="h2" component="h2" className={classes.number}>
                        <CountUp start={0} end={respondersRequest.length} duration={3} />

                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.textResponderRequest}>
                            PENDING RESPONDERS REQUESTS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={11} md={4} lg={3}>
                    <Paper className={classes.paperThree} elevation={3}>
                        <Typography variant="h2" component="h2" className={classes.number}>
                        <CountUp start={0} end={users.length} duration={3} />

                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.textUser}>
                            TOTAL USERS
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={11} md={4} lg={3}>
                    <Paper className={classes.paperFour} elevation={3}>
                        <Typography variant="h2" component="h2" className={classes.number}>
                        <CountUp start={0} end={500} duration={3} />
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.textRescue}>
                            TOTAL RESCUES
                        </Typography>
                    </Paper>
                </Grid>
                <Grid container xs={12} spacing={3} justifyContent="center">

                    <Grid item xs={12} sm={12} md={6} lg={4} style={{ marginTop: "30px" }}>
                        <Paper className={classes.paperPie} elevation={3}>
                            {/* aspect={4.0/3.0} */}
                            <ResponsiveContainer width="100%" aspect={4.0 / 3.3}>
                                <PieChart width={350} height={300} >
                                    <Pie
                                        data={data}
                                        cx="50%" cy="50%"
                                        innerRadius={70}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={10}
                                        dataKey="value"
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>

                                </PieChart>
                            </ResponsiveContainer>
                            
                                <ul style={{ display: 'flex',  justifyContent: 'space-around' }}>
                                    <li style={{ color: '#147ad6' }}>
                                        <Typography variant="h6" component="h2" className={classes.textPie}>
                                            TotalRequest
                                        </Typography>
                                    </li>
                                    <li style={{ color: '#79d2de' }}>
                                        <Typography variant="h6" component="h2" className={classes.textPie}>
                                            Rescue In Progress
                                        </Typography>
                                    </li>
                                    <li style={{ color: '#ec6666' }}>
                                        <Typography variant="h6" component="h2" className={classes.textPie}>
                                            Errors
                                        </Typography>
                                    </li>

                                </ul>
                            
                            <Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={8} style={{ marginTop: "30px" }}>
                        <Paper className={classes.paperPie} elevation={3}>
                            <ResponsiveContainer width="100%" aspect={matches ? 7.6 / 3.4 : 3.2 / 3}>
                                <BarChart
                                    width="100%"
                                    height="100%"
                                    data={barData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="pv" fill="#147ad6" />
                                    <Bar dataKey="uv" fill="#ec6666" />
                                </BarChart>
                            </ResponsiveContainer>
                            <Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
