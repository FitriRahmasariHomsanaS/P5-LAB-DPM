import React, { useState } from "react";
import {
  Text,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Icon,
  HStack,
  ScrollView,
  Image,
  Pressable,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// Extend the theme
export const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#e3f2f9",
      100: "#c5e4f3",
      200: "#a2d4ec",
      300: "#7ac1e4",
      400: "#47a9da",
      500: "#0088cc",
      600: "#007ab8",
      700: "#006ba1",
      800: "#005885",
      900: "#003f5e",
    },
    accent: {
      500: "#f0a500",
    },
  },
});

// List of Korean Dramas
const drakorList = [
  { id: "1", title: "Jeongnyeon: The Star is Born", status: "Complete", rating: 9.4, release: "10 jam yang lalu", views: "4.279.128", image: "https://i.pinimg.com/474x/64/e2/81/64e281832385337f02898375e37413a1.jpg", isFavorite: true },
  { id: "2", title: "When the Phone Rings", status: "Ongoing", rating: 9.5, release: "4 jam yang lalu", views: "1.358.581", image: "https://i.pinimg.com/736x/29/b8/e8/29b8e8a49d58ac2fecac7c930b232fa9.jpg", isFavorite: true },
  { id: "3", title: "Family by Choice", status: "Complete", rating: 9.2, release: "8 jam yang lalu", views: "3.287.694", image: "https://i.pinimg.com/236x/78/93/67/789367fb18a96323b805fc7acc3fc009.jpg", isFavorite: true },
  { id: "4", title: "Brewing Love", status: "Ongoing", rating: 9.0, release: "2 jam yang lalu", views: "1.312.112", image: "https://i.pinimg.com/474x/98/0f/05/980f0515a9328059a3d319f522517d34.jpg", isFavorite: true},
];

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

function HomeScreen({ navigation }) {
  const [favorites, setFavorites] = useState(drakorList);

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <Center _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }} flex={1}>
      {/* Header */}
      <HStack px={4} py={3} bg="primary.600" alignItems="center" justifyContent="space-between" w="100%">
        <Icon as={MaterialIcons} name="menu" size="lg" color="white" />
        <Heading color="white" size="md">Drakor Favorit</Heading>
        <Icon as={MaterialIcons} name="search" size="lg" color="white" />
      </HStack>

      {/* List of Favorite Dramas */}
      <ScrollView flex={1} w="100%">
        {favorites.map((item) => (
          <Box
            key={item.id}
            flexDirection="row"
            bg="primary.800"
            _light={{ bg: "primary.100" }}
            borderRadius="md"
            shadow={2}
            mx={4}
            my={2}
            p={3}
          >
            {/* Image */}
            <Image
              source={{ uri: item.image }}
              alt={item.title}
              size="xl"
              borderRadius="md"
            />

            {/* Content */}
            <VStack ml={3} flex={1} justifyContent="space-between">
              <Pressable onPress={() => navigation.navigate('Details', { item })}>
                <Heading size="sm" color="white" _light={{ color: "primary.900" }}>
                  {item.title}
                </Heading>
              </Pressable>
              <Text color="primary.200" fontSize="xs">{item.status}</Text>
              <Text color="accent.500" fontSize="sm">Rating: {item.rating}</Text>
              <Text color="primary.200" fontSize="xs">{item.release}</Text>
              <Text color="accent.500" fontSize="xs">{item.views} views</Text>
            </VStack>

            {/* Favorite Button */}
            <Pressable onPress={() => toggleFavorite(item.id)}>
              <Icon
                as={MaterialIcons}
                name={item.isFavorite ? "favorite" : "favorite-border"}
                size="lg"
                color={item.isFavorite ? "accent.500" : "primary.500"}
                alignSelf="center"
              />
            </Pressable>
          </Box>
        ))}
      </ScrollView>

      {/* Dark Mode Toggle */}
      <ToggleDarkMode />
    </Center>
  );
}

function DetailsScreen({ route }) {
  const { item } = route.params;
  return (
    <Center flex={1} _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
      <VStack space={4} alignItems="center">
        <Image source={{ uri: item.image }} alt={item.title} size="2xl" borderRadius="md" />
        <Heading color="primary.800" _light={{ color: "primary.900" }}>{item.title}</Heading>
        <Text>Status: {item.status}</Text>
        <Text>Rating: {item.rating}</Text>
        <Text>Release: {item.release}</Text>
        <Text>Views: {item.views}</Text>
      </VStack>
    </Center>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={4} alignItems="center" py={4}>
      <Text color="primary.500">Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
        offTrackColor="primary.600"
        onTrackColor="accent.500"
        onThumbColor="white"
      />
      <Text color="primary.500">Light</Text>
    </HStack>
  );
}
