import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';

import axiox from 'axios';
import { MAIN_URL, USER } from '../constants/variables';

const UserListScreen = ({ navigation, route }) => {

    let sheetID = route.params.sheetID;
    let year = route.params.year;
    let part = route.params.part;
    let userid = USER.userid;
    let position = USER.position;
    let department = USER.department;

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [userNotComplete, setUserNotComplete] = useState([]);

    const [arrayholder, setArrayholder] = useState([])
    const [text, setText] = useState("");
    // const[data, setData] = useState([])


    const getAllQuestion = () => {
        setLoading(true);
        axiox.get(MAIN_URL + '/question/staff/' + year + '/' + part)
            .then(res => {
                getUsers(res.data.length);

            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            });
    };

    const getUsers = async (choiceCount) => {
        // console.log(choiceCount);
        await axiox.get(MAIN_URL + '/users/' + year + '/' + part + '/' + choiceCount)
            .then(res => {
                setUsers(res.data);
                setLoading(false);
                setArrayholder(res.data)
                getUsersNoComplete(choiceCount);
                // console.log(users);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const getUsersNoComplete = async (choiceCount) => {
        console.log(MAIN_URL + '/users/' + year + '/' + part + '/notcomplete/' + choiceCount);
        await axiox.get(MAIN_URL + '/users/' + year + '/' + part + '/notcomplete/' + choiceCount)
            .then(res => {
                console.log(res.data);
                setUserNotComplete(res.data);
                setLoading(false);

                // setArrayholder(res.data)
                // console.log(users);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const getDepartment = () => {
        console.log(department);
        // console.log(MAIN_URL + '/users/department/' + department);
        axiox.get(MAIN_URL + '/users/department/' + department)
            .then(res => {
                for(var i = 0; i < res.data.length; i++){
                    setUsers(pre => [...pre, res.data[i]]);
                    setArrayholder(holder => [...holder, res.data[i]])
                }
                // setUsers(res.data);
                setLoading(false);
                // setArrayholder(res.data);

                if(department === 'AR'){
                    departmentAR();
                    console.log("TEST")
                }
                // console.log(users);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    };

    const departmentIT = () => {
        axiox.get(MAIN_URL + '/users/department/IT')
            .then(res => {
                for(var i = 0; i < res.data.length; i++){
                    setUsers(pre => [...pre, res.data[i]]);
                    setArrayholder(holder => [...holder, res.data[i]])
                }
                // setUsers(pre => [pre, res.data]);
                // setLoading(false);
                
                
                departmentOP();
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }

    const departmentOP = () => {
        axiox.get(MAIN_URL + '/users/department/OP')
            .then(res => {
                for(var i = 0; i < res.data.length; i++){
                    setUsers(pre => [...pre, res.data[i]]);
                    setArrayholder(holder => [...holder, res.data[i]])
                }
              
                setLoading(false);
                
                console.log(users);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }

    const departmentAR = () => {
        axiox.get(MAIN_URL + '/users/department/AD')
            .then(res => {
                for(var i = 0; i < res.data.length; i++){
                    setUsers(pre => [...pre, res.data[i]]);
                    setArrayholder(holder => [...holder, res.data[i]])
                }
              
                setLoading(false);
                
                // console.log(users);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }

    useEffect(() => {
        setLoading(true);
        if (sheetID === 5) {
            if (position === 'admin' || department === 'MD') {
                departmentIT();
            } else {
                getDepartment();
            }
        }
        else {
            if (position === 'admin' || department === 'MD') {
                getAllQuestion();
            } else {
                getDepartment();
            }
        }



    }, []);

    const searchData = (text) => {

        const newData = arrayholder.filter(item => {
            // console.log(item.nickname)
            const itemData = item.nickname;
            const textData = text;
            return itemData.indexOf(textData) > -1
        });
        setUsers(newData);
        setText(text);
    }

    // const itemSeparator = () => {
    //     return (
    //         <View
    //             style={{
    //                 height: .5,
    //                 width: "100%",
    //                 backgroundColor: "#000",
    //             }}
    //         />
    //     );
    // }


    const renderUsers = ({ navigation }) => {

        // console.log(users);

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        sheetID === 5 ?
                            navigation.navigate('EmployeeStatus', {
                                sheetID: sheetID,
                                user: item
                            }) :
                            // console.log(item.name);
                            navigation.navigate('Questionnaire', {
                                sheetID: sheetID,
                                userId: item.userid,
                                year: year,
                                part: part
                            });
                    }}>
                    <View style={{ backgroundColor: 'white', borderWidth: 0.5, padding: 8, borderRadius: 10, margin: 4 }}>
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
            sheetID === 2 && department === "MD" ?

                <FlatList
                    data={users}
                    keyExtractor={(item, index) => `${index}`}
                    // ItemSeparatorComponent={itemSeparator}
                    shouldComponentUpdate={false}
                    renderItem={renderItem}
                    ListHeaderComponent={
                        <View style={{ borderRadius: 8, backgroundColor: 'green', padding: 20 }}>
                            <Text style={{ color: 'white', fontSize: 20 }}>คนตอบคำถามครบ</Text>
                        </View>
                    }
                    ListFooterComponent={
                        <FlatList
                            data={userNotComplete}
                            keyExtractor={(item, index) => `${index}`}
                            // ItemSeparatorComponent={itemSeparator}
                            shouldComponentUpdate={false}
                            renderItem={renderItem}
                            ListHeaderComponent={
                                <View style={{ borderRadius: 8, backgroundColor: 'red', padding: 20 }}>
                                    <Text style={{ color: 'white', fontSize: 20 }}>คนตอบคำถามไม่ครบ</Text>
                                </View>
                            }
                        />
                    }

                // horizontal
                // showsHorizontalScrollIndicator={false}
                />

                :
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

            <TextInput
                style={styles.textInput}
                onChangeText={(text) => searchData(text)}
                value={text}
                underlineColorAndroid='transparent'
                placeholder="ค้นหาจากชื่อเล่น" />

            {position === 'ผู้จัดการ' && department === "MD" ?
                <View style={{ borderBottomWidth: 0.5, borderBottomColor: 'gray' }}>
                    <Text style={{ color: 'green', marginHorizontal: 8, marginBottom: 8, }}>จำนวนคนตอบคำถามครบ {users.length} คน</Text>
                    <Text style={{ color: 'red', marginHorizontal: 8, marginBottom: 8, }}>จำนวนคนตอบคำถามไม่ครบ {userNotComplete.length} คน</Text>
                </View>
                :

                null}


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
}

const styles = StyleSheet.create({
    textInput: {
        margin: 8,
        paddingHorizontal: 16,
        height: 42,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 8,
        backgroundColor: "#FFFF"

    }
});

export default UserListScreen;