import { Models } from "node-appwrite";

export interface Client extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  primaryManicurist: string;
  comment?: string | undefined;
}

export interface Appointment extends Models.Document {
  cleint: Client;
  schedule: Date;
  status: Status;
  primaryManicurist: string;
  note: string;
  userId: string;
  cancelReason: string | null;
}