import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

import moment from 'moment';
import 'moment/locale/th';

const AssessmentScreen = ({ navigation }) => {

    let presentYear = new Date();
    let passedYear = new Date();
    passedYear.setFullYear(presentYear.getFullYear() - 5);
    console.log(passedYear);

    var allYear = [];

    const renderYearList = ({ navigation }) => {
        while (presentYear > passedYear) {
            allYear.push(new Date(presentYear));
            presentYear.setFullYear(presentYear.getFullYear() - 1);
        }

        const renderItem = ({ item }) => {
            // if(checkDate != undefined && Object.entries(checkDate).length !== 0){
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Questionnaire',
                            {
                                userId: "test",
                                year: moment(item).format('yyyy'),
                                part: 1
                            });
                        }
                        }>
                        <Card style={{
                            width:140,
                            marginTop: 16,
                            // borderWidth: 1,
                            borderRadius: 20,
                            elevation: 5,
                            // padding: 16,
                            backgroundColor: '#E0FFFF'
                            // borderColor: COLORS.primary
                            // 
                        }} >
                            <Card.Content>
                                <Text style={{
                                    fontSize: 24,
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                    alignSelf: 'center'
                                }}>{moment(item).format('yyyy')}-1</Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Questionnaire',
                            {
                                userId: "test",
                                year: moment(item).format('yyyy'),
                                part: 2
                            });
                        }
                        }>
                        <Card style={{
                            marginTop: 16,
                            // borderWidth: 1,
                            width:140,
                            borderRadius: 20,
                            elevation: 5,
                            // padding: 16,
                            backgroundColor: '#FAFAD2'
                            // borderColor: COLORS.primary
                            // 
                        }} >
                            <Card.Content>
                                <Text style={{
                                    fontSize: 24,
                                    fontStyle: 'italic',
                                    fontWeight: 'bold',
                                    alignSelf: 'center'
                                }}>{moment(item).format('yyyy')}-2</Text>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
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
        <Animatable.View style={{ flex: 1 }}
        animation='fadeIn'> 
            {renderYearList({ navigation })}
        </Animatable.View>
    );
}

const styles = StyleSheet.create({

});

export default AssessmentScreen;