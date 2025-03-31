import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


 
  
  
 
  
  const JobTable = () => {
    const {allAdminJobs} = useSelector(store => store.job)
    const navigate = useNavigate()

    return (
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-100 mt-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📊 Job List
        </h2>
  
        <div className="overflow-x-auto">
          <Table className="w-full border border-gray-200 rounded-lg">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="w-24 text-gray-600 font-semibold">
                Company 
                </TableHead>
                <TableHead className="text-gray-600 font-semibold">
                Role
                </TableHead>
                <TableHead className="text-gray-600 font-semibold">
                  Added On
                </TableHead>
                <TableHead className="text-right text-gray-600 font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAdminJobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <TableCell className="w-48 text-gray-600 ">
                  {job?.company?.name}
                  </TableCell>
                  <TableCell className="text-gray-600">  {job?.title}</TableCell>
                  <TableCell className="text-right">
                    {/* <Button
                    onClick = {() =>navigate(`/admin/companies/${job._id}`)}
                      size="sm"
                      className="mr-2 bg-black text-white "
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
  
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Showing {allAdminJobs.length} Jobs in the list.
          </p>
        </div>
      </div>
    );
  };
  
  export default JobTable;
  