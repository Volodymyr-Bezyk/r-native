import { useState, useEffect } from "react";
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
} from "react-native";
import credentialFields from "~/constants";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeField, setActiveField] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [passwordIsHidden, setPasswordIsHidden] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSignUp = (e) => {
    console.log({ email, password });

    setEmail("");
    setPassword("");
    navigation.navigate("Home", { screen: "Settings", params: {} });
  };

  const handleToRegister = (e) =>
    navigation.navigate("Registration", { screen: "Settings", params: {} });

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
              paddingBottom: keyboardVisible
                ? Dimensions.get("window").height * 0.039
                : Dimensions.get("window").height * 0.158,
            }}
          >
            <View style={{ marginTop: "auto" }}>
              <Text style={styles.title}>Войти</Text>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
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
                    marginBottom: keyboardVisible
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

            {!keyboardVisible && (
              <View>
                <TouchableOpacity
                  onPress={handleSignUp}
                  style={styles.regBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.regBtnText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleToRegister}
                  style={styles.loginBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginBtnText}>
                    Нет аккаунта? Зарегистрироваться
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
    backgroundColor: "#FFFFFF",
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: Dimensions.get("window").height * 0.039,
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
});
