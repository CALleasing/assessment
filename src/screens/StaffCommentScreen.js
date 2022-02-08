import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'

import axiox from 'axios';
import { COLORS, SIZES } from '../constants/theme';

import moment from 'moment';
import 'moment/locale/th';
import { MAIN_URL, USER } from '../constants/variables';

const StaffCommentScreen = ({ navigation, route }) => {

    // let sheetID = route.params.sheetID;
    let userId = USER.userid;
    // console.log(userId)
    let managerID = route.params.managerID;
    let year = route.params.year;
    let part = route.params.part;

    const [answer, setAnswer] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [postLoading, setPostLoading] = useState(false);
    const [answerForManger, setAnswerFormanager] = useState([]);

    const [allAnswer, setAllAnswer] = useState([]);
    const [questionWithAnswer, setQuestionWithAnswer] = useState([]);
    const [question, setQuestion] = useState([]);
    // var checkArray = [];
    const [checked, setChecked] = useState(false);
    // const [itemSelected, setItemSeleced] = useState(0);
    const [selectedColor, setSelectedColor] = useState('');
    const [list, setList] = useState([]);
    const [checkIndex, setCheckIndex] = useState(0);
    // console.log(USER.position)

    useEffect(() => {
        // setLoading(true);
        // console.log(USER.position)
        USER.position === "ผู้จัดการ" ? getAnswerWithManagerId() : getAllQuestionWithAnswer()

    }, []);

    const getAllQuestionWithAnswer = () => {
        setLoadingPage(true);
        // console.log("TEST")
        // console.log(MAIN_URL + '/answer/comment/user/' + year + '/' + part + '/' + managerID + '/' + userId)
        // console.log("getAllQuestionWithAnswer");
        axiox.get(MAIN_URL + '/answer/comment/user/' + year + '/' + part + '/' + managerID + '/' + userId)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                // console.log("REAL DATA :", res.data);
                setQuestionWithAnswer(res.data)
                // alert("บันทึกข้อมูลสำเร็จ");
                setLoadingPage(false);
                // res.data.map(item => {
                //     checkArray.push({
                //         check: false
                //     });
                // console.log(checked)
                // })
            })
            .catch(err => {
                console.log(err)
                // alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoadingPage(false);

            });
    };

    const getAllQuestion = () => {
        setLoadingPage(true);
        axiox.get(MAIN_URL + '/question/comment/' + year + '/' + part)
            .then(res => {
                // console.log(res.data);
                // console.log("ALL DATA", res.data);
                setQuestion(res.data)

                // alert("บันทึกข้อมูลสำเร็จ");
                setLoadingPage(false);
            })
            .catch(err => {
                console.log(err)
                // alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoadingPage(false);

            });
    }

    const getAllAnswer = () => {
        setLoading(true);
        // console.log("getAll")
        axiox.get(MAIN_URL + '/answer/comment/user/' + year + '/' + part + '/department/' + USER.department)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                // console.log("ALL DATA", res.data);
                setAllAnswer(res.data)
                // alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                // alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);

            });
    };

    const getAnswerWithManagerIdAndNumber = ({ number }) => {
        setLoading(true);

        // console.log("get", userId)
        axiox.get(MAIN_URL + '/answer/comment/manager/' + year + '/' + part + '/' + userId + '/' + number)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                // console.log(res.data);
                setAnswer(res.data)
                // alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                // alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);

            });
    }

    const getAnswerWithManagerId = () => {
        setLoadingPage(true);

        // console.log("get", userId)
        axiox.get(MAIN_URL + '/answer/comment/manager/' + year + '/' + part + '/' + userId)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                // console.log(res.data);
                const data = res.data;
                mapAnserToGroup(data)
                // alert("บันทึกข้อมูลสำเร็จ");
                setLoadingPage(false);
            })
            .catch(err => {
                console.log(err)
                // alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoadingPage(false);

            });
    }

    const mapAnserToGroup = (data) => {
        var allAnswerGroup = [];
        var answerGroup = [];
        var lastUserid = '';
        // console.log(data)
        var userid = '';
        var name = '';
        var lastname = '';
        var nickname = '';

        var obj = {};

        for (var i = 0; i < data.length; i++) {
            if (i === 0) {
                lastUserid = data[i].userid;
                // console.log("START", i)
                // console.log("LAST USERID", lastUserid);
            }
            if (data[i].userid === lastUserid) {
                // 
                // console.log("DATA USERID", data[i].userid)
                userid = data[i].userid;
                name = data[i].name;
                lastname = data[i].lastname;
                nickname = data[i].nickname;

                console.log("IF")
                console.log("INDEX : ", i)

                // if (data.length - 1 === i) {
                //     console.log(data[i]);
                //     console.log(i)

                answerGroup.push(data[i]);

                obj = {
                    userid: userid,
                    name: name,
                    lastname: lastname,
                    nickname: nickname,
                    all_answer: answerGroup
                }
                console.log("IF", obj)


                if (i === data.length - 1) {
                    allAnswerGroup.push(obj);
                }
                // console.log(i, allAnswerGroup);




                // console.log("ALL ANSER",answerForManger)
                // }
                // else {
                //     answerGroup.push(data[i]);
                // }

            } else {
                allAnswerGroup.push(obj);

                obj = {};
                console.log("OBJECT", obj)

                console.log("ELSE")
                console.log("INDEX : ", i)

                answerGroup = [];

                console.log("ANSER GROUP", answerGroup)
                // if (data.length - 1 === i) {\
                answerGroup.push(data[i]);
                obj = {
                    userid: data[i].userid,
                    name: data[i].name,
                    lastname: data[i].lastname,
                    nickname: data[i].nickname,
                    all_answer: answerGroup
                }
                console.log("ELSE", obj)

                if (i === data.length - 1) {
                    allAnswerGroup.push(obj);
                }

                lastUserid = data[i].userid;
                // console.log(answerForManger);
                // lastUserid = data[i].userid;


                // console.log("USERID", data[i].userid)



                // }



                // console.log(obj)



            }
        }
        // console.log(allAnswerGroup);
        setAnswerFormanager(allAnswerGroup);
    }

    const postAnswer = ({ dataSend, number }) => {
        setLoading(true);
        axiox.post(MAIN_URL + '/answer/comment/user/' + year + '/' + part + '/' + userId + '/' + number, dataSend)
            // console.log('https://program-api.herokuapp.com/' + year + '/' + part + '/' + answer.questionNumber + '/Answer/officer/' + userId, answer)
            .then(res => {
                // console.log(res.data);
                alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);

            });
    }

    const renderManagerCheck = () => {
        // console.log("TEST")
        const renderUserWithAllAnswer = ({ item, index }) => {
            // console.log(item);
            return (
                <View style={{ marginBottom: 14 }}>
                    <Text style={{ fontWeight: 'bold' }}>{item.number}. {item.qt}</Text>
                    <Text style={{ color: 'green', padding: 4, paddingHorizontal: 16 }}>{item.answer}</Text>
                </View>
            )
        }

        const renderItem = ({ item, index }) => {
            // console.log(item.date);
            var reveal = true;
            for (var i = 0; i < item.all_answer.length; i++) {
                if (item.all_answer[i].reveal === 1) {
                    reveal = false;
                }
            }
            return (
                <View style={{ padding: 8, marginHorizontal: 16, marginVertical: 8, borderRadius: 5, borderColor: 'black', borderWidth: .5 }}>
                    {reveal === true ?
                        <Text style={{ fontSize: 15, fontWeight: 'bold', paddingHorizontal: 8, color: 'blue' }}>{item.name} {item.lastname} ({item.nickname}) [{item.all_answer[0].department}]</Text>
                        :
                        <Text style={{ paddingHorizontal: 8, fontSize: 15, fontWeight: 'bold', color: 'blue' }}>ไม่เปิดเผยชื่อ </Text>
                    }
                    <View style={{ padding: 8, marginVertical: 8, borderRadius: 5, borderColor: 'gray', borderWidth: .2 }}>

                        <FlatList
                            data={item.all_answer}
                            extraData={item.all_answer}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={renderUserWithAllAnswer}
                            scrollEnabled={false}
                        />

                        <Text style={{ color: 'green', paddingHorizontal: 16, paddingVertical: 4 }}>{item.answer}</Text>
                    </View>
                </View>
            )
            // <View>
            //     <TouchableOpacity
            //         style={selectedColor === index ? { borderRadius: 10, backgroundColor: 'green', padding: 10, margin: 10, } : { borderRadius: 10, borderColor: 'gray', borderWidth: .3, backgroundColor: '#F8F8FF', padding: 10, margin: 10, }}
            //         onPress={() => {
            //             setAnswer([]);
            //             setSelectedColor(index);
            //             setCheckIndex(index);
            //             // console.log(item.number)
            //             getAnswerWithManagerIdAndNumber({ number: item.number });
            //         }}
            //     >
            //         <Text style={selectedColor === index ? { color: 'white', fontSize: 16 } : { color: 'black', fontSize: 16 }}>{index + 1}.  {item.qt}

            //             {/* {
            //             item.reveal != 1 ?
            //                 <Text style={{ fontSize: 14, color: 'blue' }}> {item.qt} {item.lastname} ({item.nickname}) ( แผนก/สาขา {item.department} )</Text>
            //                 :
            //                 <Text style={{ fontSize: 14, color: 'blue' }}> ไม่เปิดเผยชื่อ</Text>
            //         } */}
            //         </Text>
            //     </TouchableOpacity>
            //     {checkIndex === index ?
            //         !loading ?
            //             answer.length != 0 ?
            //                 <View style={{ padding: 16, margin: 8, borderRadius: 10, borderWidth: .3, borderColor: 'gray' }}>
            //                     <FlatList
            //                         data={answer}
            //                         extraData={answer}
            //                         keyExtractor={(item, index) => `${index}`}
            //                         renderItem={renderComment}
            //                         ListHeaderComponent={
            //                             <Text style={{ marginBottom: 16, alignSelf: 'center', fontSize: 14 }}>ความคิดเห็นทั้งหมด</Text>
            //                         }
            //                     />
            //                 </View>
            //                 :
            //                 selectedColor != '' ?
            //                     <View style={{ padding: 16, margin: 8, borderRadius: 10, borderWidth: .3, borderColor: 'gray' }}>
            //                         <Text style={{ alignSelf: 'center' }}>ไม่มีความคิดเห็น</Text>
            //                     </View>
            //                     :
            //                     null
            //             :
            //             <ActivityIndicator />

            //         :
            //         null
            //     }
            // </View>
            // )
        }

        const renderComment = ({ item, index }) => {
            return (
                <View style={{ marginVertical: 8 }}>
                    {item.reveal === 0 ?
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.name} {item.lastname} ({item.nickname}) [{item.department}] <Text style={{ fontSize: 12, color: 'gray' }}> - วันที่ {moment(item.date).format('ll')}</Text></Text>
                        :
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>ไม่เปิดเผยชื่อ <Text style={{ fontSize: 12, color: 'gray' }}> - วันที่ {moment(item.date).format('ll')}</Text></Text>
                    }
                    <View style={{ marginVertical: 8, borderRadius: 5, borderColor: 'gray', borderWidth: .3 }}>
                        <Text style={{ color: 'green', padding: 8 }}>{item.answer}</Text>
                    </View>
                </View>
            );
        };

        // console.log(answerForManger)
        return (
            loadingPage ?
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
                answerForManger.length != 0 ?
                    <View style={{ marginBottom: 18 }}>
                        <FlatList
                            data={answerForManger}
                            extraData={answerForManger}
                            keyExtractor={(item, index) => `${index}`}
                            renderItem={renderItem}
                            ListHeaderComponent={
                                <View style={{ margin: 16 }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 14 }}>ความคิดเห็นทั้งหมด</Text>
                                </View>

                            }
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    :
                    <Text style={{ fontSize: 16, alignSelf: 'center', marginTop: 50 }}>ไม่มีข้อมูล</Text>
            // null
        )
    }

    const renderUserComment = () => {
        const renderItem = ({ item, index }) => {
            return (
                <View style={{ padding: 8, margin: 15, backgroundColor: 'white', borderColor: 'gray', borderWidth: .3 }}>
                    <Text style={{ fontSize: 16 }}>{item.number}. {item.qt}</Text>
                    {/* <Text style={{ color: 'red' }}>*ผู้จัดการของแผนกคุณเท่านั้นที่จะเห็นคำตอบ แต่จะไม่รู้ว่าใครเป็นคนตอบ</Text> */}

                    <TextInput
                        style={{ backgroundColor: 'white', marginTop: 20, borderWidth: 1, padding: 10, borderRadius: 5, marginVertical: 8, height: 150 }}
                        // textContentType='telephoneNumber'
                        placeholder="คำตอบ"
                        placeholderTextColor="gray"
                        multiline
                        numberOfLines={6}
                        color='blue'
                        fontSize={16}
                        onChangeText={text => {
                            answer[index] = text;
                        }}
                        defaultValue={item.answer}
                    />

                    <Button
                        style={{
                            backgroundColor: 'green',
                            borderRadius: 10,
                            marginVertical: 8
                        }}
                        mode="Contained"
                        onPress={() => {

                            const dataSend = {
                                manager_id: managerID,
                                reveal: checked,
                                answer: answer[index],
                                date: moment().format('yyyy-MM-DD'),
                                department: USER.department
                            }
                            console.log(dataSend)
                            console.log("year", year)
                            console.log("part", part)
                            console.log("number", item.number)
                            console.log("userid", USER.userid)
                            postAnswer({ dataSend, number: item.number });
                        }}
                    >
                        <Text style={{ alignSelf: 'center', color: 'white' }}>ส่งคำตอบ</Text>
                    </Button>
                </View>
            )
        }

        return (
            loadingPage ?
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
                questionWithAnswer.length != 0 ?
                    <FlatList
                        data={questionWithAnswer}
                        extraData={questionWithAnswer}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={renderItem}
                        ListHeaderComponent={
                            <View style={{ margin: 16, backgroundColor: 'white', paddingBottom: 16 }}>
                                <Text style={{ fontSize: 16, margin: 16 }}>* ก่อนตอบคำถาม ท่านต้องการเปิดเผยชื่อให้ผู้จัดการทราบหรือไม่</Text>
                                <CheckBox
                                    title='ไม่เปิดเผยชื่อ'
                                    checked={checked}
                                    onPress={() => {
                                        setChecked(!checked)
                                        // console.log(checked);
                                    }}
                                />
                            </View>
                        }
                    />
                    :
                    <Text style={{ fontSize: 16, alignSelf: 'center', marginTop: 50 }}>ไม่มีข้อมูล</Text>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            {USER.position === 'ผู้จัดการ' ?
                renderManagerCheck(navigation)
                :
                renderUserComment(navigation)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 3,
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {

        width: 20,
        height: 20,
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
})

export default StaffCommentScreen;