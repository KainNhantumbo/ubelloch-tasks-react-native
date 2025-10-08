import { orm } from "@/database/client";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import * as React from "react";
import { Text, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function MigrationContext({ children }: Props) {
  const { success, error } = useMigrations(orm, migrations);

  if (error) {
    console.error(`Migration error: ${error.message}`);
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    console.log("Migration is in progress...");
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return children;
}
