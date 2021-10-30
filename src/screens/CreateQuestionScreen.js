import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TextInput, View, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import axiox from 'axios';
import { MAIN_URL } from '../constants/variables';

const CreateQuestionScreen = ({ route }) => {
    const { type, year, part } = route.params;
    console.log(route.params);
    const [allQuestion, setAllQuestion] = useState([]);
    const [isLoading, setLoading] = useState(false);
    var setNumber = '';
    var setQuestion = '';
    var deleteNumber = '';

    const getAllQuestion = () => {
        setLoading(true);
        axiox.get(MAIN_URL + '/question/' + type + '/' + year + '/' + part)
            .then(res => {
                setAllQuestion(res.data);
                setLoading(false);
                // setArrayholder(res.data)
                // console.log(users);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            });
    };

    const postQuestion = () => {
        // console.log(setNumber);
        // console.log(setQuestion);
        setLoading(true);
        axiox.post(MAIN_URL + '/question/' + type + '/' + year + '/' + part + '/' + setNumber, setQuestion)
            .then(res => {
                console.log(res.data);
                getAllQuestion();

                alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
                // setNumber = '';
                // setQuestion = '';
            })
            .catch(err => {
                console.log(err);

                alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);
            });
    };

    const deleteQuestion = () => {
        // console.log(setNumber);
        // console.log(setQuestion);
        setLoading(true);
        axiox.delete(MAIN_URL + '/question/' + type + '/' + year + '/' + part + '/' + deleteNumber)
            .then(res => {
                console.log(res.data);
                getAllQuestion();

                alert("บันทึกข้อมูลสำเร็จ");
                setLoading(false);
                // setNumber = '';
                // setQuestion = '';
            })
            .catch(err => {
                console.log(err);

                alert("บันทึกข้อมูลล้มเหลว กรุณาลองใหม่");
                setLoading(false);
            });
    }

    useEffect(() => {
        setLoading(true);
        getAllQuestion();
    }, []);

    const renderItem = ({ item }) => {
        // console.log(item);
        return (

            <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, padding: 8, margin: 4 }}>

                <Text style={{ flex: 1, marginRight: 6, fontSize: 18, fontWeight: 'bold' }}>
                    ข้อ {item.number + ". \r\n" + item.qt}
                </Text>

                <Icon
                    name='trash'
                    color='red'
                    size={20}
                    style={{ padding: 6, flex: 0.05, alignSelf: 'center' }}
                    onPress={() => {

                        deleteNumber = item.number;
                        deleteQuestion();
                    }}
                />
            </View>

        );
    };

    return (
        isLoading ?

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

            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={allQuestion}
                    keyExtractor={(item, index) => `${index}`}
                    // ItemSeparatorComponent={itemSeparator}
                    // shouldComponentUpdate={false}
                    renderItem={renderItem}
                />

                <View style={{ backgroundColor: 'white', padding: 6, borderWidth: 1, }}>
                    <TextInput
                        style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 8, }}
                        // textContentType='telephoneNumber'
                        placeholder="ข้อ (พิมพ์เฉพาะตัวเลข)"
                        placeholderTextColor="gray"
                        multiline
                        // numberOfLines={6}
                        color='blue'
                        fontSize={16}
                        // defaultValue={''}
                        onChangeText={number => {
                            setNumber = number;
                        }}
                    />
                    <TextInput
                        style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 8, height: 100 }}
                        // textContentType='telephoneNumber'
                        placeholder="คำถาม"
                        placeholderTextColor="gray"
                        multiline
                        numberOfLines={6}
                        color='blue'
                        fontSize={16}
                        // defaultValue={''}
                        onChangeText={question => {
                            setQuestion = {
                                question: question
                            }
                        }}
                    />
                    <Button
                        style={{
                            backgroundColor: 'green',
                            borderRadius: 10,
                            marginVertical: 8
                        }}
                        mode="Contained"
                        onPress={() => {
                            postQuestion();
                        }}>
                        <Text style={{ alignSelf: 'center', color: 'white' }}>เพิ่มคำถาม</Text>

                    </Button>

                </View>

            </SafeAreaView>
    );
};

export default CreateQuestionScreen;