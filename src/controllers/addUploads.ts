import express, { Request, Response } from 'express';
import Document from '../models/Document';
interface CustomRequest extends Request {
  decoded?: {
    userId: string;
    email: string;
    role: string;
  };
  userRole?: string;
}

export const addUploads = async (req: CustomRequest, res: Response) => {
  try {
    // Check if the user has 'admin' role
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Forbidden. Only admin can upload documents.' });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file selected' });
    }

    const { title, allowedRoles, allowedUsers } = req.body;

    // Implement your logic to store the file path, title, roles, and users in your Document schema
    const documentData = await Document.create({
      title,
      file: file.buffer.toString('base64'), // Assuming you want to store the file as a base64-encoded string
      allowedRoles,
      allowedUsers,
    });

    res.status(201).json({ message: 'File uploaded successfully.', document: documentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
