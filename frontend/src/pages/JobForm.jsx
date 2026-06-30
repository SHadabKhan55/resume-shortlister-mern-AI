import React, { useState } from "react";
import axios from 'axios'
const JobForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requirements: "",
        skills: "",
        experience: "",
        education: "",
        salaryMin: "",
        salaryMax: "",
        jobType: "Full-Time",
        location: "",
        workMode: "Onsite",
        vacancies: 1,
        status: "Open",
        applicationDeadline: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    experience: Number(formData.experience),
    salaryMin: Number(formData.salaryMin),
    salaryMax: Number(formData.salaryMax),
    vacancies: Number(formData.vacancies),

    requirements: formData.requirements
      .split(",")
      .map((item) => item.trim()),

    skills: formData.skills
      .split(",")
      .map((item) => item.trim()),
  };

  try {
    const response = await axios.post(
      "http://localhost:4000/create-job",
      payload
    );

    console.log("Success:", response.data);

    alert("Job created successfully!");
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Job Title</label>
            <br />
            <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter job title"
                required
            />
            <br /><br />

            <label htmlFor="description">Description</label>
            <br />
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter job description"
                required
            />
            <br /><br />

            <label htmlFor="requirements">Requirements</label>
            <br />
            <input
                id="requirements"
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
            />
            <br /><br />

            <label htmlFor="skills">Skills</label>
            <br />
            <input
                id="skills"
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="JavaScript, React, Express"
            />
            <br /><br />

            <label htmlFor="experience">Experience (Years)</label>
            <br />
            <input
                id="experience"
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
            />
            <br /><br />

            <label htmlFor="education">Education</label>
            <br />
            <input
                id="education"
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="BS Computer Science"
            />
            <br /><br />

            <label htmlFor="salaryMin">Minimum Salary</label>
            <br />
            <input
                id="salaryMin"
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
            />
            <br /><br />

            <label htmlFor="salaryMax">Maximum Salary</label>
            <br />
            <input
                id="salaryMax"
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
            />
            <br /><br />

            <label htmlFor="jobType">Job Type</label>
            <br />
            <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
            >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
            </select>
            <br /><br />

            <label htmlFor="location">Location</label>
            <br />
            <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Karachi, Pakistan"
            />
            <br /><br />

            <label htmlFor="workMode">Work Mode</label>
            <br />
            <select
                id="workMode"
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
            >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
            </select>
            <br /><br />

            <label htmlFor="vacancies">Vacancies</label>
            <br />
            <input
                id="vacancies"
                type="number"
                name="vacancies"
                value={formData.vacancies}
                onChange={handleChange}
            />
            <br /><br />

            <label htmlFor="status">Status</label>
            <br />
            <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
            </select>
            <br /><br />

            <label htmlFor="applicationDeadline">Application Deadline</label>
            <br />
            <input
                id="applicationDeadline"
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
            />
            <br /><br />

            <button type="submit">Create Job</button>
        </form>
    );
};

export default JobForm;