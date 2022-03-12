import React, { useState } from "react";
import { Avatar, Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Input, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";


const signinStyles = {
    fname:{
        width: '47.5%',
        marginRight: '2.5%',
        marginTop: '5%',
        marginBotton: '5%'
    },
    lname:{
        width: '47.5%',
        marginLeft: '2.5%',
        marginTop: '5%',
        marginBotton: '5%'
    },
    field:{
        marginTop: '5%',
    },
}

interface State {
    password: string;
    showPassword: boolean;
}

export const Login = () => {
    // hooks

    const [show, setShow] = useState(true)
    const [serverResponse, setServerResponse] = useState('')
    const { register, watch, handleSubmit, formState:{errors} } = useForm();
    // style
    const paperStyle = {padding:'50px 50px', width:400, margin:'50px auto'}
    const headerStyle = {margin:'10px', marginLeft:'0px'}
    const avatarStyle = {backgroundColor: '#1bbd7e'}

    const loginUser = (data:any) =>{
        const body={
            username:data.username, 
            password:data.password
        }
        const requestOptions = {
            method:"POST",
            headers:{
                'content-type':'application/json',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(body)
        }
        fetch('http://127.0.0.1:5000/auth/signin', requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setServerResponse(data.message)
            console.log(serverResponse)
            setShow(true)
            if(data.message == 'Login successfully'){
                alert('Welcome to stonks!')
                var loginStatus = 'YES'
                window.location.href = 'http://localhost:3000/dashboard'
            }else{
                alert('Username or Password is incorrect.')
                var loginStatus = 'NO'
            }
        })
        .catch(err=>console.log(err))
    }
    // password invisible
    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    });
    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Grid style={{marginTop:'5%', backgroundColor:'#117864', borderTop:'2px white solid', borderBottom:'2px white solid'}}>
            <Paper elevation={20} style={paperStyle}>
                <Grid justifyContent={'center'}>
                    <Avatar style={avatarStyle} >
                        <StackedLineChartIcon />
                    </Avatar>
                
                    <h1 style={headerStyle}>SIGN IN</h1>
                    <Typography variant='caption'>
                        Stonks.
                    </Typography>
                </Grid>
                <form>
                    <TextField fullWidth 
                        label='Username' 
                        style={signinStyles.field} 
                        {...register('username',{required:true, maxLength:25})}
                    />
                    {errors.username &&<span style={{color:'red', fontFamily:'arial', fontSize:'13px', paddingLeft:'5px'}}> Username is required </span>}
                    <br />
                    {errors.username?.type==="maxLength"&&<span style={{color:'red', fontFamily:'arial', fontSize:'13px', paddingLeft:'5px'}}> Maximum length should be 25 </span>}
                    <TextField fullWidth 
                        label='Password' 
                        style={signinStyles.field} 
                        {...register('password',{required:true, minLength:8})}
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {errors.password &&<span style={{color:'red', fontFamily:'arial', fontSize:'13px', paddingLeft:'5px'}}> Password is required </span>}
                    <br />
                    <Button type='submit' variant='contained' color='primary' style={signinStyles.field} onClick={handleSubmit(loginUser)}>Submit</Button>
                    <br />
                    <br />
                    <Typography variant='caption' style={signinStyles.field}> 
                        Do not have an account? <Link href='/SignUp'>Sign Up</Link>
                        <br /><Link href='/'>Back to Home</Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>

    );
};