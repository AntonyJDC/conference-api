import { Request, Response, NextFunction } from 'express';
import Version from '../models/version.model';

export const getEventVersion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const version = await Version.findOne({ key: 'events' });
        
        if (!version) {
            res.status(404).json({ message: "Version not found" });
            return;
        }
        
        res.json({ version: version.value });
    } catch (error) {
        next(error);
    }
};
