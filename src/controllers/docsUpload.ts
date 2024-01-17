import express, { Request, Response } from "express";
import Document from "../models/Document";
import User from "../models/User";
interface CustomRequest extends Request {
  decoded?: {
    userId: string;
    email: string;
    role: string;
  };
  userRole?: string;
}

export const docsUpload = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  try {
    // Check if the user has
    if (!req.decoded) {
      return res
        .status(401)
        .json({ error: "Unauthorized. User session not found." });
    }
    const file = req.file;
    console.log("File", file);
    if (!file) {
      return res.status(400).json({ message: "No file selected" });
    }
    const findUser = await Document.findOne({ _id: id });
    if (findUser) {
      const { permission, allowedUsers } = findUser;
      if (permission === "private") {
        const isAllowed = allowedUsers.includes(req.decoded.email);
        if (isAllowed) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: req.decoded.userId },
            {
              $push: {
                uploads: file.originalname,
              },
            },
            { new: true }
          );
          if (!updatedUser) {
            return res.status(500).json({ error: "User update failed" });
          }
        } else {
          res
            .status(201)
            .json({ error: "Forbidden. User is not allowed by the admin." });
        }
      } else if (permission === "public") {
 const updatedUser = await User.findByIdAndUpdate(
            { _id: req.decoded.userId },
            {
              $push: {
                uploads: file.originalname,
              },
            },
            { new: true }
          );
          if (!updatedUser) {
            return res.status(500).json({ error: "User update failed" });
          }

      } else {
        res.status(201).json({ error: "Document not found" });
      }

      res.status(201).json({ message: "File uploaded successfully." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
