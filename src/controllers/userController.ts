import express, { Request, Response } from "express";

import Apps from "../models/Apps";
interface CustomRequest extends Request {
  decoded?: {
    userId: string;
    email: string;
    role: string;
  };
}
// appRoutes
export const userController = async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { decoded } = req; // Access the apiKey set by the middleware
  try {
    const findAppName = await Apps.findOne({ _id: id });
    if (findAppName) {
      const whitelistedDomains = findAppName.whitelistedDomains;
      const isWhitelisted = whitelistedDomains.includes(decoded?.email);

      if (isWhitelisted) {
        // If email is whitelisted, respond accordingly
        res.status(200).json({ youAPIkey: findAppName.apiKey });
      } else {
        res
          .status(403)
          .json({ error: "User is not whitelisted for this app." });
      }
    } else {
      res.status(500).json({ error: "No App found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
