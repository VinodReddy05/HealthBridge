import React from 'react'
// import SupaBase from '../../SupaBase'

const Login = () => {

//  console.log( import.meta.env.VITE_NAME);

 const babu = import.meta.env.VITE_NAME
const babuA = import.meta.env.VITE_SUPABASE_URl
//  const babu = import.meta.env.VITE_NAME

console.log(babu);
console.log(babuA)



 
  return (
    <div>
      <h1>Login</h1>
      {/* <SupaBase/> */}

    </div>
  )
}

export default Login
