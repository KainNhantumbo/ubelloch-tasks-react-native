import { Text } from "@/components/ui/text";
import { useEffect } from "react";
import { Button, FlatList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTasks } from "../../store/tasks";

export default function HomeScreen() {
  const { tasks, fetchTasks, addTask, toggleTask, deleteTask } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View className='flex-1 p-4'>
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
    </View>
  );
}
