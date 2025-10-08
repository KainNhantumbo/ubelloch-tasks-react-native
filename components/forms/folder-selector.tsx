import { SheetContainer } from "@/components/sheet-container";
import { temp_colors as colors } from "@/constants"; // optional color palette
import { FolderSchemaType } from "@/database/validations";
import { useFoldersStore } from "@/store/folders";
import { Check, Plus } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

interface FolderPickerProps {
  selectedFolder: FolderSchemaType | null;
  onSelect: (folder: FolderSchemaType | null) => void;
}

export function FolderPicker({ selectedFolder, onSelect }: FolderPickerProps) {
  const { folders, createFolder } = useFoldersStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [creatingNew, setCreatingNew] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3B82F6");

  const handleCreate = async () => {
    if (!newFolderName.trim()) return;

    const folder = await createFolder({
      name: newFolderName,
      color: selectedColor,
      createdAt: new Date()
    });

    if (folder) {
      onSelect(folder);
    }

    setNewFolderName("");
    setCreatingNew(false);
    setIsSheetOpen(false);
  };

  return (
    <SheetContainer
      isSheetOpen={isSheetOpen}
      setIsSheetOpen={setIsSheetOpen}
      trigger={
        <View className='flex-row items-center justify-between rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700'>
          <Text className='text-gray-800 dark:text-gray-100'>
            {selectedFolder ? selectedFolder.name : "Select Folder"}
          </Text>
          <Text className='text-gray-400'>▾</Text>
        </View>
      }
      content={
        <View className='gap-4'>
          {!creatingNew ? (
            <>
              <Text className='mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100'>
                Choose a Folder
              </Text>

              <FlatList
                data={folders}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={`mb-2 rounded-lg border px-4 py-3 ${
                      selectedFolder?.id === item.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    onPress={() => {
                      onSelect(item);
                      setIsSheetOpen(false);
                    }}>
                    <View className='flex-row items-center gap-3'>
                      <View
                        className='h-3 w-3 rounded-full'
                        style={{ backgroundColor: item.color }}
                      />
                      <Text
                        className={`text-base ${
                          selectedFolder?.id === item.id
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-800 dark:text-gray-100"
                        }`}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity
                onPress={() => setCreatingNew(true)}
                className='flex-row items-center justify-center rounded-lg border border-dashed border-gray-400 py-3'>
                <Plus size={18} color='#6B7280' />
                <Text className='ml-2 text-gray-600 dark:text-gray-300'>New Folder</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
                New Folder
              </Text>

              <TextInput
                value={newFolderName}
                onChangeText={setNewFolderName}
                placeholder='Folder name'
                placeholderTextColor='#9CA3AF'
                className='rounded-lg border border-gray-300 px-4 py-3 text-gray-800 dark:border-gray-600 dark:text-gray-100'
              />

              <Text className='mt-2 text-gray-700 dark:text-gray-200'>Choose Color:</Text>
              <View className='mt-2 flex-row flex-wrap gap-3'>
                {colors.map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setSelectedColor(c)}
                    className={`h-8 w-8 items-center justify-center rounded-full ${
                      selectedColor === c ? "border-2 border-gray-700" : ""
                    }`}
                    style={{ backgroundColor: c }}>
                    {selectedColor === c && (
                      <Check size={14} color='#fff' strokeWidth={3} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>

              <View className='mt-4 flex-row justify-end gap-3'>
                <TouchableOpacity
                  onPress={() => setCreatingNew(false)}
                  className='rounded-lg bg-gray-200 px-4 py-2 dark:bg-gray-700'>
                  <Text className='text-gray-800 dark:text-gray-100'>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCreate}
                  className='rounded-lg bg-blue-600 px-4 py-2'>
                  <Text className='font-semibold text-white'>Save</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      }
    />
  );
}
