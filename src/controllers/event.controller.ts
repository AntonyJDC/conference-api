import { Request, Response } from 'express';
import { EventModel } from '../models/event.model';

let events: EventModel[] = [];

export const getAllEvents = (req: Request, res: Response) => {
  res.json(events);
};

export const createEvent = (req: Request, res: Response) => {
  const newEvent: EventModel = req.body;
  events.push(newEvent);
  res.status(201).json(newEvent);
};

export const getEventById = (req: Request, res: Response) => {
  const { id } = req.params;
  const event = events.find((e) => e.id === id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};

export const subscribeToEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const event = events.find((e) => e.id === id);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.spotsLeft > 0) {
    event.spotsLeft--;
    res.json({ message: 'Successfully subscribed', spotsLeft: event.spotsLeft });
  } else {
    res.status(400).json({ message: 'No spots left' });
  }
};

export const unsubscribeFromEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const event = events.find((e) => e.id === id);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.spotsLeft < event.capacity) {
    event.spotsLeft++;
    res.json({ message: 'Successfully unsubscribed', spotsLeft: event.spotsLeft });
  } else {
    res.status(400).json({ message: 'Already at full capacity' });
  }
};
