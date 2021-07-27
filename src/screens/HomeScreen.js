import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, Card } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { LOGIN } from '../constants/variables';

import Dialog from "react-native-dialog";

import { SIZES, COLORS, FONTS } from '../constants/theme';

const HomeScreen = ({ navigation, route }) => {

    const userid = LOGIN.userid;
    const position = LOGIN.position;

    console.log(userid);

    const [dialogAdmin, setDialogAdmin] = useState(false);

    const list = [
        {
            id: 1,
            iconName: 'address-card',
            detail: "ทำแบบประเมิน"
        },
        // {
        //     id: 2,
        //     iconName: 'question-circle',
        //     detail: "สร้างคำถาม"
        // },
        {
            id: 2,
            iconName: 'check-square',
            detail: "ดูคำตอบทุกคน"
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
                            item.id === 1 ? 
                            navigation.navigate('Assessment', { item: item.id })
                            
                            :

                            position === 'admin' || position === 'ผู้จัดการ' ?
                            navigation.navigate('Assessment', { item: item.id }) :
                            setDialogAdmin(true);

                            // position === 'ผู้จัดการ' ?
                            // navigation.navigate('Assessment', { item: item.id }) :
                            // setDialogAdmin(true);
                        }
                        // navigation.navigate('Booking', { item: item.id })
                    }} >

                    <Icon name={item.iconName}
                        color={COLORS.primary}
                        size={60} />
                    <Text
                        style={{
                            marginTop: 8,
                            marginBottom: 4,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black,
                            ...FONTS.body2
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
                keyExtractor={item => `${item.id}`}
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
                <View>
                    {renderMenuItem({ navigation })}
                </View>
            </Animatable.View>

            <Dialog.Container visible={dialogAdmin}>
                <Dialog.Title style={{ fontSize: 20, fontWeight: 'bold' }}>ผิดพลาด</Dialog.Title>
                <Dialog.Description style={{ fontSize: 18, padding: 16 }}>Admin หรือ ผู้จัดการ เท่านั้นที่สามารถดูได้</Dialog.Description>

                <Dialog.Button
                    label="ตกลง"
                    onPress={() => {

                        setDialogAdmin(false);
                    }} />

            </Dialog.Container>

        </SafeAreaView>

        // </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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