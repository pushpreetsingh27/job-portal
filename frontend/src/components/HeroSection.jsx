import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query , setQuery] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBrowseJob = () =>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }


  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        {/* Hero Content */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800 mb-6">
          Discover <span className="text-blue-600">Top Jobs</span> and{" "}
          <span className="text-blue-600">Start Your Career</span> Today!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Join thousands of <span className="font-bold text-blue-500">students</span>,{" "}
          <span className="font-bold text-blue-500">professionals</span>, and
          career changers exploring{" "}
          <span className="underline">limitless opportunities</span> with us.
        </p>

        <div className=" mb-8 flex  gap-2 items-center border  w-[500px]">
      <Input
        type="text"
        onChange={(e)=> setQuery(e.target.value)}
        className="p-2 flex-grow outline-none"
        placeholder="Search..."
      
      />
      <Button
      onClick = {handleBrowseJob}
        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
  
      >
        Search
      </Button>
    </div>


        {/* Call to Action */}
        <p className="text-sm text-gray-500">
          🎯 Join <span className="font-bold text-blue-600">1,00,000+</span> job seekers who trust us!
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
