import { NextFunction, Request, Response } from "express";
import Event from "../models/event.model"; // Modelo de MongoDB

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ id });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};

export const subscribeToEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({ id });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    if (event.spotsLeft > 0) {
      event.spotsLeft--;
      await event.save();
      res.status(200).json({
        message: "Successfully subscribed",
        spotsLeft: event.spotsLeft,
      });
    } else {
      res.status(400).json({ message: "No spots left" });
    }
  } catch (error) {
    next(error);
  }
};

export const unsubscribeFromEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const event = await Event.findOne({ id });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    if (event.spotsLeft < event.capacity) {
      event.spotsLeft++;
      await event.save();
      res.status(200).json({
        message: "Successfully unsubscribed",
        spotsLeft: event.spotsLeft,
      });
    } else {
      res.status(400).json({ message: "Already at full capacity" });
    }
  } catch (error) {
    next(error);
  }
};
