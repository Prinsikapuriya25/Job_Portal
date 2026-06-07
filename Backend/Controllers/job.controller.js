import { Job } from "../Models/job.model.js";
import { Company } from "../Models/company.model.js";

// POST JOB
export const postjob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.userId;

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // CHECK COMPANY EXISTS

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(400).json({
        message: "Please create a company first",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      location,
      salary: Number(salary),
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// GET ALL JOBS
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    console.log("JOB ID =>", jobId);

    const job = await Job.findById(jobId)
      .populate("company")
      .populate({
        path: "applicants",
        populate: {
          path: "applicant",
        },
      })

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("GET JOB ERROR =>", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ADMIN JOBS
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId;

    const jobs = await Job.find({
      created_by: adminId,
    })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      experience,
      position,
    } = req.body;

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        requirements: requirements ? requirements.split(",") : [],
        location,
        salary: Number(salary),
        jobType,
        experienceLevel: Number(experience),
        position: Number(position),
      },
      { new: true },
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
