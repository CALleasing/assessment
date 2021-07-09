import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';

import Dialog from "react-native-dialog";
import axiox from 'axios';
import { COLORS } from '../constants/theme';

const QuestionnaireManagerScreen = ({ navigation, route }) => {

    let userId = route.params.userId;
    let year = route.params.year;
    let part = route.params.part;

    const [questionManagerList, setQuestionManagerList] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [dialogConfirmAns, setDialogConfirmAns] = useState(false);

    const getQuestionnaireManager = () => {
        axiox.get('https://program-api.herokuapp.com/' + userId + '/' + year + '/' + part + '/manager')
            .then(res => {
                const data = res.data;
                console.log(data);
                setQuestionManagerList(data);
                { setLoading(false) }
            })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        setLoading(true);
        getQuestionnaireManager();
    }, []);

    // Manager API

    const renderQuestionnaireManager = ({ navigation }) => {

        const renderItem = ({ item, index }) => {
            // const textInfo = "บันทึกคำตอบแล้ว\nเมื่อทำการแก้ไขให้คลิกยืนยันข้อมูลอีกครั้ง"

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
                            setAnswerText(text)
                        }}
                    />

                    <TextInput
                        style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 8, }}
                        // textContentType='telephoneNumber'
                        placeholder="ลิ้งวิดีโอ"
                        placeholderTextColor="gray"
                        // multiline
                        // numberOfLines={6}
                        color='blue'
                        fontSize={16}

                        onChangeText={text => {
                            // setAnserError(false);
                            setVideoURLText(text)
                        }}
                    />

                    {item.answer === undefined ?
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

                                setQuestionNumber(item.number);
                                if (answerText != "") {
                                    item.answer = {
                                        user_id: "CAL-001",
                                        video_url: videoURLText,
                                        answer: answerText
                                    };
                                    // setDialogAnswer(false);
                                    setAnserError(false);
                                    setAnswerText("");
                                    setVideoURLText("");

                                    // setDialogConfirmAns(false);
                                    // setAnswer({});
                                }
                                else {
                                    setAnserError(true);
                                }

                                console.log(questionAllStaffList);

                            }}>
                            <Text style={{ alignSelf: 'center', color: 'white' }}>ยืนยันข้อมูล</Text>

                        </Button>

                        :

                        <Button
                            style={{
                                backgroundColor: 'green',
                                borderRadius: 10,
                                marginVertical: 8
                            }}
                            mode="Contained"
                            onPress={() => {
                                // dialogConfirmAnswer({ index });
                                setDialogConfirmAns(true);

                                setQuestionNumber(item.number);
                                if (answerText != "") {
                                    item.answer = {
                                        user_id: "CAL-001",
                                        video_url: videoURLText,
                                        answer: answerText
                                    };
                                    // setDialogAnswer(false);
                                    setAnserError(false);
                                    setAnswerText("");
                                    setVideoURLText("");

                                    // setDialogConfirmAns(false);
                                    // setAnswer({});
                                }
                                else {
                                    setAnserError(true);
                                }

                                console.log(questionAllStaffList);

                            }}>
                            <Text style={{ alignSelf: 'center', color: 'white' }}>ยืนยันข้อมูลอีกครั้ง</Text>

                        </Button>

                    }

                </View>

            );
        }

        return (
            <FlatList
                data={questionManagerList}
                extraData={questionManagerList}
                keyExtractor={(item) => `${item}`}

                renderItem={renderItem}
                ListHeaderComponent={() => {
                    return (
                        <View style={{ backgroundColor: '#D3D3D3' }}>
                            <View style={{ padding: 8, backgroundColor: COLORS.primary, width: '100%' }}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 20 }}>
                                    แบบประเมิน ผู้จัดการถามพนักงาน
                                </Text>
                            </View>
                            <Text style={{ marginVertical: 4, alignSelf: 'center', color: 'red', fontSize: 14 }}>*** ยืนยันข้อมูลทุกครั้งก่อนจะทำข้อใหม่ ***</Text>
                            <Text style={{ marginBottom: 4, alignSelf: 'center', color: 'red', fontSize: 14 }}>เมื่อครบทุกข้อให้คลิก ส่งคำตอบ</Text>
                        </View>

                    );
                }}
                stickyHeaderIndices={[0]}

            />

        );
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>

            {/* <Text style={{ marginVertical: 8, alignSelf: 'center', color: 'red', fontSize: 16 }}>เมื่อตอบคำถามแต่ละข้อเสร็จให้คลิกยืนยืนข้อมูล</Text> */}


            {renderQuestionnaireManager({ navigation })}


            <Dialog.Container visible={dialogConfirmAns}>
                <Dialog.Title style={{ fontSize: 20, fontWeight: 'bold' }}>บันทึกข้อมูลสำเร็จ</Dialog.Title>
                <Dialog.Description style={{ fontSize: 18, padding: 16 }}>หากทำการแก้ไขให้คลิกยืนยันข้อมูลอีกครั้ง</Dialog.Description>

                <Dialog.Button
                    label="ตกลง"
                    onPress={() => {

                        setDialogConfirmAns(false);
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
                // <View style={{
                //     // flex: 1,
                //     padding: 16,
                //     justifyContent: 'flex-end',
                // }}>
                //     <Button
                //         style={{
                //             // flex: 1,
                //             //  padding: 16, 
                //             // justifyContent: 'flex-end',
                //             backgroundColor: COLORS.primary, borderRadius: 10
                //         }}
                //         // icon="camera"
                //         mode="contained"
                //         onPress={() => {
                //             console.log(answer);
                //             // console.log(vi);
                //         }}>
                //         <Text style={styles.button_text}>ส่งคำตอบ</Text>
                //     </Button>

                // </View>
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button_confirm: {

    }
})

export default QuestionnaireManagerScreen;