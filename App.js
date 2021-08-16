import React, { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import { USER } from './src/constants/variables'

import HomeScreen from './src/screens/HomeScreen'
import AssessmentScreen from './src/screens/AssessmentScreen';
import StaffQuestionnaireScreen from './src/screens/StaffQuestionnaireScreen';
import ManagerQuestionnaireScreen from './src/screens/ManagerQuestionnaireScreen';
import VideoWebViewScreen from './src/screens/VideoWebViewScreen';
import LoginScreen from './src/screens/LoginScreen';

import { AuthContext } from './src/components/context';
import RootStackScreen from './src/screens/RootStackScreen';
import { COLORS } from './src/constants/theme';
import UserListScreen from './src/screens/UserListScreen';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Questionnaire = ({ route }) => {

  const userId = route.params.userId;
  const sheetID = route.params.sheetID;
  const year = route.params.year;
  const part = route.params.part;

  // console.log(route);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="AllStaff"
        component={StaffQuestionnaireScreen}
        options={{ title: 'ทั่วไป' }}
        // listeners={({ navigation }) => ({ blur: () => navigation.setParams({ screen: undefined }) })}
        initialParams={{ userId: userId, sheetID: sheetID, year: year, part: part }} />
      <Tab.Screen
        name="Manager"
        component={ManagerQuestionnaireScreen}
        options={{ title: 'ผู้จัดการถาม' }}
        // listeners={({ navigation }) => ({ blur: () => navigation.setParams({ screen: undefined }) })}
        initialParams={{ userId: userId, sheetID: sheetID, year: year, part: part }} />
    </Tab.Navigator>
  );
}

const App = () => {

  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        };
    }
  };

  const [loginState, dispacth] = React.useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: (userName, position, department) => {
      // setUserToken('asdf');
      // setIsLoading(false);
      let userToken;
      // userName = null;
      // if (userName === 'User' && password === 'Pass') {
      userToken = userName;
      USER.position = position;
      USER.department = department;
      USER.userid = userName;

      // console.log(LOGIN.position);
      // }
      dispacth({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: () => {
      // setUserToken(null);
      // setIsLoading(false);
      dispacth({ type: 'LOGOUT' });
    },
  }), []);

  const logoutState = async () => {
    // console.log(queueSelect);
    try {
      await AsyncStorage.removeItem('user_login');
      return true;

    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {/* {console.log(loginState.userToken)} */}
        {loginState.userToken != null ? (

          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerRight: () => <Icon name='sign-out'
                // color= {COLORS.primary}
                size={20}
                style={{ marginHorizontal: 16 }}
                onPress={() => {
                  logoutState();
                  authContext.signOut();

                }}
              />
            }}
            initialRouteName="Home">

            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'หน้าแรก', }} initialParams={{ userid: loginState.userToken }} />
            <Stack.Screen name="Assessment" component={AssessmentScreen} options={{ title: 'ปีประเมิน' }} />
            <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'รายชื่อ' }} />
            <Stack.Screen name="Questionnaire" component={Questionnaire} options={{ title: 'แบบประเมิน' }} />
            <Stack.Screen name="VideoWebView" component={VideoWebViewScreen} options={{ title: 'ดูวิดีโอ' }} />
          </Stack.Navigator>
        )

          :

          <RootStackScreen />
        }

      </NavigationContainer>

    </AuthContext.Provider>

  );
}

export default App;
