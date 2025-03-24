import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FaBuilding, FaCalendarAlt, FaUserTie, FaCheckCircle } from "react-icons/fa";

const AppliedJobs = () => {
  const jobData = [
    {
      id: 1,
      companyName: "Google",
      appliedOn: "2025-03-20",
      role: "Frontend Developer",
      status: "Approved",
    },
    {
      id: 2,
      companyName: "Microsoft",
      appliedOn: "2025-03-18",
      role: "UI/UX Designer",
      status: "Pending",
    },
    {
      id: 3,
      companyName: "Amazon",
      appliedOn: "2025-03-15",
      role: "React Developer",
      status: "Rejected",
    },
    {
      id: 4,
      companyName: "Meta",
      appliedOn: "2025-03-10",
      role: "Backend Developer",
      status: "Approved",
    },
    {
      id: 5,
      companyName: "Apple",
      appliedOn: "2025-03-05",
      role: "Full Stack Developer",
      status: "Pending",
    },
  ];

  // Status Color Mapping
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-600 border-green-400">
            <FaCheckCircle className="mr-1" />
            Approved
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-600 border-yellow-400">
            ⏳ Pending
          </Badge>
        );
      case "Rejected":
        return (
          <Badge className="bg-red-100 text-red-600 border-red-400">
            ❌ Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-600 border-gray-400">
            ⏳ Pending
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Applied Jobs
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="w-full border border-gray-100 rounded-lg">
          {/* Table Header */}
          <TableHeader className="bg-gray-100 text-gray-600">
            <TableRow>
              <TableHead className="text-left font-semibold text-gray-600">
                <FaBuilding className="inline-block mr-2" />
                Company Name
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-600">
                <FaCalendarAlt className="inline-block mr-2" />
                Applied On
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-600">
                <FaUserTie className="inline-block mr-2" />
                Role
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-600">
                📊 Status
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {jobData.map((job) => (
              <TableRow
                key={job.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <TableCell className="py-4 px-6 text-gray-700 font-medium">
                  {job.companyName}
                </TableCell>
                <TableCell className="py-4 px-6 text-gray-500">
                  {job.appliedOn}
                </TableCell>
                <TableCell className="py-4 px-6 text-gray-500">
                  {job.role}
                </TableCell>
                <TableCell className="py-4 px-6">{getStatusBadge(job.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobs;
