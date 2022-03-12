
import React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import stonks_image from '../../assets/images/stonks.png';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { url } from 'inspector';
import stonks1 from '../../assets/images/stonks1.png';


// create styled components 
const Root = styled('div')({
    padding: 0,
    margin: 0
})

const NavBarContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const Logo = styled('h1')({
    margin: '0 0 0 0.45em'
})

const LogoA = styled(Link)( {
    color: 'rgb(28,24,22)',
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none'
})
const LogoNavigation = styled('ul')( {
    listStyle: 'none',
    textTransform: 'uppercase',
    textDecoration: 'none',
    display: 'flex'
})

const NavA = styled(Link)({
    display: 'block',
    padding: '1em',
    color: 'black'
})

const Main = styled('main')( {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
    display:'flex',
    flexDirection: 'row',
})


const navStyles = {
    navbarContainer:{
        background: 'black',
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    navigation:{
        color: 'white',
        display: 'flex',
        justifyContent:'center',
        textDecoration: 'none',
        font:'arial',
        height: '100%',
        cursor: 'pointer',
    }
}


export const Account = ( ) =>{
    return(
        <Root>
            <NavBarContainer style={navStyles.navbarContainer}>
                <Logo>
                    <StackedLineChartIcon style={{fontSize:'1.8rem', color:'white'}} />
                    <LogoA to="/" style={{fontFamily:'arial', marginLeft:'6px', color:'white'}}>STONKS</LogoA>
                </Logo>
                <LogoNavigation>
                    <li className="menu-items"> 
                        <NavA to="/" style={{fontFamily:'arial', color:'white', textDecoration:'none'}}>Home</NavA>
                    </li >
                    <li className="menu-items">
                        <NavA to="/about" style={{fontFamily:'arial', color:'white', textDecoration:'none'}}>About</NavA>
                    </li>
                    <li className="menu-items">
                        <NavA to="/account" style={{fontFamily:'arial', color:'white', textDecoration:'none'}}>Account</NavA>
                    </li>
                </LogoNavigation>
            </NavBarContainer>
            <Main>
                <div style={{backgroundColor:'black'}}></div>
                <div style={{backgroundColor:'white'}}>
                    <h1 style={{color:'white'}}>About Me</h1>
                </div>
            </Main>
        </Root>
    );  
}