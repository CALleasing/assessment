import React, { useState } from 'react';
import { Modal, SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Card } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { USER } from '../constants/variables';

// import Dialog from "react-native-dialog";

import { SIZES, COLORS, FONTS } from '../constants/theme';
import { render } from 'react-dom';

const HomeScreen = ({ navigation, route }) => {

    const userid = USER.userid;
    const position = USER.position;

    console.log(userid);

    const [dialogAdmin, setDialogAdmin] = useState(false);

    const list = [
        {
            id: 1,
            iconName: 'tasks',
            detail: "ทำแบบประเมิน"
        },
        {
            id: 4,
            iconName: 'users',
            detail: "ความเห็นถึง ผจก."
        },
        {
            id: 2,
            iconName: 'check-square',
            detail: "ดูคำตอบทุกคน"
        },
        {
            id: 3,
            iconName: 'question-circle',
            detail: "ตั้งคำถาม"
        }
    ]

    const renderMenuItem = ({ navigation }) => {
        const [selectedCategory, setSelectedCategory] = useState(null)

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginVertical: 16,
                        padding: 8,
                        paddingBottom: SIZES.padding,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                        ...styles.shadow
                    }}
                    onPress={() => {
                        {
                            console.log(item.id);
                            console.log(position);
                            switch (item.id) {
                                case 1: navigation.navigate('Assessment', { item: item.id });
                                    break;
                                case 2: position === 'admin' || position === 'ผู้จัดการ' ?
                                    navigation.navigate('Assessment', { item: item.id }) :
                                    setDialogAdmin(true);
                                    break;
                                case 3: position === 'admin' ?
                                    navigation.navigate('Assessment', { item: item.id }) :
                                    setDialogAdmin(true);
                                    break;
                                case 4: navigation.navigate('Assessment', { item: item.id });
                                    break;
                                default: break;
                            }
                        }

                    }} >

                    <Icon name={item.iconName}
                        color={COLORS.primary}
                        size={60} />
                    <Text
                        style={{
                            marginTop: 8,
                            marginBottom: 4,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body3
                        }}
                    >
                        {item.detail}
                    </Text>
                    <Text
                        style={{
                            marginBottom: 8,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.department}
                    </Text>
                </TouchableOpacity >
            );
        }

        return (
            <FlatList
                data={list}
                renderItem={renderItem}
                numColumns={2}
                keyExtractor={(item, index) => `${index}`}
            />
        );
    }

    return (
        // <ScrollView>
        <SafeAreaView >
            <Animatable.View
                animation='fadeIn'>
                <LinearGradient
                    style={styles.linear_gradient}
                    colors={[COLORS.primary, COLORS.primary]} >
                    <Text style={styles.text_header}>แบบประเมิน</Text>
                </LinearGradient>
                {/* <View style={{ marginTop: 16, alignSelf: 'center', justifyContent: 'center' }}> */}
                    <Text style={{margin:16, alignSelf: 'center', fontSize: 16, color: 'green' }}>
                        สวัสดีคุณ : {USER.name} {USER.lastname}  ({USER.department})
                    </Text>
                {/* </View> */}
                <View>
                    {renderMenuItem({ navigation })}
                </View>
            </Animatable.View>

            <AwesomeAlert
                show={dialogAdmin}
                title="ผิดพลาด"
                message="Admin หรือ ผู้จัดการ เท่านั้นที่สามารถดูได้"
                closeOnTouchOutside={false}
                confirmText="ตกลง"
                showConfirmButton={true}
                confirmButtonColor={COLORS.primary}
                onConfirmPressed={() => {
                    setDialogAdmin(false);
                }}
            />

        </SafeAreaView>
    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containeralt: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#eee',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        height: 300,
        margin: 'auto',
        padding: 30,
        width: 300
    },
    text_header: {
        padding: 8,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    },
    tab_style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50
    },
    linear_gradient: {
        height: 48
    },
    header: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
});

export default HomeScreen;