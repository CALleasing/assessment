import React from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import axiox from 'axios';
import { MAIN_URL, USER } from '../constants/variables';

const EmployeeStatusSelectScreen = ({ navigation, route }) => {

    let sheetID = route.params.item;
    let userid = USER.userid;
    let position = USER.position;
    let department = USER.department;

    // const getDepartment = () => {
    //     console.log(department);
    //     // console.log(MAIN_URL + '/users/department/' + department);
    //     axiox.get(MAIN_URL + '/users/department/' + department)
    //         .then(res => {
    //             setUsers(res.data);
    //             setLoading(false);
    //             setArrayholder(res.data)
    //             // console.log(users);
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // };

    // useEffect(() => {
    //     setLoading(true);
    //     if (position === 'admin' || department === 'MD') {
    //         getAllQuestion();
    //     } else {
    //         getDepartment();
    //     }


    // }, []);

    return (
        <Animatable.View
            style={{ flex: 1 }}
            animation='fadeIn'>
            <TouchableOpacity
                style={{ marginVertical: 20, marginHorizontal: 30, borderRadius: 10, backgroundColor: 'green' }}
                onPress={() => {
                    navigation.navigate('UserList', {
                        userId: USER.userid,
                        sheetID: sheetID,
                    })
                }}>
                <Text style={{ paddingVertical: 20, alignSelf: 'center', color: 'white', fontSize: 20 }}>เลือกพนักงานในทีมเพื่อประเมิน</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginVertical: 20, marginHorizontal: 30, borderRadius: 10, backgroundColor: 'blue' }}
                onPress={() => {
                    navigation.navigate('EmployeeStatusComment')
                }}>
                <Text style={{ paddingVertical: 20, alignSelf: 'center', color: 'white', fontSize: 20 }}>ดูรายชื่อพนักงานที่ประเมินแล้ว</Text>
            </TouchableOpacity>
        </Animatable.View>

    )
}

export default EmployeeStatusSelectScreen;