import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
// import { FlatList } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import axiox from 'axios';
import { COLORS } from '../constants/theme';
import { LOGIN } from '../constants/variables';
import moment from 'moment';

const QuestionnaireScreen = ({ navigation, route }) => {

    const userId = LOGIN.userid;
    // console.log(userId);
    const year = route.params.year;
    const part = route.params.part;

    var answer;

    const video = React.useRef(null);
    const play = () => video.current && video.current.playAsync();

    const [questionAllStaffList, setQuestionAllStaffList] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [dialogConfirmAns, setDialogConfirmAns] = useState(false);
    // const [dialogURL, setDialogURL] = useState(false);

    // Answer
    const [answerText, setAnswerText] = useState("");
    // Video URL
    const [isEditVideo, setIsEditVideo] = useState(false);
    const [isAnswerError, setAnserError] = useState(false);

    var allAnswers = [];

    const getQuestionnaireAllStaff = () => {
        axiox.get('https://program-api.herokuapp.com/' + year + '/' + part + '/officer/' + userId)
            .then(res => {
                const data = res.data;
                console.log(data);
                setQuestionAllStaffList(data);
                { setLoading(false) }
            })
            .catch(err => {
                console.log(err)
            })
    };

    const postAnswer = () => {
        console.log(answer);
        axiox.post('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.number + '/Answer/officer/' + userId, answer)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                console.log(res.data);

            })
            .catch(err => {
                console.log(err)
            });
    }

    const updateAnswer = () => {
        console.log(answer);
        axiox
            .put('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.number + '/Answer/officer/' + userId, answer)
            .then(res => {
                console.log("response: ", res)
                // do something about response
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        setLoading(true);
        getQuestionnaireAllStaff();
    }, []);

    const renderQuestionnaireAllStaff = ({ navigation }) => {

        const renderItem = ({ item, index }) => {
            // const textInfo = "บันทึกคำตอบแล้ว\nเมื่อทำการแก้ไขให้คลิกยืนยันข้อมูลอีกครั้ง"
            // console.log(index);
            allAnswers[index] = item.answer;

            // textInputValue[index] = item.answer
            console.log(allAnswers);
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

                    {item.answer === undefined ?
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
                                    // setAnserError(false);
                                    setAnswerText(text);
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
                                    setDialogConfirmAns(true);

                                    if (answerText != "") {
                                        var answerObject = {
                                            userid: LOGIN.userid,
                                            videoURL: item.videoURL,
                                            answer: answerText,
                                            number: item.number,
                                            qt: item.qt,
                                            date: moment().format('yyyy-MM-DD'),
                                            year: year
                                        };
                                        // setDialogAnswer(false);
                                        setAnserError(false);
                                        setAnswerText("");
                                        // setVideoURLText("");
                                        answer = answerObject;
                                        item.answer = answerText;
                                        // allAnswers[index] = item.answer
                                        // console.log(answer);
                                        postAnswer();
                                    }

                                    else {
                                        setAnserError(true);
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
                                placeholderTextColor="green"
                                multiline
                                numberOfLines={6}
                                color='blue'
                                fontSize={16}
                                onChangeText={text => {
                                    setAnswerText(text);
                                }}
                                defaultValue={allAnswers[index]}
                            />
                            <Button
                                style={{
                                    backgroundColor: 'green',
                                    borderRadius: 10,
                                    marginVertical: 8
                                }}
                                mode="Contained"
                                onPress={() => {

                                    setDialogConfirmAns(true);

                                    if (answerText != "") {
                                        var answerObject = {
                                            userid: LOGIN.userid,
                                            videoURL: item.videoURL,
                                            answer: answerText,
                                            number: item.number,
                                            qt: item.qt,
                                            date: moment().format('yyyy-MM-DD'),
                                            year: year
                                        };
                                        // setDialogAnswer(false);
                                        setAnserError(false);
                                        // 
                                        // setVideoURLText("");
                                        answer = answerObject;
                                        item.answer = answerText;
                                        updateAnswer();
                                        setAnswerText("");

                                        // setDialogConfirmAns(false);
                                        // setAnswer({});
                                    }
                                    else {
                                        setAnserError(true);
                                    }

                                    // console.log(questionAllStaffList);

                                }}>
                                <Text style={{ alignSelf: 'center', color: 'white' }}>ส่งคำตอบอีกครั้ง</Text>

                            </Button>
                        </View>

                    }
                </View>

            );
        }

        if (isLoading === false && questionAllStaffList.length === 0) {
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
                    data={questionAllStaffList}
                    extraData={questionAllStaffList}
                    keyExtractor={(item) => `${item}`}

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

    // QuestionnaireScreen

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {renderQuestionnaireAllStaff({ navigation })}

            {questionAllStaffList.length != 0 && (questionAllStaffList[0].videoURL === undefined || questionAllStaffList[0].videoURL === "") ?

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
                questionAllStaffList.length != 0 && questionAllStaffList[0].videoURL != "" ?
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
                                navigation.navigate('VideoWebView', { videoURL: questionAllStaffList[0].videoURL })

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
            }

            <Dialog.Container visible={dialogConfirmAns}>
                <Dialog.Title style={{ fontSize: 20, fontWeight: 'bold' }}>บันทึกข้อมูลสำเร็จ</Dialog.Title>
                <Dialog.Description style={{ fontSize: 18, padding: 16 }}>หากทำการแก้ไขให้คลิกยืนยันข้อมูลอีกครั้ง</Dialog.Description>

                <Dialog.Button
                    label="ตกลง"
                    onPress={() => {
                        setDialogConfirmAns(false);
                    }} />

            </Dialog.Container>

            {/* Upload Video */}
            <Dialog.Container visible={isEditVideo}>
                <Dialog.Title style={{ fontSize: 20, fontWeight: 'bold' }}>เพิ่มลิ้งค์วิดีโอ</Dialog.Title>
                {/* <Dialog.Description style={{ fontSize: 18, padding: 16 }}>หากทำการแก้ไขให้คลิกยืนยันข้อมูลอีกครั้ง</Dialog.Description> */}
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
                        questionAllStaffList[0].videoURL = text
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
                            userid: questionAllStaffList[0].userid,
                            year: questionAllStaffList[0].year,
                            number: questionAllStaffList[0].number,
                            qt: questionAllStaffList[0].qt,
                            answer: questionAllStaffList[0].answer,
                            videoURL: questionAllStaffList[0].videoURL,
                            date: moment(questionAllStaffList[0].date).format('yyyy-MM-DD'),

                        }
                        console.log(currentObject);
                        {
                            questionAllStaffList[0].videoURL === undefined ?
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


            </Dialog.Container>


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

export default QuestionnaireScreen;