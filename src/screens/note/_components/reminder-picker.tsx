import { SheetContainer } from "@/components/sheet-container";
import { useNotesStore } from "@/store/notes";
import { useRemindersStore } from "@/store/reminders";
import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  noteId: number;
};

type Step = "initial" | "date" | "time";

function formatReminderDisplay(timestampMs: Date | number) {
  const date = new Date(timestampMs);
  const now = new Date();

  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow =
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate();

  const timeStr = format(date, "HH:mm");

  if (isSameDay) return `Today at ${timeStr}`;
  if (isTomorrow) return `Tomorrow at ${timeStr}`;
  return `${format(date, "EEE, MMM d")} at ${timeStr}`;
}

export function ReminderSelector({ noteId }: Props) {
  const reminders = useRemindersStore((s) => s.reminders);
  const createReminder = useRemindersStore((s) => s.createReminder);
  const updateReminder = useRemindersStore((s) => s.updateReminder);
  const deleteReminder = useRemindersStore((s) => s.deleteReminder);
  const getReminderByNoteId = useRemindersStore((s) => s.getReminderByNoteId);

  const updateNote = useNotesStore((s) => s.updateNote);
  const getNoteById = useNotesStore((s) => s.getNoteById);

  const currentReminder = reminders.find((r) => r.noteId === noteId) ?? null;

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [step, setStep] = useState<Step>("initial");
  const [tempDate, setTempDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isSheetOpen) {
      if (currentReminder) setTempDate(new Date(currentReminder.dueDate));
      else setTempDate(new Date());
      setStep("initial");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSheetOpen, currentReminder]);

  const combineDateAndTime = (datePart: Date, timePart: Date) => {
    const combined = new Date(datePart);
    combined.setHours(timePart.getHours(), timePart.getMinutes(), 0, 0);
    return combined;
  };

  const handleSave = async (finalTimestampMs: number) => {
    try {
      if (currentReminder) {
        await updateReminder(currentReminder.id, {
          dueDate: new Date(finalTimestampMs),
          isCompleted: false,
          noteId
        });
      } else {
        await createReminder({
          dueDate: new Date(finalTimestampMs),
          isCompleted: false,
          noteId
        });
      }

      const reminder = await getReminderByNoteId(noteId);
      if (reminder) {
        await updateNote(noteId, { reminderId: reminder.id });
      }

      setIsSheetOpen(false);
      setStep("initial");
    } catch (err) {
      console.error("Failed to save reminder", err);
    }
  };

  const handleDelete = async () => {
    if (!currentReminder) return;
    try {
      await deleteReminder(currentReminder.id, noteId);
      await updateNote(noteId, { reminderId: null });
    } catch (err) {
      console.error("Failed to delete reminder", err);
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (event.type === "dismissed") {
      setStep("initial");
      return;
    }
    if (selected) {
      setTempDate(selected);
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selected?: Date | undefined) => {
    if (event.type === "dismissed") {
      setStep("initial");
      return;
    }
    if (selected && tempDate) {
      const final = combineDateAndTime(tempDate, selected);
      handleSave(final.getTime());
    }
  };

  const initialView = (
    <View className='gap-4'>
      <Text className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
        Set reminder
      </Text>

      <TouchableOpacity
        onPress={() => setStep("date")}
        className='items-center rounded-lg border border-gray-300 px-4 py-3 dark:border-gray-700'>
        <Text className='text-base text-gray-800 dark:text-gray-100'>Pick date & time</Text>
      </TouchableOpacity>

      {currentReminder && (
        <View className='mt-3'>
          <Text className='mb-2 text-sm text-gray-600 dark:text-gray-300'>
            Current reminder
          </Text>
          <View className='flex-row items-center justify-between'>
            <Text className='text-base text-gray-800 dark:text-gray-100'>
              {formatReminderDisplay(new Date(currentReminder.dueDate))}
            </Text>
            <TouchableOpacity
              onPress={handleDelete}
              className='rounded-lg bg-red-100 px-3 py-1 dark:bg-red-900/30'>
              <Text className='text-red-600 dark:text-red-300'>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  const datePickerView = (
    <View>
      <View className='mb-3 flex-row items-center justify-between'>
        <TouchableOpacity
          onPress={() => {
            setStep("initial");
            setIsSheetOpen(false);
          }}
          className='px-3 py-1'>
          <Text className='text-blue-600 dark:text-blue-300'>Cancel</Text>
        </TouchableOpacity>

        <Text className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
          Pick date
        </Text>

        <TouchableOpacity
          onPress={() => {
            if (!tempDate) setTempDate(new Date());
            setStep("time");
          }}
          className='px-3 py-1'>
          <Text className='text-blue-600 dark:text-blue-300'>Select</Text>
        </TouchableOpacity>
      </View>

      <View>
        <DateTimePicker
          testID='datePicker'
          value={tempDate ?? new Date()}
          mode='date'
          display='spinner'
          onChange={onDateChange}
        />
      </View>
    </View>
  );

  const timePickerView = (
    <View>
      <View className='mb-3 flex-row items-center justify-between'>
        <TouchableOpacity
          onPress={() => {
            setStep("initial");
            setIsSheetOpen(false);
          }}
          className='px-3 py-1'>
          <Text className='text-blue-600 dark:text-blue-300'>Cancel</Text>
        </TouchableOpacity>

        <Text className='text-lg font-semibold text-gray-800 dark:text-gray-100'>
          Pick time
        </Text>

        <TouchableOpacity
          onPress={() => {
            const now = new Date();
            if (!tempDate) setTempDate(new Date());
            const final = combineDateAndTime(tempDate ?? new Date(), now);
            handleSave(final.getTime());
          }}
          className='px-3 py-1'>
          <Text className='text-blue-600 dark:text-blue-300'>Save</Text>
        </TouchableOpacity>
      </View>

      <View>
        <DateTimePicker
          testID='timePicker'
          value={tempDate ?? new Date()}
          mode='time'
          display='spinner'
          onChange={onTimeChange}
          is24Hour={true}
        />
      </View>
    </View>
  );

  const triggerNode = (
    <View className='flex-row items-center justify-between rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700'>
      <TouchableOpacity
        onPress={() => setIsSheetOpen(true)}
        style={{ flex: 1 }}
        className='pr-2'>
        <Text className='text-base text-gray-800 dark:text-gray-100'>
          {currentReminder
            ? formatReminderDisplay(currentReminder.dueDate)
            : "Set reminder"}
        </Text>
      </TouchableOpacity>

      {currentReminder ? (
        <TouchableOpacity
          onPress={handleDelete}
          className='ml-3 rounded-lg bg-red-100 px-3 py-1 dark:bg-red-900/30'>
          <Text className='text-red-600 dark:text-red-300'>Delete</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <SheetContainer
      isSheetOpen={isSheetOpen}
      setIsSheetOpen={setIsSheetOpen}
      trigger={triggerNode}
      content={
        <View>
          {step === "initial" && initialView}
          {step === "date" && datePickerView}
          {step === "time" && timePickerView}
        </View>
      }
    />
  );
}
