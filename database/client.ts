import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as schema from "./schema";
import { DATABASE_NAME } from "@/constants";

const expo = SQLite.openDatabaseSync(DATABASE_NAME, { enableChangeListener: true });
export const orm = drizzle(expo, { schema });
