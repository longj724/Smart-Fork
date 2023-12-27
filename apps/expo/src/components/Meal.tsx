// External Dependencies
import {
  View,
  Text,
  TextLayoutEventData,
  NativeSyntheticEvent,
  Pressable,
} from "react-native";
import { useState, useRef } from "react";

interface MealProps {
  type?: string;
  notes?: string;
  date: Date;
  imageLink?: string;
}

const Meal = ({ type, notes, date, imageLink }: MealProps) => {
  const [showReadMore, setShowReadMore] = useState<boolean | undefined>(
    undefined,
  );
  const [showReadLess, setShowReadLess] = useState(false);
  const [numberOfLines, setNumberOfLines] = useState<number | null>(null);
  const notesContainerRef = useRef(null);
  const notesRef = useRef(null);

  const getMealTime = () => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedTime = `${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return formattedTime;
  };

  const onNotesTextLayout = (
    event: NativeSyntheticEvent<TextLayoutEventData>,
  ) => {
    if (showReadMore === undefined && event.nativeEvent.lines.length > 2) {
      setNumberOfLines(2);
      setShowReadMore(true);
    } else {
      setNumberOfLines(event.nativeEvent.lines.length);
    }
  };

  const onShowReadMore = () => {
    setShowReadMore(false);
    setNumberOfLines(null);
    setShowReadLess(true);
  };

  const onShowReadLess = () => {
    setShowReadLess(false);
    setNumberOfLines(2);
    setShowReadMore(true);
  };

  return (
    <View className="flex flex-row rounded-lg bg-white shadow-md">
      <View className="w-4/6 flex-col p-2">
        <View className="flex flex-row items-center pl-3">
          <Text className="flex-shrink text-lg font-semibold">
            {getMealTime()} - {type}
          </Text>
        </View>
        <View className="ml-3 mt-2 flex flex-col" ref={notesContainerRef}>
          <Text
            numberOfLines={numberOfLines !== null ? numberOfLines : undefined}
            ellipsizeMode="tail"
            ref={notesRef}
            onTextLayout={onNotesTextLayout}
          >
            {notes}
          </Text>
          {showReadMore && (
            <Pressable onPress={onShowReadMore} className="mt-1">
              <Text className="font-semibold">Read more...</Text>
            </Pressable>
          )}
          {showReadLess && (
            <Pressable onPress={onShowReadLess} className="mt-1">
              <Text className="font-semibold">Read less</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default Meal;
