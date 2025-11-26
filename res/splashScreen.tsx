import React, { useEffect } from "react"
import { Text, View } from "react-native"

const splashScreen: React.FC = ({ navigation }: any) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("loginScreen"); 
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "purple", justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white", fontSize: 30 }}>Splash Screen</Text>
    </View>
  );
};

export default splashScreen;