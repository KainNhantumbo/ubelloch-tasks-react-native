import { drizzle } from "drizzle-orm/expo-sqlite";
import { db } from "./connection";
import * as schema from "./schemas";

export const orm = drizzle(db, { schema });
