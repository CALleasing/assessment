import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';

import axiox from 'axios';
import { MAIN_URL, USER } from '../constants/variables';

const ManagerListScreen = ({ navigation, route }) => {
    let sheetID = route.params.sheetID;
    let year = route.params.year;
    let part = route.params.part;
    let userid = USER.userid;
    let position = USER.position;
    let department = USER.department;

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getManagerList();

    }, []);

    const getManagerList = () => {
        // console.log(MAIN_URL + '/users/position/ผู้จัดการ');
        axiox.get(MAIN_URL + '/users/position/ผู้จัดการ')
            .then(res => {
                setUsers(res.data);
                setLoading(false);
                // setArrayholder(res.data)
                // console.log(users);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const renderUsers = ({ navigation }) => {

        // console.log(users);

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        // console.log(item);
                        // console.log(USER)
                        navigation.navigate('StaffComment', {
                            sheetID: sheetID,
                            managerID: item.userid,
                            year: year,
                            part: part
                        });
                    }}>
                    <View style={{backgroundColor: 'white', borderWidth: 0.5, padding: 8, borderRadius: 10, margin: 4 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>
                            ชื่อ : {item.name + " " + item.lastname}
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>
                            ชื่อเล่น : {item.nickname}
                        </Text>
                        <Text>
                            เบอร์โทร :{item.phone}
                        </Text>
                        <Text>
                            แผนก : {item.department}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <FlatList
                data={users}
                keyExtractor={(item, index) => `${index}`}
                // ItemSeparatorComponent={itemSeparator}
                shouldComponentUpdate={false}
                renderItem={renderItem}
            // horizontal
            // showsHorizontalScrollIndicator={false}
            />

        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* <TextInput
                style={styles.textInput}
                onChangeText={(text) => searchData(text)}
                value={text}
                underlineColorAndroid='transparent'
                placeholder="ค้นหาจากชื่อเล่น" /> */}

            {/* {position === 'admin' ?
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray' }}>
                    <Text style={{ marginHorizontal: 8, marginBottom: 8, }}>จำนวนคนตอบคำถามครบ {users.length} คน</Text>
                </View>
                :
                null} */}


            {renderUsers({ navigation })}

            {isLoading ?

                <ActivityIndicator style={{

                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }} size="large" color="#0275d8" />
                :
                null
            }

        </SafeAreaView>

    );
};

export default ManagerListScreen;