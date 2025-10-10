import { NoteSchema, NoteSchemaType } from "@/database/validations";
import { useKeyboardManager } from "@/hooks/use-keyboard-manager";
import { useNotesStore } from "@/store/notes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFocusEffect } from "expo-router";
import compareObjects from "fast-deep-equal";
import * as React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ScrollView, Text, TextInput, View } from "react-native";
import { FolderSelector } from "./_components/folder-selector";
import { PrioritySelector } from "./_components/priority-selector";
import { ReminderSelector } from "./_components/reminder-picker";
import { TagSelector } from "./_components/tag-selector";

interface Props {
  currentNoteId: number;
}

export function NoteForm({ currentNoteId }: Props) {
  const { updateNote, getNoteById, deleteNote } = useNotesStore();
  const { registerInputFocus } = useKeyboardManager();

  const titleInputRef = React.useRef<TextInput | null>(null);
  const contentInputRef = React.useRef<TextInput | null>(null);

  const currentNote = React.useMemo(
    () => getNoteById(currentNoteId),
    [currentNoteId, getNoteById]
  );

  const { control, reset, getValues } = useForm({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: "",
      content: "",
      priority: "NONE",
      folderId: null,
      tags: [],
      isSynced: false,
      isPinned: false,
      isTrashed: false,
      isArchived: false
    }
  });

  useWatch({ control });

  React.useEffect(() => {
    if (!currentNote) return;
    reset({
      title: currentNote.title ?? "",
      content: currentNote.content ?? "",
      priority: currentNote.priority ?? "NONE",
      folderId: currentNote.folderId ?? null,
      tags: Array.isArray(currentNote.tags) ? currentNote.tags : []
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNoteId, currentNote]);

  const buildUpdatePayload = (values: NoteSchemaType) => {
    return {
      title: String(values.title ?? "").trim(),
      content: String(values.content ?? "").trim(),
      priority: values.priority ?? "NONE",
      folderId: values.folderId ?? null,
      tags: Array.isArray(values.tags) ? values.tags : []
    };
  };

  const hasMeaningfulChanges = React.useCallback(() => {
    if (!currentNote) return false;

    const values = getValues();
    return compareObjects(values, currentNote);
  }, [currentNote, getValues]);

  // Autofocus title for faster entry
  React.useEffect(() => {
    const t = setTimeout(() => titleInputRef.current?.focus(), 220);
    return () => clearTimeout(t);
  }, []);

  const handleNoteChange = React.useCallback(() => {
    return () => {
      if (!currentNote) return;

      const values = getValues();
      if (!hasMeaningfulChanges()) {
        try {
          deleteNote(currentNoteId);
        } catch (err) {
          console.error("[NoteForm] failed to delete placeholder note:", err);
        }
        return;
      }

      try {
        const parsed = NoteSchema.safeParse({
          ...currentNote,
          // @ts-ignore
          ...buildUpdatePayload(values)
        });

        if (!parsed.success) {
          console.warn("[NoteForm] validation failed on auto-save:", parsed.error.format());
          return;
        }
        updateNote(
          currentNoteId,
          // @ts-ignore
          buildUpdatePayload(values)
        );
      } catch (err) {
        console.error("[NoteForm] error during auto-save:", err);
      }
    };
  }, [currentNote, currentNoteId, deleteNote, getValues, hasMeaningfulChanges, updateNote]);

  useFocusEffect(handleNoteChange);

  if (!currentNote) {
    return (
      <View className='flex-1 items-center justify-center p-4'>
        <Text className='text-gray-500'>Note not found</Text>
      </View>
    );
  }

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
              ref={(ref) => {
                titleInputRef.current = ref;
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
              ref={(ref) => {
                contentInputRef.current = ref;
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
              currentlyEditingNoteId={currentNoteId}
              selectedTagIds={value}
              onChange={onChange}
            />
          )}
        />

        <Text className='mt-4 text-lg font-medium'>Reminder</Text>
        <ReminderSelector currentNoteId={currentNoteId} />
      </View>
    </ScrollView>
  );
}
