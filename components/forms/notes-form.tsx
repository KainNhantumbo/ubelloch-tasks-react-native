import { NoteSchema } from "@/database/validations";
import { useNotesStore } from "@/store/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import * as z from "zod";
import { PrioritySelector } from "./priority-selector";

export function NoteForm() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { createNote, updateNote } = useNotesStore();
  const { noteId } = params;
  const canGoBack = router.canGoBack();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: "",
      content: "",
      priority: "NONE",
      folderId: null,
      isSynced: false,
      isPinned: false,
      isTrashed: false,
      isArchived: false
    }
  });

  const onSubmit = async (data: z.infer<typeof NoteSchema>) => {
    if (noteId) await updateNote(+noteId, data);
    else await createNote(data);

    if (canGoBack) {
      router.back();
    } else {
      router.push("/(home)");
    }
  };

  return (
    <ScrollView className='flex-1 p-4'>
      <View className='gap-3'>
        <Text className='text-lg font-medium'>Title</Text>
        <Controller
          control={control}
          name='title'
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder='Enter title'
              className='rounded-md border border-gray-300 p-2'
            />
          )}
        />

        <Text className='mt-4 text-lg font-medium'>Content</Text>
        <Controller
          control={control}
          name='content'
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder='Write your note...'
              multiline
              numberOfLines={6}
              textAlignVertical='top'
              className='rounded-md border border-gray-300 p-2'
            />
          )}
        />

        <Text className='mt-4 text-lg font-medium'>Priority</Text>
        <Controller
          control={control}
          name='priority'
          render={({ field: { value, onChange } }) => (
            <PrioritySelector value={value ?? "NONE"} onChange={onChange} />
          )}
        />

        {/* TODO: FolderPicker, TagSelector, ReminderPicker */}

        <Pressable
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
          className='mt-6 rounded-md bg-blue-600 p-3'>
          <Text className='text-center text-white'>
            {/*TODO: MAKE THIS NOTE SAVING AUTOMATIC*/}
            {noteId ? "Update Note" : "Save Note"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
