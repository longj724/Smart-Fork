import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { TRPCProvider } from "../utils/trpc";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY =
  "pk_test_ZmluZS1sYWNld2luZy04Ny5jbGVyay5hY2NvdW50cy5kZXYk";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  //   ...FontAwesome.font,
  // });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  // const { isLoaded, isSignedIn } = useAuth();

  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.push("/modals/login");
  //   }
  // }, [isLoaded]);

  return (
    <TRPCProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)/add-meal"
          options={{
            presentation: "modal",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Text>Add</Text>
              </TouchableOpacity>
            ),
            headerTitle: "Add Meal",
          }}
        />
      </Stack>
    </TRPCProvider>
  );
}
