import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, FlatList, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
// import Dialog from "react-native-dialog";
import axiox from 'axios';
import { COLORS, SIZES } from '../constants/theme';

import moment from 'moment';
import 'moment/locale/th';

import { MAIN_URL, USER } from '../constants/variables';

import AwesomeAlert from 'react-native-awesome-alerts';

const ManagerQuestionnaireScreen = ({ navigation, route }) => {

    // console.log(route);

    let sheetID = route.params.sheetID;
    let userId = route.params.userId;
    let year = route.params.year;
    let part = route.params.part;

    // console.log(userId);

    var answer = {};

    const [managerList, setManagerList] = useState([]);

    // Answer
    const [managerAnswer, setManagerAnswer] = useState([]);

    // VideoURL
    const [isEditVideo, setIsEditVideo] = useState(false);

    const [isLoading, setLoading] = useState(false);

    var managerAnswerList = [];

    const getManagerList = () => {
        axiox.get(MAIN_URL + '/answer/manager/' + year + '/' + part + '/' + userId)
            .then(resManager => {
                setManagerList(resManager.data);
                console.log(resManager.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const postAnswer = () => {
        setLoading(true);
        axiox.post(MAIN_URL + '/answer/manager/' + year + '/' + part + '/' + userId + '/' + answer.number, answer)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                console.log(res.data);
                alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);

            });
    }

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setLoading(true);
                getManagerList();
            }
        }, [])
    );

    // useEffect(() => {
    //     setLoading(true);
    //     getManagerList();
    // }, []);


    const renderQuestionnaireManager = ({ navigation }) => {

        const renderItem = ({ item, index }) => {
            // const textInfo = "บันทึกคำตอบแล้ว\nเมื่อทำการแก้ไขให้คลิกยืนยันข้อมูลอีกครั้ง"

            managerAnswerList[index] = item.answer;

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
                                    numberOfLines={6}
                                    color='blue'
                                    fontSize={16}
                                    onChangeText={text => {
                                        // setAnserError(false);
                                        managerAnswer[index] = text;
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
                                        // setDialogConfirmAns(true);
                                        console.log(managerAnswer)
                                        // setQuestionNumber(item.number);
                                        if (managerAnswer[index] != undefined) {
                                            var answerObject = {
                                                user_id: USER.userid,
                                                date: moment().format('yyyy-MM-DD'),
                                                // video_url: videoURLText,
                                                answer: managerAnswer[index],
                                                number: item.number,
                                                qt: item.qt,
                                                year: year
                                            };

                                            answer = answerObject;
                                            postAnswer();
                                            // setAnserError(false);
                                            // setManagerAnswer("");
                                            // setVideoURLText("");

                                            item.answer = managerAnswer[index];
                                            // setDialogConfirmAns(false);

                                        }
                                        else {
                                            // setAnserError(true);
                                            // setTitleTextLog("ข้อมูลไม่ได้ถูกแก้ไข");
                                            // setBodyTextLog("หากต้องการแก้ไขให้พิมพ์ข้อมูลก่อนบันทึก")
                                            // setDialogConfirmAns(true);
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
                                    numberOfLines={6}
                                    color='blue'
                                    fontSize={16}
                                    // text="dfsdfsdf"
                                    onChangeText={text => {
                                        // setAnserError(false);
                                        managerAnswer[index] = text;
                                    }}
                                    defaultValue={managerAnswerList[index]}
                                />

                                <Button
                                    style={{
                                        backgroundColor: 'green',
                                        borderRadius: 10,
                                        marginVertical: 8
                                    }}
                                    mode="Contained"
                                    onPress={() => {
                                        // dialogConfirmAnswer({ index });
                                        // setDialogConfirmAns(true);
                                        console.log(managerAnswer)
                                        // setQuestionNumber(item.number);
                                        if (managerAnswer[index] != undefined) {
                                            var answerObject = {
                                                user_id: USER.userid,
                                                date: moment().format('yyyy-MM-DD'),
                                                // video_url: videoURLText,
                                                answer: managerAnswer[index],
                                                number: item.number,
                                                qt: item.qt,
                                                year: year
                                            };
                                            // setDialogAnswer(false);
                                            // setAnserError(false);
                                            answer = answerObject;
                                            postAnswer();

                                            item.answer = managerAnswer[index];


                                            // setDialogConfirmAns(false);
                                            // setAnswer({});
                                        }
                                        else {
                                            // setAnserError(true);
                                            // setTitleTextLog("ข้อมูลไม่ได้ถูกแก้ไข");
                                            // setBodyTextLog("หากต้องการแก้ไขให้พิมพ์ข้อมูลก่อนบันทึก")
                                            // setDialogConfirmAns(true);
                                            alert("ข้อมูลไม่ได้ถูกแก้ไข กรุณาแก้ไขข้อมูลก่อนบันทึก");
                                        }

                                        // console.log(questionAllStaffList);

                                    }}>
                                    <Text style={{ alignSelf: 'center', color: 'white' }}>ส่งคำตอบอีกครั้ง</Text>

                                </Button>
                            </View>
                        :

                        <View>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 8, height: 100 }}
                                placeholder="ไม่มีคำตอบ"
                                placeholderTextColor="gray"
                                multiline
                                numberOfLines={6}
                                color='blue'
                                fontSize={16}
                                value={item.answer}
                            />

                        </View>
                    }

                </View>

            );
        }

        if (isLoading === false && managerList.length === 0) {
            return (
                <View style={{
                    alignItems: 'center',
                    marginTop: 48
                }}>
                    <Text style={{
                        paddingHorizontal: 16,
                        fontSize: 24,
                        color: 'red',
                        justifyContent: 'center',
                    }}>หากแบบประเมินไม่ขึ้นให้เลือกทั่วไปก่อน และกลับมาเลือกผู้จัดการอีกครั้ง</Text>
                </View>
            );

        } else {

            return (
                <FlatList
                    data={managerList}
                    extraData={managerList}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderItem}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{ backgroundColor: '#D3D3D3' }}>
                                <View style={{ padding: 8, backgroundColor: COLORS.primary, width: '100%' }}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
                                        แบบประเมิน ผู้จัดการถามพนักงาน
                                    </Text>
                                </View>
                                <Text style={{ marginVertical: 4, alignSelf: 'center', color: 'red', fontSize: 14 }}>*** กดส่งคำตอบทุกครั้งก่อนจะทำข้อใหม่ ***</Text>
                                {/* <Text style={{ marginBottom: 4, alignSelf: 'center', color: 'red', fontSize: 14 }}>เมื่อครบทุกข้อให้คลิก ส่งคำตอบ</Text> */}
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
                managerList[0].videoURL = text
            }}
        />
    )

    return (
        <SafeAreaView style={{ flex: 1, }}>

            {renderQuestionnaireManager({ navigation })}

            {sheetID === 1 ?
                managerList.length != 0 && (managerList[0].videoURL === undefined || managerList[0].videoURL === "") ?

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
                    managerList.length != 0 && managerList[0].videoURL != "" ?
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
                                    {
                                        Platform.OS === "web" ?
                                            window.open(managerList[0].videoURL) :
                                            navigation.navigate('VideoWebView', { videoURL: managerList[0].videoURL })
                                        // navigation.navigate('VideoWebView', { videoURL: managerList[0].videoURL })
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
                            navigation.navigate('VideoWebView', { videoURL: managerList[0].videoURL })

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
                        userid: managerList[0].userid,
                        year: managerList[0].year,
                        number: managerList[0].number,
                        qt: managerList[0].qt,
                        answer: managerList[0].answer,
                        videoURL: managerList[0].videoURL,
                        date: moment(managerList[0].date).format('yyyy-MM-DD'),

                    }
                    console.log(currentObject);
                    {
                        axiox.post(MAIN_URL + '/answer/manager/' + year + '/' + part + '/' + userId + '/1', currentObject)
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

export default ManagerQuestionnaireScreen;