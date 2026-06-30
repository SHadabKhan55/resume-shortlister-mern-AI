import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ApplyJob = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
    });

    const [resume, setResume] = useState(null);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

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
        }
    }

    return (
        <div>
            <h2>Apply For Job</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <br />
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <label htmlFor="email">Email</label>
                <br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <label htmlFor="resume">
                    Resume (PDF / DOC / DOCX)
                </label>
                <br />
                <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                        setResume(e.target.files[0])
                    }
                    required
                />
                <br /><br />

                <button type="submit">
                    Apply Now
                </button>
            </form>
        </div>
    );
};

export default ApplyJob;