import { Text } from "@/components/ui/text";
import { useEffect } from "react";
import { Button, FlatList, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTasks } from "../../store/tasks";

export default function HomeScreen() {
  const { tasks, fetchTasks, addTask, toggleTask, deleteTask } = useTasks();
  console.log({ tasks });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <SafeAreaView className='flex-1'>
      <Button title='Add Task' onPress={() => addTask("New Task")} />

      <ScrollView>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id?.toString() ?? ""}
          renderItem={({ item }) => (
            <View className='flex-row justify-between border-b p-2'>
              <Text
                className={item.done ? "text-gray-500 line-through" : ""}
                onPress={() => toggleTask(item.id!)}>
                {item.title}
              </Text>
              <Button title='Delete' onPress={() => deleteTask(item.id!)} />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
