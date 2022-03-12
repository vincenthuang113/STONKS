import React, { useState } from "react";
import { Alert, Avatar, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Input, InputAdornment, Link, Paper, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ServerResponse } from "http";



const signupStyles = {
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
        marginTop: '4%',
    },
    padding:{
        // marginTop: '3%',
        paddingLeft: '5px'
    }
}

interface State {
    password: string;
    showPassword: boolean;
}



export const SignUp = () => {
    // hooks
    
    const [show, setShow] = useState(true)
    const [serverResponse, setServerResponse] = useState('')
    const { register, watch, handleSubmit, formState:{errors} } = useForm();
    // style
    const paperStyle = {padding:'40px 70px', width:500, margin:'50px auto'}
    const headerStyle = {margin:'10px', marginLeft:'0px', marginBottom:'5px'}
    const avatarStyle = {backgroundColor: '#1bbd7e'}
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

    // onclick submit 
    const submitForm = (data:any) =>{
        if(data.password === data.confirmPassword){
            const body={
                firstname:data.firstname, 
                lastname:data.lastname,
                username:data.username,
                email:data.email,
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
            fetch('http://127.0.0.1:5000/auth/signup', requestOptions)
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                setServerResponse(data.message)
                console.log(serverResponse)
                setShow(true)
                if(data.message == 'User created successfully'){
                    alert('User created successfully!')
                    window.location.href = 'http://localhost:3000/login'
                }else{
                    alert('Username already exists.')
                }
            })
            .catch(err=>console.log(err))
            // reset()
        }
        else{
            alert('Passwords do not match')
        }
    }

    const [agree, setAgree] = useState(false);

    const checkboxHandler = () => {
        // if agree === true, it will be set to false
        // if agree === false, it will be set to true
        setAgree(!agree);
        // Don't miss the exclamation mark
    }



    return (
        <Grid style={{marginTop:'5%', backgroundColor:'#117864', borderTop:'2px white solid', borderBottom:'2px white solid'}}>
            
            <Paper elevation={20} style={paperStyle}>
                <Grid justifyContent={'center'}>
                
                    <Avatar style={avatarStyle} >
                        <StackedLineChartIcon />
                    </Avatar>
                
                    <h1 style={headerStyle}>SIGN UP</h1>
                    <Typography variant='caption'>
                        Please fill this form to create an account.
                    </Typography>
                </Grid>
                <form>
                    <TextField fullWidth 
                        label="First Name" 
                        style={signupStyles.fname} 
                        {...register('firstname',{required:true, maxLength:25})}
                    />
                    <TextField fullWidth 
                        label='Last Name' 
                        style={signupStyles.lname} 
                        {...register('lastname',{required:true, maxLength:25})}
                    />
                    <TextField fullWidth 
                        label='Username' 
                        style={signupStyles.field} 
                        {...register('username',{required:true, maxLength:25})}
                    />
                    {errors.username &&<span style={{color:'red', fontFamily:'arial', fontSize:'13px', paddingLeft:'5px'}}> Username is required </span>}
                    <br />
                    {errors.username?.type==="maxLength"&&<span style={{color:'red', fontFamily:'arial', fontSize:'13px', paddingLeft:'5px'}}> Maximum length should be 25 </span>}
                    <TextField fullWidth 
                        label='Email' 
                        style={signupStyles.field} 
                        {...register('email',{required:true, maxLength:80})}
                    />
                    {errors.email &&<span style={{color:'red', fontFamily:'arial', fontSize:'13px', paddingLeft:'5px'}}> Email is required </span>}
                    <br />
                    {errors.email?.type==="maxLength"&&<span style={{color:'red', fontFamily:'arial', fontSize:'13px', paddingLeft:'5px'}}> Maximum length should be 80 </span>}
                    <TextField fullWidth 
                        label='Password' 
                        style={signupStyles.field} 
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
                    {errors.password?.type==="minLength"&&<span style={{color:'red', fontFamily:'arial', fontSize:'13px', paddingLeft:'5px'}}> Minimum length should be 8 </span>}
                    <TextField fullWidth 
                        label='Confirm Password' 
                        style={signupStyles.field} 
                        color="warning" 
                        {...register('confirmPassword',{required:true, minLength:8})}
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
                    {errors.confirmPassword &&<span style={{color:'red', fontFamily:'arial', fontSize:'13px', paddingLeft:'5px'}}> Please confirm password </span>}
                    <FormGroup>
                        <FormControlLabel 
                            style={{paddingLeft:'5px'}}
                            control={<Checkbox onChange={checkboxHandler} /> } 
                            label={
                                <p>I agree to <Link href='/Login'> terms and conditions</Link></p>} 
                        />
                    </FormGroup>
                    <Button type='submit' variant='contained' color='primary' style={signupStyles.field} disabled={!agree} onClick={handleSubmit(submitForm)}>Submit</Button>
                    <br />
                    <br />
                    <Typography variant='caption' style={signupStyles.padding}> 
                        Already have an account? <Link href='/Login'>Login</Link>
                        <br /><Link style={signupStyles.padding} href='/'>Back to Home</Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>

    );
};

function reset() {
        throw new Error("Function not implemented.");
    }
