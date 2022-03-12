import React from 'react';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import stonks_image from '../../assets/images/stonks.png';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { url } from 'inspector';
import stonks1 from '../../assets/images/stonks1.png';

interface Props{
    title: string;

}

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
    // display:'flex',
    // flexDirection: 'row',
})
const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})


export const Home = ( props: Props) =>{
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
                        <NavA to="/About" style={{fontFamily:'arial', color:'white', textDecoration:'none'}}>About</NavA>
                    </li>
                    <li className="menu-items">
                        <NavA to="/account" style={{fontFamily:'arial', color:'white', textDecoration:'none'}}>Account</NavA>
                    </li>
                </LogoNavigation>
            </NavBarContainer>
            <Main>
            <video className='videoTag' autoPlay loop muted
                style={{
                    position:'absolute',
                    width:'100%',
                    height:'100%',
                    objectFit:'cover'
                }}>
                <source src={'https://res.cloudinary.com/dybqsl32o/video/upload/v1647001145/1_tatn7l.mov'} type='video/mp4' />
            </video>
                {/* <img src={require('../../assets/images/stonks1.png')} style={{height:'80%'}}/> */}
                <div style={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center'}}>
                    <h1 style={{color:'white', fontFamily:'arial', fontSize:'13em', margin:'0.7em'}}>STONKS</h1>
                    <Button className='but' color='secondary' variant='contained' href='/login' size='large' style={{}} >Sign In</Button>
                </div>
            </Main>
        </Root>
    )
}

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

// #117864