import { Company } from "../Models/company.model.js";
import getDataUri from "../Utils/datauri.js";
import cloudinary from "../Utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;

    // CHECK NAME

    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    // CHECK EXISTING COMPANY

    let company = await Company.findOne({
      name,
    });

    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    let logo = "";

    // LOGO UPLOAD

    if (file) {
      const fileUri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "company_logos",
      });

      logo = cloudResponse.secure_url;
    }

    // CREATE COMPANY

    company = await Company.create({
      name,
      description,
      website,
      location,
      logo,

      userId: req.userId,
    });

    return res.status(201).json({
      message: "Company registered successfully",

      success: true,

      company,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",

      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.userId;

    const companies = await Company.find({
      userId,
    });

    if (companies.length === 0) {
      return res.status(404).json({
        message: "No company found for this user",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Companies fetched successfully",

      success: true,

      companies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company fetched successfully",
      success: true,
      company,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const file = req.file;

    const updateData = {
      name,
      description,
      website,
      location,
    };

    // LOGO UPLOAD

    if (file) {
      const fileUri = getDataUri(file);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "company_logos",
      });

      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",

      success: true,

      company,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",

      success: false,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};
