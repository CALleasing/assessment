import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Card } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

import moment from 'moment';
import 'moment/locale/th';
import { TYPE, USER } from '../constants/variables';

const AssessmentScreen = ({ navigation, route }) => {

    let sheetID = route.params.item;
    // console.log(sheetID);
    let presentYear = new Date();
    let passedYear = new Date();
    passedYear.setFullYear(2020);
    // console.log(passedYear);

    var allYear = [];

    const renderYearList = ({ navigation }) => {
        while (presentYear > passedYear) {
            // if (presentYear.getFullYear() > 2020) {
            console.log(presentYear.getFullYear())
            allYear.push(new Date(presentYear));
            presentYear.setFullYear(presentYear.getFullYear() - 1);
            // }

        }

        const renderItem = ({ item }) => {
            // if(checkDate != undefined && Object.entries(checkDate).length !== 0){
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button
                        style={{
                            backgroundColor: '#4682B4',
                            borderRadius: 10,
                            marginVertical: 8,
                            padding: 8,
                        }}
                        mode="Contained"
                        onPress={() => {
                            switch (sheetID) {
                                case 1:
                                    navigation.navigate('Questionnaire',
                                        {
                                            userId: USER.userid,
                                            sheetID: sheetID,
                                            year: moment(item).format('yyyy'),
                                            part: 1
                                        }
                                    );
                                    break;

                                case 2:
                                    navigation.navigate('UserList',
                                        {
                                            userId: null,
                                            sheetID: sheetID,
                                            year: moment(item).format('yyyy'),
                                            part: 1
                                        }

                                    );
                                    break;
                                case 3:
                                    navigation.navigate('SelectQuestion',
                                        {
                                            userId: null,
                                            sheetID: sheetID,
                                            year: moment(item).format('yyyy'),
                                            part: 1
                                        }
                                    );
                                    break;
                                case 4:
                                    if (USER.position != 'ผู้จัดการ') {
                                        navigation.navigate('ManagerList', {
                                            userId: USER.userid,
                                            sheetID: sheetID,
                                            year: moment(item).format('yyyy'),
                                            part: 1
                                        })
                                    }
                                    else {
                                        // console.log(USER.userid);
                                        navigation.navigate('StaffComment',
                                            {
                                                userId: USER.userid,
                                                sheetID: sheetID,
                                                year: moment(item).format('yyyy'),
                                                part: 1
                                            }
                                        )
                                    }

                                    break;
                                default: break;
                            }
                        }} >

                        <Text style={{
                            color: 'white',
                            fontSize: 24,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>{moment(item).format('yyyy')}-1</Text>

                    </Button>

                    <Button
                        style={{
                            backgroundColor: '#2E8B57',
                            borderRadius: 10,
                            marginVertical: 8,
                            padding: 8,
                        }}
                        mode="Contained"
                        onPress={() => {
                            switch (sheetID) {
                                case 1:
                                    navigation.navigate('Questionnaire',
                                        {
                                            userId: USER.userid,
                                            sheetID: sheetID,
                                            year: moment(item).format('yyyy'),
                                            part: 2
                                        }
                                    );
                                    break;

                                case 2:
                                    navigation.navigate('UserList',
                                        {
                                            userId: null,
                                            sheetID: sheetID,
                                            year: moment(item).format('yyyy'),
                                            part: 2
                                        }

                                    );
                                    break;
                                case 3:
                                    navigation.navigate('SelectQuestion',
                                        {
                                            userId: null,
                                            sheetID: sheetID,
                                            year: moment(item).format('yyyy'),
                                            part: 2
                                        }
                                    );
                                    break;
                                case 4:
                                    if (USER.position != 'ผู้จัดการ') {
                                        navigation.navigate('ManagerList', {
                                            userId: USER.userid,
                                            sheetID: sheetID,
                                            year: moment(item).format('yyyy'),
                                            part: 2
                                        })
                                    }
                                    else {
                                        navigation.navigate('StaffComment',
                                            {
                                                userId: USER.userid,
                                                sheetID: sheetID,
                                                year: moment(item).format('yyyy'),
                                                part: 2
                                            }
                                        )
                                    };
                                    break;
                                default: break;
                            }
                        }
                        }>

                        <Text style={{
                            color: 'white',
                            fontSize: 24,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            alignSelf: 'center'
                        }}>{moment(item).format('yyyy')}-2</Text>

                    </Button>
                </View>

            );
        }

        return (
            <FlatList

                data={allYear}
                keyExtractor={(item) => `${item}`}
                renderItem={renderItem}
            // horizontal
            // showsHorizontalScrollIndicator={false}
            />
        );
    }

    return (
        <Animatable.View style={{paddingVertical:20, flex: 1, backgroundColor: 'white' }}
            animation='fadeIn'>
            {renderYearList({ navigation })}
        </Animatable.View>
    );
}

const styles = StyleSheet.create({

});

export default AssessmentScreen;