import tabBarButtons from "./tabBarButtons";

export default function TabBar({ navigation, routeName, ...other }) {
  return tabBarButtons(routeName, navigation, other);
}
