import React, { useState } from "react";
import axios from "axios";

const JobForm = () => {
  const [skillInput, setSkillInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    skills: [],
    salaryMin: "",
    salaryMax: "",
    jobType: "Full-Time",
    location: "",
    workMode: "Onsite",
    vacancies: 1,
    status: "Open",
    applicationDeadline: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function addSkill() {
    const skill = skillInput.trim();
    if (!skill) {
      return;
    }
    if (formData.skills.includes(skill)) {
      alert("skill already added");
      return;
    }
    setFormData({
      ...formData,
      skills: [...formData.skills, skill],
    });
    setSkillInput("");
  }

  function removeSkill(skillToRemove) {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      salaryMin: Number(formData.salaryMin),
      salaryMax: Number(formData.salaryMax),
      vacancies: Number(formData.vacancies),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/create-job",
        payload
      );

      console.log("Success:", response.data);
      alert("Job created successfully!");

      setFormData({
        title: "",
        description: "",
        requirements: "",
        skills: [],
        salaryMin: "",
        salaryMax: "",
        jobType: "Full-Time",
        location: "",
        workMode: "Onsite",
        vacancies: 1,
        status: "Open",
        applicationDeadline: "",
      });

      setSkillInput("");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Main Header */}
        <div className="pb-6 border-b border-[#E2E8F0]">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Create New Job Requisition
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Post a new job opening to start receiving and evaluating candidate applications.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                Basic Information
              </h2>

              {/* Job Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                >
                  Job Title <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior MERN Stack Developer"
                  className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#64748B]"
                  required
                />
              </div>

              {/* Job Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                >
                  Job Description <span className="text-[#EF4444]">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the responsibilities, project scope, and daily tasks..."
                  className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#64748B] resize-y"
                  required
                />
              </div>

              {/* Requirements */}
              <div>
                <label
                  htmlFor="requirements"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                >
                  Requirements
                </label>
                <input
                  id="requirements"
                  type="text"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="e.g. BSCS, 2+ Years Experience, REST API Integration"
                  className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#64748B]"
                />
              </div>

              {/* Skills Tag Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2">
                  Required Skills & Technologies
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="e.g. React.js, Node.js, MongoDB"
                    className="flex-1 px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#64748B]"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2.5 text-sm font-medium text-[#0F172A] bg-slate-100 border border-[#E2E8F0] hover:bg-slate-200 rounded-lg transition-colors focus:outline-none shrink-0"
                  >
                    Add Skill
                  </button>
                </div>

                {/* Display Skills Badges */}
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-blue-50 text-[#2563EB] border border-blue-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-600 focus:outline-none leading-none text-sm font-bold"
                          title="Remove skill"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <hr className="border-[#E2E8F0]" />

            {/* Section 2: Role Details & Compensation */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                Classification & Compensation
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Minimum Salary */}
                <div>
                  <label
                    htmlFor="salaryMin"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                  >
                    Minimum Salary (PKR)
                  </label>
                  <input
                    id="salaryMin"
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#64748B]"
                  />
                </div>

                {/* Maximum Salary */}
                <div>
                  <label
                    htmlFor="salaryMax"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                  >
                    Maximum Salary (PKR)
                  </label>
                  <input
                    id="salaryMax"
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="e.g. 80000"
                    className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#64748B]"
                  />
                </div>

                {/* Job Type */}
                <div>
                  <label
                    htmlFor="jobType"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                {/* Work Mode */}
                <div>
                  <label
                    htmlFor="workMode"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                  >
                    Work Mode
                  </label>
                  <select
                    id="workMode"
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">Onsite</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="border-[#E2E8F0]" />

            {/* Section 3: Location & Logistics */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                Logistics & Availability
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Karachi, Pakistan"
                    className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all placeholder:text-[#64748B]"
                  />
                </div>

                {/* Vacancies */}
                <div>
                  <label
                    htmlFor="vacancies"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                  >
                    Vacancies
                  </label>
                  <input
                    id="vacancies"
                    type="number"
                    name="vacancies"
                    min="1"
                    value={formData.vacancies}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all"
                  />
                </div>

                {/* Application Deadline */}
                <div>
                  <label
                    htmlFor="applicationDeadline"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0F172A] mb-2"
                  >
                    Application Deadline
                  </label>
                  <input
                    id="applicationDeadline"
                    type="date"
                    name="applicationDeadline"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm text-[#0F172A] bg-white border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action Bar */}
            <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Publishing Job..." : "Publish Job Opening"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default JobForm;