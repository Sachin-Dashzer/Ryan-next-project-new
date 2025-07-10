import { getAllBlogs } from "@/lib/blogData";
import AdminHeader from "@/components/admin/adminHeader";
import { Search, Filter, Plus, MoreHorizontal, Download } from "lucide-react";

const BlogPage = async () => {
  const blogs = await getAllBlogs();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
                <AdminHeader title="Our Blogs" />
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Blogs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-700">S.no</th>
                  <th className="text-left p-4 font-medium text-gray-700">Page Title</th>
                  <th className="text-left p-4 font-medium text-gray-700">Page URL</th>
                  <th className="text-left p-4 font-medium text-gray-700">Created At</th>
                  <th className="w-12 p-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog, index) => (
                  <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-600">{index + 1}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{blog.pageTitle}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-blue-600 hover:text-blue-800 font-medium">
                        <a href={blog.pageUrl}>Link</a>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{blog.createdAt}</td>
                    <td className="p-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                Showing {blogs.length} of {blogs.length} blogs
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;