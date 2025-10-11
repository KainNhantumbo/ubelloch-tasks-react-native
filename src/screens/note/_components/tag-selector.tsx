import { SheetContainer } from "@/components/sheet-container";
import { temp_colors as colors } from "@/constants";
import { useTagsStore } from "@/store/tags";
import { Check, Plus } from "lucide-react-native";
import React, { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  currentlyEditingNoteId: number;
  selectedTagIds: number[];
  onChange: (tagIds: number[]) => void;
}

export function TagSelector({ selectedTagIds, currentlyEditingNoteId, onChange }: Props) {
  const { tags, createTag } = useTagsStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [creatingNew, setCreatingNew] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#3B82F6");

  const toggleTag = (id: number) => {
    if (selectedTagIds.includes(id)) {
      onChange(selectedTagIds.filter((t) => t !== id));
    } else {
      onChange([...selectedTagIds, id]);
    }
  };

  const handleCreate = async () => {
    if (!newTagName.trim()) return;

    const tag = await createTag({
      name: newTagName,
      color: selectedColor
      // noteId: currentlyEditingNoteId
    });
    if (!tag) return;

    onChange([...selectedTagIds, tag.id]);
    setNewTagName("");
    setCreatingNew(false);
    setIsSheetOpen(false);
  };

  return (
    <SheetContainer
      isSheetOpen={isSheetOpen}
      setIsSheetOpen={setIsSheetOpen}
      trigger={
        <View className='flex-row flex-wrap items-center rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700'>
          {selectedTagIds.length > 0 ? (
            <View className='flex-row flex-wrap gap-2'>
              {selectedTagIds.map((id) => {
                const tag = tags.find((t) => t.id === id);
                if (!tag) return null;
                return (
                  <View
                    key={id}
                    className='rounded-full px-3 py-1'
                    style={{ backgroundColor: tag.color }}>
                    <Text className='text-sm text-white'>{tag.name}</Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <Text className='text-gray-600 dark:text-gray-400'>Select tags</Text>
          )}
          <Text className='ml-auto text-gray-400'>▾</Text>
        </View>
      }
      content={
        <View className='gap-4'>
          {!creatingNew ? (
            <>
              <Text className='mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100'>
                Choose Tags
              </Text>

              <FlatList
                data={tags}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => {
                  const selected = selectedTagIds.includes(item.id);
                  return (
                    <TouchableOpacity
                      onPress={() => toggleTag(item.id)}
                      className={`mb-2 flex-row items-center justify-between rounded-lg border px-4 py-3 ${
                        selected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                          : "border-gray-300 dark:border-gray-600"
                      }`}>
                      <View className='flex-row items-center gap-3'>
                        <View
                          className='h-3 w-3 rounded-full'
                          style={{ backgroundColor: item.color }}
                        />
                        <Text
                          className={`text-base ${
                            selected
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-800 dark:text-gray-100"
                          }`}>
                          {item.name}
                        </Text>
                      </View>
                      {selected && <Check size={18} color='#3B82F6' />}
                    </TouchableOpacity>
                  );
                }}
              />

              <TouchableOpacity
                onPress={() => setCreatingNew(true)}
                className='flex-row items-center justify-center rounded-lg border border-dashed border-gray-400 py-3'>
                <Plus size={18} color='#6B7280' />
                <Text className='ml-2 text-gray-600 dark:text-gray-300'>New Tag</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
                New Tag
              </Text>

              <TextInput
                value={newTagName}
                onChangeText={setNewTagName}
                placeholder='Tag name'
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
