import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingList = () => {
  return (
    <div className="space-y-6 mb-8">
    {/* Stats Overview Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
          <Skeleton height={20} width={100} />
          <Skeleton height={32} width={60} className="mt-2" />
        </div>
      ))}
    </div>

    {/* Table Skeleton */}
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <Skeleton height={24} width={150} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Order ID", "Customer", "Date", "Total", "Status"].map((header) => (
                <th key={header} className="px-6 py-4 text-left">
                  <Skeleton height={20} width={80} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                {[1, 2, 3, 4, 5].map((j) => (
                  <td key={j} className="px-6 py-4">
                    <Skeleton height={20} width={j === 2 ? 150 : 80} />
                    {j === 2 && <Skeleton height={16} width={120} className="mt-1" />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default LoadingList;