// appRoutes.ts
import express, { Request, Response } from 'express';

import { authMiddleWare } from '../middleware/authMiddleware';
import Apps from '../models/Apps';


// appRoutes
export const appController=async(req: Request & { apiKey?: string }, res: Response) => {
  const { appName, whitelistedDomains } = req.body;
  const apiKey = req.apiKey;
 // Access the apiKey set by the middleware
  try {
    // Save app details to the database
    if(apiKey){
      const appData =await Apps.create({
        appName,
        apiKey,
        whitelistedDomains,
      });
  
      res.status(201).json({ app: appData });
    }else {
      res.status(201).json({ error: "You are not authorized to use this API " });
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

