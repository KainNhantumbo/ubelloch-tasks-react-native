import { DATABASE_NAME } from "@/constants";
import * as SQLite from "expo-sqlite";

export class DatabaseBackup {
  private db: unknown;

  constructor(db: unknown) {
    this.db = db;
  }
}

export async function backupDatabase(): Promise<any> {
  const rawDb = SQLite.openDatabaseSync(DATABASE_NAME);

  const tablesQuery = await rawDb.getAllAsync<{ name: string }>(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
  );

  const backup: Record<string, any[]> = {};

  for (const { name } of tablesQuery) {
    const rows = await rawDb.getAllAsync(`SELECT * FROM ${name}`);
    backup[name] = rows;
  }

  return backup;
}

export async function restoreDatabase(backup: Record<string, any[]>) {
  const rawDb = SQLite.openDatabaseSync(DATABASE_NAME);

  await rawDb.execAsync("PRAGMA foreign_keys = OFF;");

  for (const tableName of Object.keys(backup)) {
    await rawDb.execAsync(`DELETE FROM ${tableName};`);

    const rows = backup[tableName];
    if (!rows || rows.length === 0) continue;

    const columns = Object.keys(rows[0]);
    const placeholders = columns.map(() => "?").join(",");

    for (const row of rows) {
      const values = columns.map((col) => row[col]);
      await rawDb.runAsync(
        `INSERT INTO ${tableName} (${columns.join(",")}) VALUES (${placeholders})`,
        values
      );
    }
  }

  await rawDb.execAsync("PRAGMA foreign_keys = ON;");
}
