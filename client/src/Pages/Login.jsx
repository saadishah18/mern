import React from 'react'
import { useState } from 'react';
import {Link,  useNavigate} from "react-router-dom";


export default function Login() {

  const [formData, setFormDate] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormDate(
      {
        ...formData,
        [e.target.id] :e.target.value
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try{
      const res = await fetch('/api/auth/signin', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success == false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/');
      console.log(data);
    }catch(error){
      setLoading(false);
      setError(error.message);
    }
    
  }

  console.log(formData);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80'>
          { loading ? 'Loading.....' : 'Sign In'}
        </button>
        <button className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-80'>
          Google Sign up
        </button>
        <div className='flex gap-2 mt-5'>
          <p>Don't have an account?</p>
          <Link to={'/sign-in'}>
            <span className='text-blue-700'>Sign in</span>
          </Link>
        </div>
        {error &&<p className='text-red-500 mt-5'>{error}</p>}
      </form>
    </div>
  )
}
