import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
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

        {/* Search Bar */}
        <div className="w-full max-w-xl mb-6">
          <div className="flex items-center border border-gray-300 rounded-full shadow-md overflow-hidden p-2">
            <Input
              type="text"
              placeholder="Search for job titles, companies, or skills..."
              className="w-full px-4 py-3 text-gray-700 focus:outline-none"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all">
              Search
            </Button>
          </div>
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
