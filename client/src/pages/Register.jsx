
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { FiArrowUpRight, FiStar } from "react-icons/fi";
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

import { register } from '../services/user';
export const Register = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 bg-slate-50 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]">
      <Logo />
      <Form />
    </section>
  );
};


const Form = () => {

  const [first_name, setfirstname] = useState('');
  const [last_name, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmpassword] = useState('');
  const [birth, setbirth] = useState('');

  // get navigate function reference
  const navigate = useNavigate();
  const onRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    try {
        const response = await register(
          first_name,
          last_name,
          email,
          password,
          mobile,
          birth
        );
        console.log(response);
        if (response['status'] === 'success') {
        
          toast.success('Successfully registered user');
          // go to the Login page
          navigate('/login');
        } else {
          toast.error(response['error']);
        }
    } catch (error) {
        toast.error("An error occurred during registration");
    }
  };
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center pb-4 pt-5 md:py-2"
    >
      <div className="mx-auto my-auto max-w-lg px-4 md:pr-0">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-4xl font-semibold"
        >
          Create your account
        </motion.h1>

        <form onSubmit={(e) => e.preventDefault()} className="w-full">


 {/* first name */}
       <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="first_name"
              className="mb-1 inline-block text-sm font-medium"
            >
              First Name<span className="text-red-600">*</span>
            </label>
            <input    
            onChange={(e) => setfirstname(e.target.value)}
              id="first_name"
              type="text"
              placeholder="Enter your First name"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />     
          </motion.div>
{/*               last_name */}
         <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="last_name"
              className="mb-1 inline-block text-sm font-medium"
            >
              Last Name<span className="text-red-600">*</span>
            </label>
            <input
             onChange={(e) => setlastname(e.target.value)}
              type="text"
              placeholder="Enter your Last name"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />  
          </motion.div>
 {/* //email */}

   <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="email-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Email<span className="text-red-600">*</span>
            </label>
            <input
             onChange={(e) => setemail(e.target.value)}
              id="email-input"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>


          {/* //mobile */}
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="mobile"
              className="mb-1 inline-block text-sm font-medium"
            >
              Mobile <span className="text-red-600">*</span>
            </label>
            <input
            onChange={(e) => setmobile(e.target.value)}
              id="mobile"
              type="number"
              placeholder="Enter your Mobile Number"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />  
          </motion.div>

          {/* //birth */}

           <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
            onChange={(e) => setbirth(e.target.value)}
              htmlFor="dob"
              className="mb-1 inline-block text-sm font-medium"
            >
              Dob <span className="text-red-600">*</span>
            </label>
            <input
              id="dob"
              type="date"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />  
          </motion.div>

  {/* setpass */}

  <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="password-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Password<span className="text-red-600">*</span>
            </label>
            <input
            onChange={(e) => setpassword(e.target.value)}
              id="password-input"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

{/* //confirmPassword */}
             <motion.div variants={primaryVariants} className="mb-4 w-full">
            <label
              htmlFor="rt-password-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Re-type Password<span className="text-red-600">*</span>
            </label>
            <input
            onChange={(e) => setconfirmpassword(e.target.value)}
              id="rt-password-input"
              type="password"
              placeholder="Re-type your password"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>          
          <motion.div
            variants={primaryVariants}
            className="mb-4 flex w-full items-start gap-1.5"
          >
            <input
              type="checkbox"
              id="terms-checkbox"
              className="h-4 w-4 accent-indigo-600"
              required
            />
            <label htmlFor="terms-checkbox" className="text-xs">
              By signing up, I agree to the terms and conditions, privacy
              policy, and cookie policy
            </label>
          </motion.div>

          <motion.button
            variants={primaryVariants}
            whileTap={{
              scale: 0.985,
            }}
            type="submit" onClick={onRegister}
            className="mb-1.5 w-full rounded bg-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Sign up
          </motion.button>
          <motion.p variants={primaryVariants} className="text-xs">
            Already have an account?{" "}
            <a className="text-indigo-600 underline" href="#">
              Sign in
            </a>
          </motion.p>
        </form>
      </div>
    </motion.div>
  );
};

const Logo = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column' }}>
      <img src=".\images\movie-review-icon.png" style={{ width: '130px'  }}/>
      <h1 className="mb-2 text-center text-1xl font-semibold">--Movie Hub--</h1>
    </div>
  );
};


const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const avatarVariants = {
  initial: {
    x: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};