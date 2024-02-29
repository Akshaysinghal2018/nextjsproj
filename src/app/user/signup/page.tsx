"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const SignUp = () => {
  const {register,handleSubmit,watch,formState:{errors}} = useForm();
  const formData = watch();

  const formSubmit = (data:any) => {
    if(data){
      // console.log(data)
      const auth = getAuth();
      createUserWithEmailAndPassword(auth,data.email,data.password)
      .then(authUser => {
        // console.log("Success. The user is created in Firebase");
        window.location.replace("/user/signin");
      })
      .catch(error => {
        // console.log(error.message)
        toast.error(error.message)
      });
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap content-center flex">
        <form className="lg:w-1/2 md:w-full sm:w-full lg:ml-auto lg:mr-auto p-5 text-gray border-2 background-grey" onSubmit={handleSubmit(formSubmit)}>
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            User Signup
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Sign up For free Account
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
              password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button type="submit" className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Sign up 
          </button>
        </form>
      </div>
    </section>
  )
}

export default SignUp;