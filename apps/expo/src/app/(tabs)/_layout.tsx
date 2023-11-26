// External Dependencies
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="Diary"
        options={{
          headerTitle: "Diary",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddMeal"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-outline" color={color} size={size} />
          ),
          tabBarLabel: "Add Meal",
        }}
        listeners={() => ({
          tabPress: (e: any) => {
            e.preventDefault();
            router.push("(modals)/add-meal");
          },
        })}
      />
      <Tabs.Screen
        name="Insights"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
