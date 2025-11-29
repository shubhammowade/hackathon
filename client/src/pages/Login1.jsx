import React, { useState } from 'react'
import { motion } from "framer-motion";
import { toast } from 'react-toastify'
import { FiArrowUpRight, FiStar } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/user';
export const Login = () => {
  return (
    <section className="grid min-h-screen grid-cols-1 bg-slate-50 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px]">
      <Logo />
      <Form />
    </section>
  );
};

const Form = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get navigate function reference
  const navigate = useNavigate()

  const onLogin = async () => {
    if (email.length == 0) {
      toast.warning('please enter email')
    } else if (password.length == 0) {
      toast.warning('please enter password')
    } else {
      const response = await login(email, password)
      console.log(response)
      if (response['status'] == 'success') {
        toast.success('login successful')

        localStorage.setItem('token', response['data']['token'])
        localStorage.setItem('email', response['data']['email'])
        navigate('/navbar')
      } else {
        toast.error(response['error'])
      }
    }
  }

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center pb-4 pt-20 md:py-5"
    >
      <div className="mx-auto my-auto max-w-lg px-4 md:pr-0">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-4xl font-semibold"
        >
          Login here
        </motion.h1>
        <form onSubmit={(e) => e.preventDefault()} className="w-full">
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="email-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Email<span className="text-red-600">*</span>
            </label>
            <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
              id="email-input"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label
              htmlFor="password-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Password<span className="text-red-600">*</span>
            </label>
            <input
             onChange={(e) => {
              setPassword(e.target.value)
            }}
              id="password-input"
              type="password"
              placeholder="Enter your password"
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
            type="submit" onClick={onLogin}
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