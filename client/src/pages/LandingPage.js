import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from "../components/Hero"
import { UserContext } from "../context/UserContext"

function LandingPage() {
  const navigate = useNavigate()
  const [user] = useContext(UserContext)

  useEffect(()=>{
    if(user.data) {
      navigate("/articles")
    }
  },[user, navigate])

  
  if(!user.data){
    return <Hero />
  } else {
    return <div></div>
  }
}

export default LandingPage