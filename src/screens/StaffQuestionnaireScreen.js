import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, FlatList, Linking, StyleSheet, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
// import { FlatList } from 'react-native-gesture-handler';
// import Dialog from "react-native-dialog";
import axiox from 'axios';
import { COLORS, SIZES } from '../constants/theme';
import { USER } from '../constants/variables';
import moment from 'moment';

import AwesomeAlert from 'react-native-awesome-alerts';

const StaffQuestionnaireScreen = ({ navigation, route }) => {
    // console.log(route);

    let sheetID = route.params.sheetID;
    let userId = route.params.userId;
    // console.log(userId);
    const year = route.params.year;
    const part = route.params.part;

    var answer = {};

    const [staffAssessmentList, setStaffAssessmentList] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [dialogConfirmAns, setDialogConfirmAns] = useState(false);
    // const [dialogURL, setDialogURL] = useState(false);

    // Answer
    const [staffAnswer, setStaffAnswer] = useState([]);
    // Video URL
    const [isEditVideo, setIsEditVideo] = useState(false);
    const [isAnswerError, setAnserError] = useState(false);

    const [titleTextLog, setTitleTextLog] = useState("");
    const [bodyTextLog, setBodyTextLog] = useState("");

    // var checkStaffAnswer = [];
    var staffAnswerList = [];

    const getStaffAssessmentList = () => {
        axiox.get('https://program-api.herokuapp.com/' + year + '/' + part + '/officer/' + userId)
            .then(res => {
                setStaffAssessmentList(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const postAnswer = () => {
        setLoading(true);
        axiox.post('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.number + '/Answer/officer/' + userId, answer)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                console.log(res.data);

                alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                // setTitleTextLog("บันทึกล้มเหลว");
                // setBodyTextLog("กรุณาส่งคำตอบใหม่ใหม่อีกครั้ง");
                // setDialogConfirmAns(true);

                alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);
            });
    }

    const updateAnswer = () => {
        setLoading(true);
        axiox
            .put('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.number + '/Answer/officer/' + userId, answer)
            .then(res => {
                console.log("response: ", res)

                alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);
            })
    }

    useEffect(() => {
        setLoading(true);
        getStaffAssessmentList();
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
                                    style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 8, height: 100 }}
                                    // textContentType='telephoneNumber'
                                    placeholder="คำตอบ"
                                    placeholderTextColor="gray"
                                    multiline
                                    numberOfLines={6}
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
                                    style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 8, height: 100 }}
                                    // textContentType='telephoneNumber'
                                    placeholder="คำตอบ"
                                    placeholderTextColor="gray"
                                    multiline
                                    numberOfLines={6}
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

                                            updateAnswer();

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

        if (isLoading === false && staffAssessmentList.length === 0) {
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
                    data={staffAssessmentList}
                    extraData={staffAssessmentList}
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
                staffAssessmentList[0].videoURL = text
            }}
        />
    )

    // QuestionnaireScreen

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* <View style={{ flex: 3, }}> */}
            {renderQuestionnaireAllStaff({ navigation })}
            {/* {SIZES.width > 900 ? <View style={{ width: 600 }}>{ }</View> : null} */}
            {/* </View> */}

            {sheetID === 1 ?
                staffAssessmentList.length != 0 && (staffAssessmentList[0].videoURL === undefined || staffAssessmentList[0].videoURL === "") ?

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
                    staffAssessmentList.length != 0 && staffAssessmentList[0].videoURL != "" ?
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
                                            window.open(staffAssessmentList[0].videoURL) :
                                            navigation.navigate('VideoWebView', { videoURL: staffAssessmentList[0].videoURL })
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
                            navigation.navigate('VideoWebView', { videoURL: staffAssessmentList[0].videoURL })

                        }}>
                        <Text style={{ alignSelf: 'center', color: 'white' }}>ดูวิดีโอ</Text>
                    </Button>

                </View>
            }

            {/* <AwesomeAlert
                show={dialogConfirmAns}
                showProgress={false}
                title="AwesomeAlert"
                message="I have a message for you!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="ยกเลิก"
                confirmText="ตกลง"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setDialogConfirmAns(false);
                }}
                onConfirmPressed={() => {
                    setDialogConfirmAns(false);
                }}
            /> */}


{/* 
            <AwesomeAlert
                show={dialogConfirmAns}
                title={titleTextLog}
                message={bodyTextLog}
                closeOnTouchOutside={false}
                confirmText="ตกลง"
                showConfirmButton={true}
                confirmButtonColor={COLORS.primary}
                onConfirmPressed={() => {
                    setDialogConfirmAns(false);
                }}
            /> */}

            {/* <Dialog.Container visible={dialogConfirmAns}>
                <Dialog.Title style={{ fontSize: 20, fontWeight: 'bold' }}>{titleTextLog}</Dialog.Title>
                <Dialog.Description style={{ fontSize: 18, padding: 16 }}>{bodyTextLog}</Dialog.Description>

                <Dialog.Button
                    label="ตกลง"
                    onPress={() => {
                        setDialogConfirmAns(false);
                    }} />

            </Dialog.Container> */}

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
                        userid: staffAssessmentList[0].userid,
                        year: staffAssessmentList[0].year,
                        number: staffAssessmentList[0].number,
                        qt: staffAssessmentList[0].qt,
                        answer: staffAssessmentList[0].answer,
                        videoURL: staffAssessmentList[0].videoURL,
                        date: moment(staffAssessmentList[0].date).format('yyyy-MM-DD'),

                    }
                    console.log(currentObject);
                    {
                        staffAssessmentList[0].videoURL === undefined ?
                            axiox.post('https://program-api.herokuapp.com/' + year + '/' + part + '/1/Answer/officer/' + userId, currentObject)
                                .then(res => {
                                    console.log(res.data);
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                            :
                            axiox.put('https://program-api.herokuapp.com/' + year + '/' + part + '/1/Answer/officer/' + userId, currentObject)
                                .then(res => {
                                    // storeData(res.data)
                                    console.log(res.data);

                                })
                                .catch(err => {
                                    console.log(err)
                                });
                    }
                    setIsEditVideo(false);
                }}
            >
            </AwesomeAlert>

            {/* <Dialog.Container visible={isEditVideo}>
                <Dialog.Title style={{ fontSize: 20, fontWeight: 'bold' }}>เพิ่มลิ้งค์วิดีโอ</Dialog.Title>
                <TextInput
                    style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginHorizontal: 16 }}
                    // textContentType='telephoneNumber'
                    placeholder=":url"
                    placeholderTextColor="gray"
                    multiline
                    numberOfLines={6}
                    color='blue'
                    fontSize={16}
                    onChangeText={text => {
                        // setAnserError(false);
                        // setVideoLink(text)
                        staffAssessmentList[0].videoURL = text
                    }}
                />
                <Dialog.Button
                    label="ยกเลิก"
                    onPress={() => {
                        setIsEditVideo(false);
                    }} />

                <Dialog.Button
                    label="ตกลง"
                    onPress={() => {
                        const currentObject = {
                            userid: staffAssessmentList[0].userid,
                            year: staffAssessmentList[0].year,
                            number: staffAssessmentList[0].number,
                            qt: staffAssessmentList[0].qt,
                            answer: staffAssessmentList[0].answer,
                            videoURL: staffAssessmentList[0].videoURL,
                            date: moment(staffAssessmentList[0].date).format('yyyy-MM-DD'),

                        }
                        console.log(currentObject);
                        {
                            staffAssessmentList[0].videoURL === undefined ?
                                axiox.post('https://program-api.herokuapp.com/' + year + '/' + part + '/1/Answer/officer/' + userId, currentObject)
                                    .then(res => {
                                        console.log(res.data);
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                                :
                                axiox.put('https://program-api.herokuapp.com/' + year + '/' + part + '/1/Answer/officer/' + userId, currentObject)
                                    .then(res => {
                                        // storeData(res.data)
                                        console.log(res.data);

                                    })
                                    .catch(err => {
                                        console.log(err)
                                    });
                        }
                        setIsEditVideo(false);
                    }} />


            </Dialog.Container> */}


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