
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Search, Briefcase } from "lucide-react";

const steps = [
    {
      icon: <Search size={40} className="text-blue-500" />, 
      title: "Search for Jobs",
      description: "Find your dream job by browsing thousands of listings."
    },
    {
      icon: <Briefcase size={40} className="text-blue-500" />,
      title: "Apply with Ease",
      description: "Submit your application quickly and easily."
    },
    {
      icon: <CheckCircle size={40} className="text-blue-500" />,
      title: "Get Hired",
      description: "Connect with recruiters and secure your next job."
    }
  ];
  
const HowItWorks = () => {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900">How It Works</h2>
        <p className="text-blue-600 mt-2">Follow these simple steps to land your dream job.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 bg-white shadow-md rounded-xl">
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold text-blue-900 mt-4">{step.title}</h3>
              <p className="text-blue-600 mt-2">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default  HowItWorks;