import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await axios.get("http://localhost:4000/get-job");
        setJobs(res.data.jobs || []);
        console.log(res.data.jobs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#E2E8F0] gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Available Jobs
            </h1>
            <p className="mt-1 text-sm text-[#64748B] ">
              Browse open requisitions, view applicant pipelines, and manage active job listings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200">
              {jobs.length} Active Requisitions
            </span>
          </div>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4 animate-pulse shadow-sm"
              >
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 rounded w-full"></div>
                  <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                </div>
                <div className="pt-4 flex justify-between items-center border-t border-[#E2E8F0]">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-9 bg-slate-200 rounded-lg w-28"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && jobs.length === 0 && (
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center shadow-sm my-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-[#64748B] flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#0F172A]">No active job openings</h3>
            <p className="text-sm text-[#64748B] mt-1">
              There are currently no open positions listed in the database.
            </p>
          </div>
        )}

        {/* Job Cards Grid */}
        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id || job.id}
                className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Title & Status */}
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-bold text-[#0F172A] tracking-tight hover:text-[#2563EB] transition-colors">
                      {job.title}
                    </h2>
                    {job.status && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#22C55E] border border-emerald-200 uppercase tracking-wider">
                        {job.status}
                      </span>
                    )}
                  </div>

                  {/* Metadata Chips (Location, Work Mode, Vacancies, Salary) */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-[#64748B]">
                    {job.location && (
                      <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                    )}

                    {job.workMode && (
                      <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.workMode}
                      </span>
                    )}

                    {job.vacancies && (
                      <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {job.vacancies} Openings
                      </span>
                    )}
                  </div>

                  {/* Job Description */}
                  <p className="mt-4 text-sm text-[#64748B] line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Footer Action Bar */}
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0F172A]">
                    {job.salary ? `PKR ${job.salary}` : "Full-Time"}
                  </span>

                  <button
                    onClick={() => navigate(`/job/${job._id || job.id}`)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Jobs;
