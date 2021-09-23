import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import dashboard from "../../assets/dashboard.svg";
import drawerlogo from "../../assets/drwaer_logo.svg";
import UsersCard from '../UsersCard';
import { Route, Switch, Link } from 'react-router-dom';
import ResponderCard from './../ResponderCard/index';
import CitizensRequestCard from '../CitizensRequestCard';
import RespondersRequestCard from './../ResponderRequestCard/index';
import Home from './../Home/index';

const drawerWidth = 265;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#eeeeee',
        flex: 1
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            display: 'none',
            colorPrimary: "linear-gradient(#9cffac 0%, #4bd9a4 26.43%, #00b59c 100%)",

        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: "linear-gradient(#9cffac 0%, #4bd9a4 26.43%, #00b59c 100%)",
        borderRadius: "0px 30px 30px 0px"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',


    },

    listItemText: {
        color: "#00b59c",
        fontWeight: "900",
        // backgroundColor:"red",
        fontSize: "0.9rem",
        '&:hover': {
            color: "#fff",

        },
    },
    listItem: {
        backgroundColor: "#fff",
        borderRadius: "0px 20px 20px 0px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        width: "92%",
        marginTop: 20,

    },
    divider: {
        borderRadius: 1,
        width: "85%",
        background: "#fff",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        margin: "auto"
    }
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Link to={`/`} style={{ textDecoration: 'none' }}>
                <img src={drawerlogo} alt="Safe Citizen Life" style={{ width: "90%", marginTop: "20px", marginBottom: "15px" }} />
            </Link>
            <Divider className={classes.divider} />
            <List>
                {['CITIZENS', 'RESPONDERS', 'CITIZENS REQUESTS', 'RESPONDERS REQUESTS', 'SETTINGS'].map((text, index) => (
                    <Link to={`/${text}`} style={{ textDecoration: 'none' }}>
                        <ListItem button key={index} className={classes.listItem}>
                            {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>    */}
                            <ListItemText primary={<Typography variant="body1" className={classes.listItemText}>{text}</Typography>} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} style={{ background: 'linear-gradient(90deg,#9cffac 0%, #4bd9a4 26.43%, #00b59c 100%)' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>

                <Switch>
                    <Route
                        exact
                        path="/"
                        component={Home}
                    />
                    <Route path="/CITIZENS" component={UsersCard} />
                    <Route path="/RESPONDERS" component={ResponderCard} />
                    <Route path="/CITIZENS REQUESTS" component={CitizensRequestCard} />
                    <Route path="/RESPONDERS REQUESTS" component={RespondersRequestCard} />

                </Switch>

            </main>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
