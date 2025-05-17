import { NextFunction, Request, Response } from "express";
import Event from "../models/event.model";
import Version from "../models/version.model";

function generateNextId(lastId: string): string {
  const num = parseInt(lastId.replace('evt', ''), 10);
  const nextNum = num + 1;
  return `evt${String(nextNum).padStart(3, '0')}`;
}

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
    const lastEvent = await Event.findOne().sort({ id: -1 });

    let newId = 'evt001';
    if (lastEvent && lastEvent.id) {
      newId = generateNextId(lastEvent.id);
    }

    const {
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      imageUrl,
      capacity,
      categories,
    } = req.body;

    const newEvent = new Event({
      id: newId,
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      imageUrl,
      capacity,
      spotsLeft: capacity,
      categories,
    });

    await newEvent.save();
    res.status(201).json(newEvent);

    await Version.updateOne(
      { key: 'events' },
      { $inc: { value: 1 } },
      { upsert: true }
    );
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

    await Version.updateOne(
      { key: 'events' },
      { $inc: { value: 1 } },
      { upsert: true }
    );
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

    await Version.updateOne(
      { key: 'events' },
      { $inc: { value: 1 } },
      { upsert: true }
    );
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const updatedEvent = await Event.findOneAndUpdate(
      { id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json(updatedEvent);

    await Version.updateOne(
      { key: 'events' },
      { $inc: { value: 1 } },
      { upsert: true }
    );
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const deleted = await Event.findOneAndDelete({ id });

    if (!deleted) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.status(200).json({ message: "Event deleted successfully" });

    await Version.updateOne(
      { key: 'events' },
      { $inc: { value: 1 } },
      { upsert: true }
    );
  } catch (error) {
    next(error);
  }
};