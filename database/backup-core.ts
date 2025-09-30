import { DATABASE_NAME } from "@/constants";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
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

export async function backupWithPrompt() {
  try {
    const dump = await backupDatabase();

    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .split("Z")[0];
    const filename = `backup_${timestamp}.json`;

    const backupPath = FileSystem.Directory + filename;
    new FileSystem.File().write(JSON.stringify(dump));

    await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true
    });

    return backupPath;
  } catch (err) {
    console.error("Backup failed:", err);
    throw err;
  }
}

export async function restoreWithPrompt() {
  try {
    // Let user pick a backup file
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/json",
      copyToCacheDirectory: true
    });

    if (result.canceled || !result.assets || !result.assets[0]) {
      console.log("Restore canceled");
      return;
    }

    const fileUri = result.assets[0].uri;
    const fileContent = await FileSystem.readAsStringAsync(fileUri);

    const backupData = JSON.parse(fileContent);
    await restoreDatabase(backupData);

    console.log("Restore completed from:", fileUri);
  } catch (err) {
    console.error("Restore failed:", err);
    throw err;
  }
}
