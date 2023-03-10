import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ScreenHeader from "~/components/ScreenHeader";
import TabBar from "~/components/TabBar";
import { BottomTab } from "~/utils";
import {
  PostsScreen,
  CreatePostsScreen,
  ProfileScreen,
  CommentsScreen,
  MapScreen,
} from "~/screens/main";

export default function HomeScreen({ navigation, route }) {
  const routeName = getFocusedRouteNameFromRoute(route);

  return (
    <BottomTab.Navigator
      initialRouteName="Posts"
      tabBar={(props) => <TabBar {...props} routeName={routeName} />}
    >
      <BottomTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          header: () => (
            <ScreenHeader title="Публикации" navigation={navigation} />
          ),
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
        navigation={navigation}
      />

      <BottomTab.Screen
        name="Comments"
        component={CommentsScreen}
        navigation={navigation}
        options={({ navigation, route }) => ({
          header: (props) => (
            <ScreenHeader
              title="Комментарии"
              navigation={navigation}
              route={route}
              name="Comments"
              {...props}
            />
          ),
        })}
      />

      <BottomTab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </BottomTab.Navigator>
  );
}
