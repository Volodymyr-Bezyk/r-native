import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { fonts } from "~/constants";
import { store } from "./src/redux/store";
import { Main } from "~/components/Main";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);
  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
