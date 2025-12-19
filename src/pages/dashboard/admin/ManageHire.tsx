import { FaBriefcaseMedical } from "react-icons/fa"

const ManageHire = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden font-sans transition-colors duration-300">
         {/* Header */}
         <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 flex items-center gap-2">
                    <FaBriefcaseMedical className="text-sky-600 dark:text-sky-500" />
                    Job Oppurtunities
                </h2>
                <p className="text-sm text-gray-500 dark:text-slate-400">View and manage registered doctors.</p>
            </div>
            <div className="relative">
            </div>
        </div>

         

    </div>
  )
}

export default ManageHire
