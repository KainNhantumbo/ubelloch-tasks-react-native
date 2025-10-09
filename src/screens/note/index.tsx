import { NoteSchema } from "@/database/validations";
import { useKeyboardManager } from "@/hooks/use-keyboard-manager";
import { useNotesStore } from "@/store/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import * as z from "zod";
import { FolderSelector } from "./_components/folder-selector";
import { PrioritySelector } from "./_components/priority-selector";
import { ReminderSelector } from "./_components/reminder-picker";
import { TagSelector } from "./_components/tag-selector";

interface Props {
  currentNoteId: string;
}

export function NoteForm({ currentNoteId }: Props) {
  const noteId = currentNoteId;
  const router = useRouter();
  const { createNote, updateNote } = useNotesStore();
  const { registerInputFocus } = useKeyboardManager();
  const titleInputRef = React.useRef<TextInput>(null);
  const contentInputRef = React.useRef<TextInput>(null);

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
      isArchived: false,
      tags: []
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
              ref={(r) => {
                titleInputRef.current = r;
              }}
              onFocus={() => {
                registerInputFocus(() => titleInputRef.current?.focus());
              }}
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
              ref={(r) => {
                contentInputRef.current = r;
              }}
              onFocus={() => {
                registerInputFocus(() => contentInputRef.current?.focus());
              }}
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

        <Text className='mt-4 text-lg font-medium'>Folder Selector</Text>
        <Controller
          control={control}
          name='folderId'
          render={({ field: { value, onChange } }) => (
            <FolderSelector selectedFolderId={value} onSelect={onChange} />
          )}
        />

        <Text className='mt-4 text-lg font-medium'>Tag Selector</Text>
        <Controller
          control={control}
          name='tags'
          render={({ field: { value, onChange } }) => (
            <TagSelector
              currentlyEditingNoteId={1}
              selectedTagIds={value}
              onChange={onChange}
            />
          )}
        />

        <Text className='mt-4 text-lg font-medium'>Reminder</Text>
        <ReminderSelector noteId={+noteId} />

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
