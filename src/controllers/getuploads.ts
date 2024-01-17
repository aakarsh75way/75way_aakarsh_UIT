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

export const getUploads = async (req: CustomRequest, res: Response) => {
  try {
    // Check if the user has a valid session
    if (!req.decoded) {
      return res.status(401).json({ error: 'Unauthorized. User session not found.' });
    }

    const {id} = req.params;

    // Find the document by ID
    const document = await Document.findById({_id:id});

    // Check if the document exists
    if (!document) {
      return res.status(404).json({ error: 'Document not found.' });
    }

    // Check if the user has a role specified in the allowedRoles array
    if (document.allowedRoles.includes(req.decoded.role)) {
      // Return the file associated with the document
      res.status(200).json({ file: document.file });
    } else {
      // User does not have the required role
      res.status(403).json({ error: 'Forbidden. User does not have the required role.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
