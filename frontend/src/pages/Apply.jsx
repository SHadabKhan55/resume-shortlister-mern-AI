import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();

      data.append("jobId", id);
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("resume", resume);

      const res = await axios.post(
        "http://localhost:4000/apply-job",
        data
      );

      alert(res.data.message);

      setFormData({
        fullName: "",
        email: "",
      });

      setResume(null);
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Failed to submit application"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Navigation / Back Action */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors focus:outline-none"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Job Details
          </button>
        </div>

        {/* Application Form Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          
          {/* Form Header */}
          <div className="p-6 sm:p-8 border-b border-[#E2E8F0] bg-white">
            <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
              Apply For Job
            </h1>
            <p className="mt-1 text-sm text-[#64748B]">
              Please fill in your details and upload your latest CV/resume to submit your application.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            
            {/* Full Name Field */}
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
              >
                Full Name <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#64748B]"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
              >
                Email Address <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. john.doe@example.com"
                className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#64748B]"
                required
              />
            </div>

            {/* Custom Styled Resume Upload Field */}
            <div>
              <label 
                htmlFor="resume" 
                className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
              >
                Resume (PDF / DOC / DOCX) <span className="text-[#EF4444]">*</span>
              </label>
              
              <div className="relative border-2 border-dashed border-[#E2E8F0] hover:border-[#2563EB] rounded-lg p-6 text-center transition-colors bg-[#F8FAFC]">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required={!resume}
                />
                <div className="space-y-2 pointer-events-none">
                  <svg className="mx-auto h-10 w-10 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="text-sm text-[#64748B]">
                    {resume ? (
                      <span className="font-semibold text-[#2563EB]">{resume.name}</span>
                    ) : (
                      <>
                        <span className="font-semibold text-[#2563EB]">Click to upload</span> or drag and drop
                      </>
                    )}
                  </div>
                  <p className="text-xs text-[#64748B]">Supported formats: PDF, DOC, DOCX</p>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2.5 text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Apply Now"}
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default ApplyJob;