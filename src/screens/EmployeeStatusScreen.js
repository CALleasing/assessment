import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

import axiox from 'axios';
import moment from 'moment';
import 'moment/locale/th';

import { MAIN_URL, USER } from '../constants/variables';
import { Button } from 'react-native-paper';
import { COLORS } from '../constants/theme';

const EmployeeStatusScreen = ({ route }) => {

    let user = route.params.user;
    const [loading, setLoading] = useState(false);
    // console.log(user)
    const [selected, setSelected] = useState(0);
    // var selectIndex = 0;
    const [answer, setAnswer] = useState('1. โน้มน้าวใจให้เขาอยู่ต่อ');
    const [reason, setReason] = useState('');
    const list = [
        {
            id: 1,
            question: '1. โน้มน้าวใจให้เขาอยู่ต่อ'
        },
        {
            id: 2,
            question: '2. ไม่แน่ใจ (ปรับทัศนคติใหม่)'
        },
        {
            id: 3,
            question: '3. เฉยๆ (เดี๋ยวหาใหม่ก็ได้)'
        },
        {
            id: 4,
            question: '4. โล่งใจ'
        }
    ]

    useEffect(() => {
        getEmployeeAssessmentByUserId();
    }, []);

    const getEmployeeAssessmentByUserId = () => {
        setLoading(true);
        console.log(MAIN_URL + '/answer/assessment/users/' + user.userid)
        axiox.get(MAIN_URL + '/answer/assessment/users/' + user.userid)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                console.log("ALL DATA", res.data);
                if (res.data.length !== 0) {
                    setAnswer(res.data[0].answer);
                    setReason(res.data[0].reason);
                    switch (res.data[0].answer) {
                        case '1. โน้มน้าวใจให้เขาอยู่ต่อ': setSelected(0);
                            break;
                        case '2. ไม่แน่ใจ (ปรับทัศนคติใหม่)': setSelected(1);
                            break;
                        case '3. เฉยๆ (เดี๋ยวหาใหม่ก็ได้)': setSelected(2);
                            break;
                        case '4. โล่งใจ': setSelected(3);
                            break;
                    }
                } else {
                    setAnswer('1. โน้มน้าวใจให้เขาอยู่ต่อ')
                    setSelected(0);
                    setReason('');
                }

                // console.log(selectIndex);
                // alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setAnswer('1. โน้มน้าวใจให้เขาอยู่ต่อ')
                setSelected(0);
                setReason('');
                // alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);

            });
    };

    const postAnswer = ({ dataSend }) => {
        console.log()
        axiox.post(MAIN_URL + '/answer/assessment', dataSend)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                // console.log(res.data);
                alert("บันทึกข้อมูลสำเร็จ");
                // setLoading(false);
            })
            .catch(err => {
                console.log(err)
                alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                // setLoading(false);

            });
    }

    const renderList = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ margin: 8 }}
                onPress={() => {
                    console.log(index);
                    setSelected(index);
                    setAnswer(item.question);
                }}>
                {selected === index ?
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='check-circle'
                            color={COLORS.primary}
                            size={30} />
                        <Text style={{ fontSize: 16, alignSelf: 'center' }}> {item.question}</Text>
                    </View>
                    :
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='circle'
                            color={COLORS.primary}
                            size={30} />
                        <Text style={{ fontSize: 16, alignSelf: 'center' }}> {item.question}</Text>
                    </View>
                }
            </TouchableOpacity>
        )
    }

    return (

        <Animatable.View
            style={{ flex: 1, padding: 20, backgroundColor: 'white' }}
            animation='fadeIn'>

            <View style={{ marginVertical: 24 }}>
                {loading ?
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
                    <FlatList
                        data={list}
                        renderItem={renderList}
                        // numColumns={2}
                        keyExtractor={(item, index) => `${index}`}
                        ListHeaderComponent={
                            <Text style={{ fontSize: 18, marginBottom: 20 }}>หาก
                                <Text style={{ fontStyle: 'italic', fontSize: 18, color: 'blue' }}>
                                    {' '} {user.title_name}{user.name} {user.lastname}
                                    <Text style={{ color: 'red', fontSize: 18 }}> ลาออก</Text>
                                </Text>
                                {' '}ท่านจะทำอย่างไร?
                            </Text>
                        }
                        ListFooterComponent={
                            <View>
                                <TextInput
                                    style={{ backgroundColor: 'white', marginTop: 20, borderWidth: 1, padding: 10, borderRadius: 5, marginVertical: 8, height: 150 }}
                                    // textContentType='telephoneNumber'
                                    placeholder="เหตุผลเพราะอะไร"
                                    placeholderTextColor="gray"
                                    multiline
                                    numberOfLines={6}
                                    color='blue'
                                    fontSize={16}
                                    defaultValue={reason}
                                    onChangeText={text => {
                                        setReason(text)
                                    }}
                                // defaultValue={item.answer}
                                />
                                <Button
                                    style={{
                                        backgroundColor: 'green',
                                        borderRadius: 10,
                                        marginVertical: 16
                                    }}
                                    mode="Contained"
                                    onPress={() => {
                                        console.log(user);
                                        const dataSend = {
                                            userid: user.userid,
                                            name: user.name,
                                            lastname: user.lastname,
                                            nickname: user.nickname,
                                            answer: answer,
                                            reason: reason,
                                            department: user.department,
                                            date: moment().format('yyyy-MM-DD'),
                                            manager_id: USER.userid,
                                            manager_name: USER.name,
                                            manager_lastname: USER.lastname,
                                            manager_nickname: USER.nickname
                                        }
                                        console.log(dataSend)
                                        // console.log("year", year)
                                        // console.log("part", part)
                                        // console.log("number", item.number)
                                        // console.log("userid", USER.userid)
                                        postAnswer({ dataSend });
                                    }}
                                >
                                    <Text style={{ alignSelf: 'center', color: 'white' }}>บันทึกคำตอบ</Text>
                                </Button>
                            </View>

                        }
                    />
                }
            </View>
        </Animatable.View>

    )
}

export default EmployeeStatusScreen;