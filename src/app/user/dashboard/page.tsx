"use client";

import { redirect } from "next/navigation";
import React from "react";

const Dashboard = () => {

  React.useEffect(()=>{
    localStorage.getItem("user") === null && redirect("/")
  },[])

  return (
    <>
    <div className="border-4 border-grey-600 w-70 h-full m-6" style={{height:"33em"}}>

    </div>
    </>
  )
}

export default Dashboard;