import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";

import colors from "./colours";
import strings from "./strings";
import { scale, hp, wp } from "./responsive";
import images from "./images";
import { validateLogin } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./api/authApi";
import colours from "./colours";

const loginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const validate = async () => {
    const errors = validateLogin(email, password);

    setEmailError(errors.email || "");
    setPassError(errors.password || "");

    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    const result = await dispatch(loginUser({ email, password }));
    setLoading(false);
    if (loginUser.fulfilled.match(result)) {
      navigation.replace("BottomTabs");
    } else {
      Alert.alert("Login Failed",);
    }
  };

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colours.primary} />
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"   
          backgroundColor="#ffffff" 
          translucent={false}       
        />

        <View style={styles.topSection}>
          <Text style={styles.logoText}>{strings.appName}</Text>
        </View>

        <View style={styles.formArea}>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder={strings.emailPlaceholder}
            style={styles.input}
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              setEmailError("");
            }}
          />
          {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

          <Text style={styles.label}>Password</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Password"
              style={styles.inputeye}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setPassError("");
              }}
            />

            <TouchableOpacity
              style={styles.eyeContainer}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={images.eye}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {passError ? <Text style={styles.error}>{passError}</Text> : null}

          <TouchableOpacity style={{ alignSelf: "flex-end" }}>
            <Text style={styles.forgot}>{strings.forgotPassword}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.signInBtn, { opacity: loading ? 0.7 : 1 }]}
            disabled={loading}
            onPress={() => { validate() }}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.signInText}>{strings.signIn}</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.signupText}>
            {strings.notMember}{" "}
            <Text style={styles.signupLink}>{strings.signUpHere}</Text>
          </Text>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>{strings.orSignin}</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            <View style={styles.socialBox}>
              <Image
                source={images.google}
                style={{
                  width: wp(6),
                  height: hp(3),
                  resizeMode: "contain",
                }}
              />
            </View>
            <View style={styles.socialBox}>
              <Image
                source={images.apple}
                style={{
                  width: wp(6),      
                  height: hp(3),    
                  resizeMode: "contain",
                }}
              />
            </View>
            <View style={styles.socialBox}>
              <Image
                source={images.facebook}
                style={{
                  width: wp(6),
                  height: hp(3),
                  resizeMode: "contain",
                }}
              />
            </View>
          </View>

          <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: hp(8), alignItems: "center" }}>
            <Text style={styles.guestText}>{strings.enterGuest}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default loginScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },

  eyeButton: {
    padding: 5,
  },


  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 15,
    height: 50,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  inputeye: {
    flex: 1,
    fontSize: 16,
  },

  eyeContainer: {
    padding: 5,
  },

  eyeIcon: {
    width: 22,
    height: 22,
    tintColor: "#8e8e8e",
  },
  container: { flex: 1, backgroundColor: colors.white },

  topSection: {
    height: hp(35),
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },

  logoText: {
    fontSize: scale(50),
    fontWeight: "300",
  },

  formArea: {
    paddingHorizontal: wp(6),
    paddingVertical: hp(2),
  },

  label: {
    fontSize: scale(14),
    marginTop: hp(1),
    marginBottom: hp(0.7),
  },

  input: {
    backgroundColor: colors.white,
    padding: hp(1.7),
    borderRadius: 8,
    elevation: 3,
  },

  error: {
    color: colors.error,
    marginTop: hp(0.5),
    marginBottom: hp(0.5),
    fontSize: scale(12),
  },

  forgot: {
    fontSize: scale(12),
    color: colors.gray,
    marginTop: hp(0.5),
  },

  signInBtn: {
    backgroundColor: colors.primary,
    padding: hp(1),
    borderRadius: 8,
    marginTop: hp(2),
    alignItems: "center",
    width: wp(30),
    alignSelf: "flex-end"

  },

  signInText: {
    color: colors.white,
    fontSize: scale(18),
    fontWeight: "600",
  },

  signupText: {
    textAlign: "center",
    marginTop: hp(1.5),
    fontSize: scale(14),
    alignSelf: "flex-end"
  },

  signupLink: {
    color: colors.black,
    textDecorationLine: "underline",

  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(2),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  orText: {
    marginHorizontal: wp(3),
    color: colors.gray,
  },

  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: wp(5),
  },

  socialBox: {
    backgroundColor: colors.white,
    borderRadius: 5,
  },

  guestText: {
    color: colors.gray,
    fontSize: scale(14),
  },
});
