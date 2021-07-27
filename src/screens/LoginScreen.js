import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

import { AuthContext } from '../components/context';
import axiox from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/theme';

const LoginScreen = ({ navigation }) => {

    const [textError, setTextError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
    });

    const login = () => {
        const object = {
            userid: data.username,
            password: data.password
        }

        axiox.post('https://program-api.herokuapp.com/login', object)
            .then(res => {
                console.log(res.data);
                setIsLoading(false);
                
                loginHandle(data.username, res.data.position, res.data.department);
                // console.log(res.data.position);

            })
            .catch(err => {
                // showDialog();
                // setTextQueue("การจองล้มเหลว \nเนื่องจากคิวเต็ม");
                // setStatus("จองคิวล้มเหลว");
                setTextError("User ID หรือ Password ไม่ถูกต้อง")
                console.log(err)
                setIsLoading(false);
            });

    }

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    }

    const updateSecureTextEntry = (val) => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const loginHandle = (username, position, department) => {
        signIn(username, position, department);
        // console.log(username, password);
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.text_header}>แบบประเมินพนักงาน</Text>
            </View>
            {/* <Text> CAL</Text> */}
            <Animatable.View style={styles.footer}
                animation='fadeInUpBig'>
                <Text style={styles.text_footer}>User ID</Text>
                <View style={styles.action}>
                    <Icon name='user'
                        color={COLORS.primary}
                        size={20} />
                    <TextInput placeholder="User ID ..."
                        style={styles.text_input}
                        onChangeText={(val) => textInputChange(val)} />
                </View>

                <Text style={styles.text_footer}>Password</Text>
                <View style={styles.action}>
                    <Icon name='lock'
                        color={COLORS.primary}
                        size={20} />
                    <TextInput placeholder="Password ..."
                        style={styles.text_input}
                        onChangeText={(val) => handlePasswordChange(val)} />
                </View>

                <Text style={{ alignSelf: 'center', color: 'red', marginTop: 26 }}>{textError}</Text>

                <Button
                    style={{ borderRadius: 10, marginTop: 16, backgroundColor: COLORS.primary }}
                    // icon="camera"
                    mode="contained"
                    onPress={() => {
                        setIsLoading(true);
                        login();
                    }}>
                    <Text style={{ fontSize: 18}}>เข้าสู่ระบบ</Text>
                </Button>

                {isLoading ?

                    <ActivityIndicator style={{
                        marginTop: 20,
                        // position: 'absolute',
                        // left: 0,
                        // right: 0,
                        // top: 0,
                        // bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} size="large" color="#0275d8" />

                    :

                    null
                }


            </Animatable.View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        flex: 1,
        backgroundColor: COLORS.primary
    },
    footer: {
        flex: 4,
        // justifyContent: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    logo: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 50
    },
    text_header: {
        alignSelf: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
    },
    action: {
        flexDirection: 'row',
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    text_input: {
        flex: 1,
        paddingLeft: 10,
        color: '#008080'
    },
    text_footer: {
        color: COLORS.primary,
        fontSize: 18,
    },
})

export default LoginScreen;