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
import {
  FaBuilding,
  FaCalendarAlt,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const AppliedJobs = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  // Function to get status badge with color
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-500">
            <FaCheckCircle className="mr-1" />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-500">
            <FaTimesCircle className="mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-500">
            <FaClock className="mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-500">
            Unknown
          </Badge>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200 mt-10">
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📄 Applied Jobs
      </h2>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table className="w-full border border-gray-100 rounded-lg">
          {/* Table Header */}
          <TableHeader className="bg-gray-100 text-gray-600">
            <TableRow>
              <TableHead className="text-left font-semibold text-gray-600">
                <FaBuilding className="inline-block mr-2 text-gray-500" />
                Company Name
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-600">
                <FaCalendarAlt className="inline-block mr-2 text-gray-500" />
                Applied On
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-600">
                <FaUserTie className="inline-block mr-2 text-gray-500" />
                Role
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-600">
                📊 Status
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {allAppliedJobs.length > 0 ? (
              allAppliedJobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  {/* Company Name */}
                  <TableCell className="py-4 px-6 text-gray-700 font-medium">
                    {job?.job?.company?.name || "N/A"}
                  </TableCell>

                  {/* Applied On */}
                  <TableCell className="py-4 px-6 text-gray-500">
                    {job?.createdAt?.split("T")[0] || "N/A"}
                  </TableCell>

                  {/* Role */}
                  <TableCell className="py-4 px-6 text-gray-500">
                    {job?.job?.title || "N/A"}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="py-4 px-6">
                    {getStatusBadge(job?.status)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
                  No jobs applied yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          Showing {allAppliedJobs.length} applied job(s).
        </p>
      </div>
    </div>
  );
};

export default AppliedJobs;
