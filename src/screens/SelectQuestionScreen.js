import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS } from '../constants/theme';

const SelectQuestionScreen = ({ navigation, route }) => {
    const { userId, sheetId, year, part } = route.params;

    return (
        <View style={{ margin: 24 }}>
            <Button
                style={{ padding: 8, backgroundColor: 'green', }}
                onPress={() => {
                    navigation.navigate('CreateQuestion', { type: 'staff', year: year, part: part });
                }}
            ><Text style={{ fontSize: 18, color: 'white' }}>สำหรับพนักงานทั่วไป</Text></Button>
            <Button
                style={{ padding: 8, marginTop: 16, backgroundColor: 'blue' }}
                onPress={() => {
                    navigation.navigate('CreateQuestion', { type: 'manager', year: year, part: part });
                }}
            ><Text style={{ fontSize: 18, color: 'white' }}>สำหรับผู้จัดการถาม</Text></Button>
        </View>
    );
};

export default SelectQuestionScreen;