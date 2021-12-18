import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import axiox from 'axios';
import { COLORS, SIZES } from '../constants/theme';

import moment from 'moment';
import 'moment/locale/th';
import { MAIN_URL, USER } from '../constants/variables';

const EmployeeStatusCommentScreen = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        getAllEmployeeAssessment();
    }, []);

    const getAllEmployeeAssessment = () => {
        setLoading(true);
        // console.log("getAll")
        axiox.get(MAIN_URL + '/answer/assessment')
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                // console.log("ALL DATA", res.data);
                setData(res.data)
                // alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                // alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);

            });
    };

    const deleteComment = ({ userid, answer, manager_id }) => {
        setLoading(true);
        console.log(userid)
        axiox.delete(MAIN_URL + '/answer/assessment', { data: { userid, answer, manager_id } })
            .then(res => {
                // console.log(dataDelete);
                getAllEmployeeAssessment();

                alert("ลบความคิดเห็นสำเร็จ");
                setLoading(false);
                // setNumber = '';
                // setQuestion = '';
            })
            .catch(err => {
                console.log(err);

                alert("ล้มเหลว กรุณาลองใหม่");
                setLoading(false);
            });
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ padding: 12, backgroundColor: 'white' }}>
                <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'black', padding: 8 }}>
                    <Text style={{ color: 'gray', marginBottom: 4 }}>
                        วันที่ {moment(item.date).format('ll')}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        ความเห็นจาก <Text style={{ color: 'blue' }}>{item.manager_name} {item.manager_lastname} [{item.manager_nickname}]</Text>
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        หากว่า <Text style={{ color: 'green' }}>{item.name} {item.lastname} ({item.nickname}) [{item.department}]</Text> <Text style={{ color: 'red' }}>จะลาออก</Text>
                    </Text>
                    <View style={{ marginVertical: 8, borderRadius: 10, borderWidth: 0.5, borderColor: 'gray', padding: 8 }}>
                        <Text style={{ fontSize: 16 }}>
                            {item.answer}
                        </Text>
                        <Text style={{ color: 'green', fontSize: 16 }}>
                            เพราะ {item.reason}
                        </Text>
                    </View>
                    {
                        USER.department === 'MD' ?
                            <TouchableOpacity
                                style={{ position: 'absolute', right: 5, top: 5 }}
                                onPress={() => {

                                    Alert.alert(
                                        "ลบความคิดเห็น",
                                        "คุณต้องการลบความคิดเห็นนี้หรือไม่",
                                        [
                                            {
                                                text: "ลบ",
                                                onPress: () => {
                                                    // console.log(dataDelete)
                                                    deleteComment({ userid: item.userid, answer: item.answer, manager_id: item.manager_id })
                                                },
                                                style: "default"
                                            },
                                            {
                                                text: "ยกเลิก",
                                                onPress: () => { },
                                                style: "cancle"
                                            }
                                        ],
                                    )

                                }}>
                                <Icon name='trash'
                                    color='red'
                                    size={20} />
                            </TouchableOpacity>
                            : null
                    }

                </View>
            </View>
        )
    }

    return (
        loading ?
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
                data={data}
                extraData={data}
                keyExtractor={(item, index) => `${index}`}
                renderItem={renderItem}
                ListHeaderComponent={
                    <Text style={{ alignSelf: 'center', marginVertical: 16, fontSize: 16, fontWeight: 'bold' }}>ความเห็นทั้งหมดของผู้จัดการ</Text>
                }
            // scrollEnabled={false}
            />
    )
}

export default EmployeeStatusCommentScreen;