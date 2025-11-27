import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import splashScreen from "./splashScreen";
import loginScreen from "./loginScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import eventScreen from "./eventScreen";
import searchScreen from "./searchScreen";
import favoriteScreen from "./favoriteScreen";
import profileScreen from "./profileScreen";
import { Image, StyleSheet, Text, View } from "react-native";
import images from "./images";

import { scale, hp, wp } from "./responsive";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Event"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Search"
        component={searchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={images.searchbutton}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#000" : "#999" },
                ]}
              />
              <Text style={[styles.label, { color: focused ? "#000" : "#999" }]}>
                Search
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Event"
        component={eventScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={images.calendar}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#000" : "#999" },
                ]}
              />
              <Text style={[styles.label, { color: focused ? "#000" : "#999" }]}>
                Event
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={favoriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={images.heart}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#000" : "#999" },
                ]}
              />
              <Text style={[styles.label, { color: focused ? "#000" : "#999" }]}
                numberOfLines={1}>
                Favorite
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={profileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={images.profile}
                style={[
                  styles.icon,
                  { tintColor: focused ? "#000" : "#999" },
                ]}
              />
              <Text style={[styles.label, { color: focused ? "#000" : "#999" }]}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};



const navigation: React.FC = () => {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="splashScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splashScreen" component={splashScreen} />
            <Stack.Screen name="loginScreen" component={loginScreen} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )

}
export default navigation

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(10),
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: hp(1.5),
    paddingTop: hp(1.5),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 10,
    elevation: 10,
  },

  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: wp(6),
    height: hp(3),
    resizeMode: "contain",
  },

  label: {
    fontSize: hp(0.9),
    fontWeight: "600",
    color: "#999",
    marginTop: hp(0.5),
    textAlign: "center",
    flexWrap: "nowrap",

  },
});

