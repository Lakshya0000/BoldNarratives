import React from 'react';
import { Heading } from '../components/Heading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

const Signin = () => {

    const handleSignup = async () => {

    };

    return (
        <div>
            <div className='h-screen  bg-custom-teal flex justify-center items-center '>
                
                <div className='absolute top-0 left-0 flex flex-row items-center justify-center'>
                    
                    <img src=" /blog2.png" alt="" className='w-32' />
                    <div className='text-white text-4xl font-bold font-sans -ml-5'>Bold Narratives</div>
                </div>
                <div className='h-1/2 w-96 text-center shadow-md rounded-md bg-white flex  flex-col'>
                    <div className='flex justify-center flex-col items-center'>
                        <Heading label={"Sign In"} />
                        <div className='p-4 text-slate-500'>Enter you information to create to Log in  </div>
                    </div>

                    <InputBox label={"Email"} place={"aditya@gmail.com"} onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                    <InputBox label={"Password"} place={"Password"} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <Button label={"Sign In"} onClick={handleSignup} />

                    <div>
                        Already have an account? <Link to={"/signup"} className=' underline'>Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
