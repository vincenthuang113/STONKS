
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
    // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${stonks_image});`,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center'
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


export const About = ( ) =>{
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
                <div style={{backgroundColor:'black', width:'40%'}}>
                    <img src={require('../../assets/images/stonks1.png')} style={{height:'90%', position:'relative', marginLeft:'12em'}}/>
                </div>
                <div style={{backgroundColor:'#A6CDC5', width:'1%'}}></div>
                <div style={{backgroundColor:'white', width:'3%'}}></div>
                <div style={{backgroundColor:'#18B092', width:'2%'}}></div>
                <div style={{backgroundColor:'#117864', width:'55%'}}>
                    <h1 style={{color:'white', margin:'2em', marginBottom:'1em',fontFamily:'arial', fontWeight:'200', fontSize:'3em', textAlign:'end'}}>ABOUT US</h1>
                    <img src={require('../../assets/images/up.png')} style={{height:'55%', position:'absolute', paddingTop:'10em', marginLeft:'11em', opacity:'0.7'}}/>
                    <h2 style={{color:'white', marginRight:'4.1em', marginLeft:'13em', fontFamily:'arial', fontWeight:'100', textAlign:'justify', lineHeight:'1.8', position:'relative'}}>
                        STONKS, originally a meme, and now a technology-driven private wealth service that allows you to track, understand, and take control of your stock portfolio.
                        We believe that you should have a clear, and understandable view of your assets and investments. Become the next Warron Buffet or Cathie Woods!
                    </h2>
                    
                </div>
                
                
            </Main>
        </Root>
    );  
}