import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as schema from "./schema";

const expo = SQLite.openDatabaseSync("momentum-data.db", { enableChangeListener: true });
export const orm = drizzle(expo, { schema });
