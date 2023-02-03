import { useState } from "react";
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
import Icon from "react-native-vector-icons/AntDesign";

const credentialFields = Object.freeze({
  name: "name",
  email: "email",
  password: "password",
});

const initialState = { name: "", email: "", password: "" };

export default function RegistrationScreen() {
  const [activeField, setActiveField] = useState(null);
  const [state, setState] = useState(initialState);

  const handlerForm = (text, field) =>
    setState((prevState) => ({ ...prevState, [field]: text }));

  const handlerRegister = (e) => {
    console.log(state);
    Keyboard.dismiss();
    setState(initialState);
  };
  const handlerLogin = (e) => {
    console.log(`Redirect to loginScreen`);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => console.log("lalala")}>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={require("../../assets/images/BG.jpg")}
          style={styles.bg}
        >
          <View style={styles.form}>
            <View style={styles.avatar}>
              <TouchableOpacity style={styles.avatarBtn} activeOpacity={0.8}>
                <Icon name="plus" size={16} color="#FF6C00" />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: "auto" }}>
              <Text style={styles.title}>Регистрация</Text>
              <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <TextInput
                  onFocus={() => setActiveField(credentialFields.name)}
                  onBlur={() => setActiveField(null)}
                  onChangeText={(text) =>
                    handlerForm(text, credentialFields.name)
                  }
                  value={state.name}
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

                <TextInput
                  onFocus={() => setActiveField(credentialFields.email)}
                  onBlur={() => setActiveField(null)}
                  onChangeText={(text) =>
                    handlerForm(text, credentialFields.email)
                  }
                  value={state.email}
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

                <TextInput
                  onFocus={() => setActiveField(credentialFields.password)}
                  onBlur={() => setActiveField(null)}
                  onChangeText={(text) =>
                    handlerForm(text, credentialFields.password)
                  }
                  value={state.password}
                  style={{
                    ...styles.input,
                    marginBottom: Dimensions.get("window").height * 0.053,
                    borderColor:
                      activeField === credentialFields.password
                        ? "#FF6C00"
                        : "#E8E8E8",
                  }}
                  placeholder="Пароль"
                  placeholderTextColor={"#BDBDBD"}
                  secureTextEntry={true}
                ></TextInput>
              </KeyboardAvoidingView>
            </View>

            {!activeField && (
              <View>
                <TouchableOpacity
                  onPress={handlerRegister}
                  style={styles.regBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.regBtnText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handlerLogin}
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
    height: Dimensions.get("window").height * 0.676,
    backgroundColor: "#FFFFFF",
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: Dimensions.get("window").height * 0.113,
    paddingBottom: Dimensions.get("window").height * 0.096,
    paddingHorizontal: 16,
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
    letterSpacing: 0.01,
    marginBottom: Dimensions.get("window").height * 0.039,
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
    marginBottom: Dimensions.get("window").height * 0.02,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
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
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "400",
    color: "#1B4371",
  },
  avatar: {
    position: "absolute",
    width: Dimensions.get("window").height * 0.148,
    height: Dimensions.get("window").height * 0.148,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
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
