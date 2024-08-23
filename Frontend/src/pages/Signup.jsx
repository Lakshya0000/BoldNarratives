import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
const Signup = () => {
    
    const navigate =useNavigate();
    const handleSignin = async () => {
      
    };
  
    
      return (
          <div className='h-screen bg-custom-teal flex justify-center items-center'>
             <div className='absolute top-0 left-0 flex flex-row items-center justify-center'>
                    
                    <img src=" /blog2.png" alt="" className='w-32' />
                    <div className='text-white text-4xl font-bold font-sans -ml-5'>Bold Narratives</div>
                </div>
            <div className='h-4/6 w-96 text-center shadow-md rounded-md bg-custom-white flex  flex-col'>
              <div className='flex justify-center flex-col items-center'>
              <Heading label={"Sign up"}/>
              <div className='p-4 text-slate-500'>Enter you information to create an account </div>
              </div>
              <InputBox label={"First Name"} place={"Aditya"} onChange={(e)=>{
                setFirstname(e.target.value);
              }}/>
              <InputBox label={"Last Name"} place={"G"} onChange={(e)=>{
                setLastname(e.target.value);
              }}/>
              <InputBox label={"Email"} place={"aditya@gmail.com"} onChange={(e)=>{
                setUsername(e.target.value);
              }}/>
              <InputBox label={"Password"} place={"Password"} onChange={(e)=>{
                setPassword(e.target.value);
              }}/>
              <Button label={"Sign Up"} onClick={handleSignin}/>
  
              <div>
                  Already have an account? <Link to={"/signin"} className=' underline'>Signin</Link>
              </div>
            </div>  
          </div>
      );
  }

export default Signup;
