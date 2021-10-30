import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, FlatList, StyleSheet, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
// import { FlatList } from 'react-native-gesture-handler';
// import Dialog from "react-native-dialog";
import axiox from 'axios';
import { COLORS, SIZES } from '../constants/theme';
import { MAIN_URL, USER } from '../constants/variables';
import moment from 'moment';

import AwesomeAlert from 'react-native-awesome-alerts';

const StaffQuestionnaireScreen = ({ navigation, route }) => {
    // console.log(route);

    let sheetID = route.params.sheetID;
    const userId = route.params.userId;
    // console.log(userId);
    const year = route.params.year;
    const part = route.params.part;

    var answer = {};

    const [answerStaff, setAnswerStaff] = useState([]);

    const [isLoading, setLoading] = useState(false);
    // const [dialogURL, setDialogURL] = useState(false);

    // Answer
    const [staffAnswer, setStaffAnswer] = useState([]);
    // Video URL
    const [isEditVideo, setIsEditVideo] = useState(false);

    // var checkStaffAnswer = [];
    var staffAnswerList = [];

    const getStaff = () => {
        axiox.get(MAIN_URL + '/answer/staff/' + year + '/' + part + '/' + userId)
            .then(resStaff => {
                setAnswerStaff(resStaff.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const postAnswer = () => {
        setLoading(true);
        axiox.post(MAIN_URL + '/answer/staff/' + year + '/' + part + '/' + userId + '/' + answer.number, answer)
            .then(res => {
                console.log(res.data);

                alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);
            });
    }

    // useFocusEffect(
    //     React.useCallback(() => {
    //         return () => getStaff();
    //     }, [])
    // );

    useEffect(() => {
        setLoading(true);
        getStaff();
    }, []);

    const renderQuestionnaireAllStaff = ({ navigation }) => {

        const renderItem = ({ item, index }) => {
            staffAnswerList[index] = item.answer;
            return (
                <View style={{
                    margin: 8,
                    borderWidth: 1,
                    // borderColor: 'gray',
                    borderRadius: 5,
                    elevation: 5,
                    padding: 8,
                    backgroundColor: '#fff'
                    // borderColor: COLORS.primary
                    // 
                }} >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',

                    }}>{item.number}. {item.qt}</Text>

                    {sheetID === 1 ?
                        item.answer === undefined ?
                            <View>
                                <TextInput
                                    style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 8, height: 150 }}
                                    // textContentType='telephoneNumber'
                                    placeholder="คำตอบ"
                                    placeholderTextColor="gray"
                                    multiline
                                    // blurOnSubmit={true}
                                    // numberOfLines={6}
                                    color='blue'
                                    fontSize={16}
                                    onChangeText={text => {
                                        staffAnswer[index] = text;
                                    }}
                                />
                                <Button
                                    style={{
                                        backgroundColor: 'gray',
                                        borderRadius: 10,
                                        marginVertical: 8
                                    }}
                                    mode="Contained"
                                    onPress={() => {
                                        // dialogConfirmAnswer({ index });

                                        // confirmAlert();
                                        // console.log(staffAnswer[index]);
                                        if (staffAnswer[index] != undefined) {
                                            var answerObject = {
                                                userid: USER.userid,
                                                videoURL: item.videoURL,
                                                answer: staffAnswer[index],
                                                number: item.number,
                                                qt: item.qt,
                                                date: moment().format('yyyy-MM-DD'),
                                                year: year
                                            };
                                            answer = answerObject;

                                            postAnswer();

                                            item.answer = staffAnswer[index];

                                        }

                                        else {
                                            alert("ข้อมูลไม่ได้ถูกแก้ไข กรุณาแก้ไขข้อมูลก่อนบันทึก");
                                        }

                                        // console.log(questionAllStaffList);

                                    }}>
                                    <Text style={{ alignSelf: 'center', color: 'white' }}>ส่งคำตอบ</Text>

                                </Button>
                            </View>

                            :

                            <View>
                                <TextInput
                                    style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 8, height: 150 }}
                                    // textContentType='telephoneNumber'
                                    placeholder="คำตอบ"
                                    placeholderTextColor="gray"
                                    multiline
                                    // blurOnSubmit={true}
                                    // numberOfLines={6}
                                    color='blue'
                                    fontSize={16}
                                    onChangeText={text => {
                                        staffAnswer[index] = text;
                                    }}
                                    defaultValue={staffAnswerList[index]}
                                />
                                <Button
                                    style={{
                                        backgroundColor: 'green',
                                        borderRadius: 10,
                                        marginVertical: 8
                                    }}
                                    mode="Contained"
                                    onPress={() => {

                                        console.log(staffAnswer);
                                        if (staffAnswer[index] != undefined) {
                                            var answerObject = {
                                                userid: USER.userid,
                                                videoURL: item.videoURL,
                                                answer: staffAnswer[index],
                                                number: item.number,
                                                qt: item.qt,
                                                date: moment().format('yyyy-MM-DD'),
                                                year: year
                                            };

                                            answer = answerObject;

                                            postAnswer();

                                            item.answer = staffAnswer[index];
                                        }
                                        else {
                                            alert("ข้อมูลไม่ได้ถูกแก้ไข กรุณาแก้ไขข้อมูลก่อนบันทึก");
                                        }

                                        // console.log(questionAllStaffList);

                                    }}>
                                    <Text style={{ alignSelf: 'center', color: 'white' }}>ส่งคำตอบอีกครั้ง</Text>

                                </Button>
                            </View>

                        :

                        // Sheet id = 2 || ดูคำตอบของ user ที่เลือก
                        <View>
                            <Text
                                style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 8, color: 'blue' }}
                                fontSize={16}
                            >
                                {item.answer}
                            </Text>

                        </View>
                    }
                </View>

            );
        }

        if (isLoading === false && answerStaff.length === 0) {
            return (
                <View style={{
                    alignItems: 'center',
                    marginTop: 48
                }}>
                    <Text style={{
                        fontSize: 24,
                        color: 'red',
                        justifyContent: 'center',
                    }}>ไม่พบแบบประเมิน</Text>
                </View>
            );
        } else {
            return (

                <FlatList
                    data={answerStaff}
                    extraData={answerStaff}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderItem}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ backgroundColor: '#D3D3D3' }}>
                                <View style={{ padding: 8, backgroundColor: COLORS.primary, width: '100%' }}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
                                        แบบประเมิน พนักงานทุกระดับ
                                    </Text>
                                </View>
                                <Text style={{ marginVertical: 4, alignSelf: 'center', color: 'red' }}>*** กดส่งคำตอบทุกครั้งก่อนจะทำข้อใหม่ ***</Text>
                            </View>

                        );
                    }}
                    stickyHeaderIndices={[0]}
                />
            );
        }

    }

    const renderCustomViewInput = () => (
        <TextInput
            style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginHorizontal: 16, width: SIZES.width / 2 }}
            // textContentType='telephoneNumber'
            placeholder=":url"
            placeholderTextColor="gray"
            multiline
            // numberOfLines={6}
            color='blue'
            fontSize={16}
            onChangeText={text => {
                // setAnserError(false);
                // setVideoLink(text)
                answerStaff[0].videoURL = text
            }}
        />
    )

    // QuestionnaireScreen

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {renderQuestionnaireAllStaff({ navigation })}

            {sheetID === 1 ?
                answerStaff.length != 0 && (answerStaff[0].videoURL === undefined || answerStaff[0].videoURL === "") ?

                    <View style={{ margin: 16 }}>
                        <Button style={{
                            backgroundColor: COLORS.primary,
                            borderRadius: 10,
                            marginVertical: 8
                        }}
                            mode="Contained"
                            onPress={() => { setIsEditVideo(true) }}>
                            <Text style={{ alignSelf: 'center', color: 'white' }}>เพิ่มลิ้งค์วิดีโอ</Text>
                        </Button>
                    </View>

                    :
                    answerStaff.length != 0 && answerStaff[0].videoURL != "" ?
                        <View style={{ margin: 16, flexDirection: 'row', justifyContent: 'center' }}>
                            <Button style={{
                                flex: 1,
                                backgroundColor: COLORS.primary,
                                borderRadius: 10,
                                marginVertical: 8,
                                marginRight: 4

                            }}
                                mode="Contained"
                                onPress={() => {
                                    // console.log(questionAllStaffList[0].videoURL);
                                    {
                                        Platform.OS === "web" ?
                                            window.open(answerStaff[0].videoURL) :
                                            navigation.navigate('VideoWebView', { videoURL: answerStaff[0].videoURL })
                                    }


                                }}>
                                <Text style={{ alignSelf: 'center', color: 'white' }}>ดูวิดีโอ</Text>
                            </Button>

                            <Button style={{
                                flex: 1,
                                backgroundColor: COLORS.primary,
                                borderRadius: 10,
                                marginVertical: 8,
                                marginLeft: 4
                            }}
                                mode="Contained"
                                onPress={() => { setIsEditVideo(true) }}>
                                <Text style={{ alignSelf: 'center', color: 'white' }}>แก้ไขลิ้งค์</Text>
                            </Button>
                        </View>
                        :
                        null

                :

                <View style={{ margin: 16, flexDirection: 'row', justifyContent: 'center' }}>
                    <Button style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        borderRadius: 10,
                        marginVertical: 8,
                        marginRight: 4

                    }}
                        mode="Contained"
                        onPress={() => {
                            // console.log(questionManagerList[0].videoURL);
                            navigation.navigate('VideoWebView', { videoURL: answerStaff[0].videoURL })

                        }}>
                        <Text style={{ alignSelf: 'center', color: 'white' }}>ดูวิดีโอ</Text>
                    </Button>

                </View>
            }

            <AwesomeAlert
                show={isEditVideo}
                title="เพิ่มลิ้งค์วิดีโอ"
                // message="เพิ่มลิ้งวิดีโอ"
                closeOnTouchOutside={false}
                confirmText="ตกลง"
                showConfirmButton={true}
                showCancelButton={true}
                customView={renderCustomViewInput()}
                confirmButtonColor={COLORS.primary}
                cancelText="ยกเลิก"
                onCancelPressed={() => {
                    setIsEditVideo(false);
                    // this.hideAlert();
                }}
                onConfirmPressed={() => {
                    setIsEditVideo(false);
                    const currentObject = {
                        userid: answerStaff[0].userid,
                        year: answerStaff[0].year,
                        number: answerStaff[0].number,
                        qt: answerStaff[0].qt,
                        answer: answerStaff[0].answer,
                        videoURL: answerStaff[0].videoURL,
                        date: moment(answerStaff[0].date).format('yyyy-MM-DD'),

                    }
                    console.log(currentObject);
                    {
                        axiox.post(MAIN_URL + '/answer/staff/' + year + '/' + part + '/' + userId + '/1', currentObject)
                            .then(res => {
                                console.log(res.data);
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                    setIsEditVideo(false);
                }}
            >
            </AwesomeAlert>

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

export default StaffQuestionnaireScreen;