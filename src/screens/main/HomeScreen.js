import ScreenHeader from "~/components/ScreenHeader";
import TabBar from "~/components/TabBar";
import { BottomTab } from "~/utils";
import { PostsScreen, CreatePostsScreen, ProfileScreen } from "~/screens/main";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export default function HomeScreen({ navigation, route }) {
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log("navigation in HomeRouter", navigation);
  // console.log("route", route.name);
  // console.log("routeName", routeName);

  return (
    <BottomTab.Navigator
      initialRouteName="Posts"
      tabBar={(props) => <TabBar {...props} routeName={routeName} />}
    >
      <BottomTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          header: () => <ScreenHeader title="Публикации" />,
        }}
      />

      <BottomTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={({ navigation, route }) => ({
          header: (props) => (
            <ScreenHeader
              title="Создать публикацию"
              navigation={navigation}
              route={route}
              name="Create"
              {...props}
            />
          ),
        })}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
}
