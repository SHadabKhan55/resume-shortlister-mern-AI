import React, { useState } from "react";
import axios from "axios";

const JobForm = () => {
  const [skillInput, setSkillInput] = useState("");

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    if (formData.skills.includes(skill)) {
      alert("Skill already added");
      return;
    }

    setFormData({
      ...formData,
      skills: [...formData.skills, skill],
    });

    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        error.response?.data?.message ||
          "Something went wrong"
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
      <br />
      <br />

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
      <br />
      <br />

      <label htmlFor="requirements">Requirements</label>
      <br />
      <input
        id="requirements"
        type="text"
        name="requirements"
        value={formData.requirements}
        onChange={handleChange}
        placeholder="BSCS, 2 Years Experience"
      />
      <br />
      <br />

      <label>Skills</label>
      <br />

      <input
        type="text"
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
        placeholder="Enter Skill"
      />

      <button
        type="button"
        onClick={addSkill}
        style={{ marginLeft: "10px" }}
      >
        Add Skill
      </button>

      <br />
      <br />

      {formData.skills.map((skill) => (
        <div key={skill}>
          {skill}
          <button
            type="button"
            onClick={() => removeSkill(skill)}
            style={{ marginLeft: "10px" }}
          >
            Remove
          </button>
        </div>
      ))}

      <br />

      <label htmlFor="salaryMin">Minimum Salary</label>
      <br />
      <input
        id="salaryMin"
        type="number"
        name="salaryMin"
        value={formData.salaryMin}
        onChange={handleChange}
      />
      <br />
      <br />

      <label htmlFor="salaryMax">Maximum Salary</label>
      <br />
      <input
        id="salaryMax"
        type="number"
        name="salaryMax"
        value={formData.salaryMax}
        onChange={handleChange}
      />
      <br />
      <br />

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
      <br />
      <br />

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
      <br />
      <br />

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
      <br />
      <br />

      <label htmlFor="vacancies">Vacancies</label>
      <br />
      <input
        id="vacancies"
        type="number"
        name="vacancies"
        value={formData.vacancies}
        onChange={handleChange}
      />
      <br />
      <br />

      <label htmlFor="applicationDeadline">
        Application Deadline
      </label>
      <br />
      <input
        id="applicationDeadline"
        type="date"
        name="applicationDeadline"
        value={formData.applicationDeadline}
        onChange={handleChange}
      />
      <br />
      <br />

      <button type="submit">Create Job</button>
    </form>
  );
};

export default JobForm;