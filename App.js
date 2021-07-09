import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/screens/HomeScreen'
import AssessmentScreen from './src/screens/AssessmentScreen';
import QuestionnaireAllStaffScreen from './src/screens/QuestionnaireAllStaffScreen';
import QuestionnaireManagerScreen from './src/screens/QuestionnaireManagerScreen';
import LoginScreen from './src/screens/LoginScreen';

import { AuthContext } from './src/components/context';
import RootStackScreen from './src/screens/RootStackScreen';
import { COLORS } from './src/constants/theme';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const Questionnaire = ({ route }) => {
  let userId = route.params.userId;
  let year = route.params.year;
  let part = route.params.part

  // console.log(route);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="QuestionnaireAllStaff"
        component={QuestionnaireAllStaffScreen}
        options={{ title: 'ทั่วไป' }}
        initialParams={{ userId: userId, year: year, part: part }} />
      <Tab.Screen
        name="QuestionnaireManager"
        component={QuestionnaireManagerScreen}
        options={{ title: 'ผู้จัดการถาม' }}
        initialParams={{ userId: userId, year: year, part: part }} />
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
    signIn: (userName, password) => {
      // setUserToken('asdf');
      // setIsLoading(false);
      let userToken;
      // userName = null;
      // if (userName === 'User' && password === 'Pass') {
      userToken = 'asdf'
      // }
      dispacth({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: () => {
      // setUserToken(null);
      // setIsLoading(false);
      dispacth({ type: 'LOGOUT' });
    },
  }), []);

  useEffect(() => {
    setTimeout(() => {
      // setIsLoading(false);
      dispacth({ type: 'RETRIEVE_TOKEN', token: 'asdf' });
    }, 1000);

  }, [])

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken != null ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerRight: () => <Icon name='sign-out'
                // color= {COLORS.primary}
                size={20}
                style={{ marginHorizontal: 16 }}
                onPress={() => {
                  authContext.signOut()
                }}
              />
            }}
            initialRouteName="Home">

            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'หน้าแรก', }} />
            <Stack.Screen name="Assessment" component={AssessmentScreen} options={{ title: 'ปีประเมิน' }} initialParams={{ year: {} }} />
            <Stack.Screen name="Questionnaire" component={Questionnaire} options={{ title: 'แบบประเมิน' }} />
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
