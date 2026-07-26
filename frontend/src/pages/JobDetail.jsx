import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await axios.get(`http://localhost:4000/job/${id}`);
        console.log(res.data.job);
        setJob(res.data.job);
      } catch (error) {
        console.log(error);
      } fontFinally: {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  /* Loading State - Enterprise Skeleton */
  if (loading || !job) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-6 bg-slate-200 rounded w-28 animate-pulse"></div>
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sm:p-8 space-y-6 animate-pulse shadow-sm">
            <div className="h-8 bg-slate-200 rounded w-2/3"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-lg"></div>
              ))}
            </div>
            <div className="space-y-3 pt-4">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-100 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Available Jobs
          </button>
        </div>

        {/* Main Job Detail Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          
          {/* Header Banner Section */}
          <div className="p-6 sm:p-8 border-b border-[#E2E8F0] bg-white">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                    {job.title}
                  </h1>
                  {job.status && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-[#22C55E] border border-emerald-200 uppercase tracking-wider">
                      {job.status}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[#64748B]">
                  Requisition ID: <span className="font-mono text-xs">{job._id || id}</span>
                </p>
              </div>

              {/* Primary Call To Action */}
              <button
                onClick={() => navigate(`/apply-job/${id}`)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 shrink-0"
              >
                Apply for this Position
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Key Information Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#E2E8F0]">
              
              {/* Location */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-xs font-medium text-[#64748B] block">Location</span>
                <span className="text-sm font-semibold text-[#0F172A] mt-0.5 block truncate">
                  {job.location || "N/A"}
                </span>
              </div>

              {/* Work Mode */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-xs font-medium text-[#64748B] block">Work Mode</span>
                <span className="text-sm font-semibold text-[#0F172A] mt-0.5 block">
                  {job.workMode || "N/A"}
                </span>
              </div>

              {/* Job Type */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-xs font-medium text-[#64748B] block">Job Type</span>
                <span className="text-sm font-semibold text-[#0F172A] mt-0.5 block">
                  {job.jobType || "N/A"}
                </span>
              </div>

              {/* Vacancies */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-xs font-medium text-[#64748B] block">Vacancies</span>
                <span className="text-sm font-semibold text-[#0F172A] mt-0.5 block">
                  {job.vacancies ? `${job.vacancies} Positions` : "N/A"}
                </span>
              </div>

              {/* Salary Range */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-xs font-medium text-[#64748B] block">Salary Range</span>
                <span className="text-sm font-semibold text-[#0F172A] mt-0.5 block">
                  {job.salaryMin || job.salaryMax
                    ? `PKR ${job.salaryMin || 0} - ${job.salaryMax || 0}`
                    : "Competitive"}
                </span>
              </div>

              {/* Application Deadline */}
              <div className="bg-[#F8FAFC] p-3.5 rounded-lg border border-[#E2E8F0]">
                <span className="text-xs font-medium text-[#64748B] block">Application Deadline</span>
                <span className="text-sm font-semibold text-[#0F172A] mt-0.5 block">
                  {job.applicationDeadline
                    ? new Date(job.applicationDeadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Open until filled"}
                </span>
              </div>

            </div>
          </div>

          {/* Body Content Details */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Description */}
            <div>
              <h3 className="text-base font-bold text-[#0F172A] uppercase tracking-wider text-xs mb-3 text-blue-600">
                Job Description
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Requirements */}
            {job.requirements && (
              <div className="pt-6 border-t border-[#E2E8F0]">
                <h3 className="text-base font-bold text-[#0F172A] uppercase tracking-wider text-xs mb-3 text-blue-600">
                  Role Requirements
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed whitespace-pre-line">
                  {job.requirements}
                </p>
              </div>
            )}

            {/* Skills & Competencies */}
            {job.skills && job.skills.length > 0 && (
              <div className="pt-6 border-t border-[#E2E8F0]">
                <h3 className="text-base font-bold text-[#0F172A] uppercase tracking-wider text-xs mb-3 text-blue-600">
                  Required Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((item, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Action Bar */}
          <div className="p-6 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#64748B]">
              Ready to apply? Make sure your resume is up to date before submitting.
            </p>
            <button
              onClick={() => navigate(`/apply-job/${id}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
            >
              Apply Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default JobDetail;