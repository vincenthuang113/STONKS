import React, { useState } from "react";
import {
    Drawer as MUIDrawer,
    ListItem,
    List, 
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Divider,
    Button,
    Box,
    CssBaseline,
    Dialog, // new item
    DialogActions, // new item
    DialogContent, // new item
    DialogContentText, // new item
    DialogTitle // new item
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { theme } from '../../Theme/themes';
import { DataTable } from '../../components';
import { TransactionForm } from "../TransactionForm";

const drawerWidth = 240;

const myStyles = {
    appBar : {
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        width: drawerWidth,
        alignItems: 'center',
        padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    portfolioTable: {
        display: 'flex',
        margin: '5em',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
        marginLeft: 0,
    },
    toolbar:{
        display: 'flex',
    },
    toolbar_button: {
        marginLeft: 'auto',
        backgroundColor: theme.palette.primary.contrastText,
        '&hover':{
            backgroundColor: theme.palette.primary.contrastText
        }
    }
};

export const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDrawerOpen = () =>{
        setOpen(true);
    }

    const handleDrawerClose = () =>{
        setOpen(false);
    }

    const handleDialogClickOpen = () => {
        setDialogOpen(true);
    }
    
    const handleDialogClickClose = () => {
        setDialogOpen(false);
    }

    const itemsList = [
        {
            text: 'Dashboard',
            onClick: () => navigate('/dashboard')
        },
        {
            text: 'Portfolio',
            onClick: () => navigate('/portfolio')
        },
        {
            text: 'Stonks Search',
            onClick: () => navigate('/search')
        },
        {
            text: 'Account',
            onClick: () => navigate('/account')
        },
        {
            text: 'Logout',
            onClick: () => 
                fetch('http://127.0.0.1:5000/auth/logout',{
                    method:"POST",
                    headers:{
                        'content-type':'application/json',
                        "Access-Control-Allow-Origin": "*"
                    }
                }).then(data=> {window.location.href = 'http://localhost:3000/'})
        }
    ]
    return(
        <Box sx={{display:'flex'}}>
            <CssBaseline />
            <AppBar
                sx={open ? myStyles.appBarShift : myStyles.appBar}
                position={'fixed'}>
                    <Toolbar sx={myStyles.toolbar}>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            onClick={handleDrawerOpen}
                            edge='start'
                            sx={open ? myStyles.hide : myStyles.menuButton}>
                                <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' noWrap>Dashboard</Typography>
                        <Button sx={myStyles.toolbar_button} onClick={handleDialogClickOpen}>New Transaction</Button>
                        <Dialog open={dialogOpen} onClose={handleDialogClickClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add New Transaction</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Add A New Transaction</DialogContentText>
                            <TransactionForm />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick = {handleDialogClickClose} color="primary">Cancel</Button>
                            <Button onClick={handleDialogClickClose} color = "primary">Done</Button> 
                        </DialogActions>
                        </Dialog>
                    </Toolbar>
            </AppBar>
            <MUIDrawer
                sx={open ? myStyles.drawer : myStyles.hide}
                variant = 'persistent'
                anchor="left"
                open={open}
                style={{width: drawerWidth}}>
                    <Box sx={myStyles.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </Box>
                    <Divider />
                    <List>
                        { itemsList.map( (item) =>{
                            const {text, onClick} = item;
                            return(
                                <ListItem button key ={text} onClick={onClick}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            )
                        })}
                    </List>
            </MUIDrawer>
            <Box sx={myStyles.content}>
                <Box sx={myStyles.portfolioTable}>
                    <DataTable />
                </Box>
            </Box>
        </Box>
    )
}