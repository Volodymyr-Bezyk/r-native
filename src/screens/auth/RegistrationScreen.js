import { useState, useEffect } from "react";
import { authSignUpUser } from "~/redux/auth/authOperations";
import { useDispatch } from "react-redux";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import credentialFields from "~/constants";

export default function RegistrationScreen({ navigation }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeField, setActiveField] = useState(null);

  const [passwordIsHidden, setPasswordIsHidden] = useState(true);

  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleRegister = (e) => {
    // console.log({ name, email, password });
    dispatch(authSignUpUser({ name, email, password }));
    // setName("");
    // setEmail("");
    // setPassword("");
    // navigation.navigate("Home", {
    //   screen: "Registration",
    //   credential: { email, password, name },
    // });
  };

  const handleToLogin = (e) =>
    navigation.navigate("Login", { screen: "Registration", params: {} });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={require("~/../assets/images/BG.jpg")}
          style={styles.bg}
        >
          <View
            style={{
              ...styles.form,
              paddingBottom: keyboardIsVisible
                ? Dimensions.get("window").height * 0.039
                : Dimensions.get("window").height * 0.076,
            }}
          >
            <View style={styles.avatarWrap}>
              <Image
                style={styles.avatar}
                source={{
                  uri: "https://www.kindpng.com/picc/m/137-1370686_anime-avatar-png-transparent-avatar-gaming-logo-png.png",
                }}
              />
              <TouchableOpacity style={styles.avatarBtn} activeOpacity={0.8}>
                <Feather name="plus" size={16} color="#FF6C00" />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: "auto" }}>
              <Text style={styles.title}>Регистрация</Text>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={styles.inputWrap}>
                  <TextInput
                    onFocus={() => setActiveField(credentialFields.name)}
                    onBlur={() => setActiveField(null)}
                    onChangeText={setName}
                    value={name}
                    style={{
                      ...styles.input,
                      borderColor:
                        activeField === credentialFields.name
                          ? "#FF6C00"
                          : "#E8E8E8",
                    }}
                    placeholder="Логин"
                    placeholderTextColor={"#BDBDBD"}
                    inputMode={"text"}
                  ></TextInput>
                </View>

                <View style={styles.inputWrap}>
                  <TextInput
                    onFocus={() => setActiveField(credentialFields.email)}
                    onBlur={() => setActiveField(null)}
                    onChangeText={setEmail}
                    value={email}
                    style={{
                      ...styles.input,
                      borderColor:
                        activeField === credentialFields.email
                          ? "#FF6C00"
                          : "#E8E8E8",
                    }}
                    placeholder="Адресс электронной почты"
                    placeholderTextColor={"#BDBDBD"}
                    inputMode={"email"}
                    keyboardType={"email-address"}
                  ></TextInput>
                </View>

                <View
                  style={{
                    ...styles.inputPasswordWrap,
                    marginBottom: keyboardIsVisible
                      ? 0
                      : Dimensions.get("window").height * 0.053,
                  }}
                >
                  <TextInput
                    onFocus={() => setActiveField(credentialFields.password)}
                    onBlur={() => setActiveField(null)}
                    onChangeText={setPassword}
                    value={password}
                    style={{
                      ...styles.input,
                      borderColor:
                        activeField === credentialFields.password
                          ? "#FF6C00"
                          : "#E8E8E8",
                    }}
                    placeholder="Пароль"
                    placeholderTextColor={"#BDBDBD"}
                    secureTextEntry={passwordIsHidden}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.inputPasswordBtn}
                    activeOpacity={0.7}
                    onPressIn={() => setPasswordIsHidden(false)}
                    onPressOut={() => setPasswordIsHidden(true)}
                  >
                    <Text style={styles.inputPasswordBtnText}>Показать</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>

            {!keyboardIsVisible && (
              <View>
                <TouchableOpacity
                  onPress={handleRegister}
                  style={styles.regBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.regBtnText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleToLogin}
                  style={styles.loginBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginBtnText}>
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  form: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: Dimensions.get("window").height * 0.113,
    paddingHorizontal: 16,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
    letterSpacing: 0.01,
    marginBottom: Dimensions.get("window").height * 0.039,
  },
  inputWrap: {
    marginBottom: Dimensions.get("window").height * 0.02,
  },
  inputPasswordWrap: {
    position: "relative",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: Dimensions.get("window").height * 0.018,
    paddingBottom: Dimensions.get("window").height * 0.018,
    height: Dimensions.get("window").height * 0.062,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  inputPasswordBtn: {
    position: "absolute",
    top: 0,
    right: 16,
    transform: [{ translateY: Dimensions.get("window").height * 0.018 }],
  },
  inputPasswordBtnText: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    lineHeight: 19,
    color: "#1B4371",
  },
  regBtn: {
    paddingHorizontal: 32,
    paddingVertical: Dimensions.get("window").height * 0.02,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  regBtnText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
  },
  loginBtn: {
    paddingHorizontal: 32,
    paddingVertical: Dimensions.get("window").height * 0.02,
  },
  loginBtnText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    color: "#1B4371",
  },
  avatarWrap: {
    width: 120,
    height: 120,
    position: "absolute",
    top: 0,
    left: 0,
    transform: [
      {
        translateX:
          Dimensions.get("window").width / 2 -
          Dimensions.get("window").height * 0.074,
      },
      { translateY: -Dimensions.get("window").height * 0.074 },
    ],
  },
  avatar: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [
      { translateX: Dimensions.get("window").height * 0.016 },
      { translateY: -Dimensions.get("window").height * 0.016 },
    ],
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").height * 0.031,
    height: Dimensions.get("window").height * 0.031,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
  },
});
