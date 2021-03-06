/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Dashboard, LoginScreen, RegisterScreen, ResetPasswordScreen, StartScreen } from "@/screens/Authentication";
import DarkModeScreen from "@/screens/SettingsScreen/DarkMode";
import LanguageScreen from "@/screens/SettingsScreen/Language";
import UserStore from "@/stores/user";
import { Fontisto, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderStyleInterpolators, TransitionPresets } from "@react-navigation/stack";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SettingsScreen from "../screens/Settings";
import { AuthParamList, BottomTabParamList, RootStackParamList } from "../types/navigatorTypes";

interface NavigationProps {
  userStore?: UserStore
}

const Navigation = (props: any) => {

  return (
    <NavigationContainer {...props}>
      <RootNavigatorMobx />
    </NavigationContainer>
  );
}

function forCustomHeaderAnimation(options: any) {
  const { progress } = options.current;
  const styles = HeaderStyleInterpolators.forUIKit(options);

  return {
    ...styles,
    leftButtonStyle: { opacity: progress },
    leftLabelStyle: {},
    rightButtonStyle: { opacity: progress },
  };
}

const screenOptions: any = {
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  detachPreviousScreen: false, // 修复导航栏动画左侧白边
  headerBackImage: ({ tintColor }: { tintColor: string }) =>
    <Ionicons name="ios-chevron-back" size={26} color={tintColor} />,
  ...TransitionPresets.SlideFromRightIOS,
  headerStyleInterpolator: forCustomHeaderAnimation
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
export const Stack = createStackNavigator<RootStackParamList>();
const Auth = createStackNavigator<AuthParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function RootNavigator({ userStore }: NavigationProps) {
  const userConf = userStore?.userConf
  const { colors }: {
    colors: ReactNativePaper.ThemeColors & {
      topBarColor?: string
      bottomBarColor?: string
    }
  } = useTheme()

  return (
    !(userConf && userConf.apiKey) ? <AuthNavigator /> :
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          ...screenOptions,
          headerStyle: {
            backgroundColor: colors.topBarColor
          }
        }}>
        <Stack.Screen
          name="BottomTab"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          name="LanguageScreen"
          component={LanguageScreen}
        />
        <Stack.Screen
          name="DarkModeScreen"
          component={DarkModeScreen}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
  );
}

const RootNavigatorMobx = inject('userStore')(observer(RootNavigator))

function AuthNavigator() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen name="StartScreen" component={StartScreen} />
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
      <Auth.Screen name="Dashboard" component={Dashboard} />
      <Auth.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Auth.Navigator>
  )
}

function BottomTabNavigator() {
  const { colors }: {
    colors: ReactNativePaper.ThemeColors & {
      topBarColor?: string
      bottomBarColor?: string
    }
  } = useTheme()

  return (
    <BottomTab.Navigator
      screenOptions={{
        ...screenOptions,
        headerShown: false,
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: colors.bottomBarColor }}></View>
        ),
        headerStyle: {
          backgroundColor: colors.topBarColor
        }
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '会话',
          tabBarLabel: '会话',
          tabBarIcon: ({ focused, color, size }) =>
            <Fontisto name="messenger" size={size - 2} color={color} />
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: '我',
          tabBarLabel: '我',
          tabBarIcon: ({ focused, color, size }) =>
            <Ionicons name="person" size={size} color={color} />
        }}
      />
    </BottomTab.Navigator >
  );
}

export default Navigation