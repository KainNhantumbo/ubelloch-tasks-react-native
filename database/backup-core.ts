import { DATABASE_NAME } from "@/constants";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

export class DatabaseBackup {
  private db;

  constructor() {
    this.db = SQLite.openDatabaseSync(DATABASE_NAME);
  }

  async backup() {
    const tablesQuery = await this.db.getAllAsync<{ name: string }>(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
    );

    const dump: Record<string, unknown[]> = {};

    for (const { name } of tablesQuery) {
      const rows = await this.db.getAllAsync(`SELECT * FROM ${name}`);
      dump[name] = rows;
    }

    return dump;
  }

  async restore(dump: Record<string, any[]>) {
    await this.db.execAsync("PRAGMA foreign_keys = OFF;");

    for (const tableName of Object.keys(dump)) {
      await this.db.execAsync(`DELETE FROM ${tableName};`);

      const rows = dump[tableName];
      if (!rows || rows.length === 0) continue;

      const columns = Object.keys(rows[0]);
      const placeholders = columns.map(() => "?").join(",");

      for (const row of rows) {
        const values = columns.map((col) => row[col]);
        await this.db.runAsync(
          `INSERT INTO ${tableName} (${columns.join(",")}) VALUES (${placeholders})`,
          values
        );
      }
    }

    await this.db.execAsync("PRAGMA foreign_keys = ON;");
  }

  async promptBackup() {
    try {
      const dump = await this.backup();

      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .replace("T", "_")
        .split("Z")[0];
      const filename = `backup_${timestamp}.json`;

      const backupPath = FileSystem.Directory + filename;
      new FileSystem.File(backupPath).write(JSON.stringify(dump), { encoding: "base64" });

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

  async promptRestore() {
    try {
      const data = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true
      });

      if (data.canceled || !data.assets || !data.assets[0]) {
        console.error("Restore canceled");
        return;
      }

      const [{ uri: fileUri }] = data.assets;
      const fileContent = await new FileSystem.File(fileUri).text();

      const backupData = JSON.parse(fileContent);
      await this.restore(backupData);

      console.info("Restore completed from:", fileUri);
    } catch (err) {
      console.error("Restore failed:", err);
      throw err;
    }
  }
}
