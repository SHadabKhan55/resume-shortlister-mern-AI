const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeResume(job, resumeText) {
  const prompt = `
You are an ATS (Applicant Tracking System).

Job Title:
${job.title}

Job Description:
${job.description}

Requirements:
${job.requirements}

Skills:
${job.skills.join(", ")}

Resume:
${resumeText}

Analyze the resume against the job profile.

Return ONLY valid JSON in this format:

{
  "score": 85,
  "feedback": "Candidate has strong React and Node.js skills but lacks Docker experience."
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = { analyzeResume };