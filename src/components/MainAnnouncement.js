import React, { useState, useRef } from 'react'
import { Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import {  Card, Title, Paragraph } from 'react-native-paper'

const MainAnnouncement = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const _carousel = useRef(null)
  const DATA = [
    {
      id: "1",
      title: "คุมทำแผนหนุ่มห้างฯฆ่าอริ 2 ศพ อ้างถูกท้าให้ยิง เลยกดไม่ยั้ง 8 นัด",
      image: require('../images/1.jpeg')
    },
    {
      id: "2",
      title: "Clubhouse ประกาศเริ่มทดสอบแอปพลิเคชันบนระบบปฏิบัติการ Android",
      image: require('../images/2.jpeg')
    },
    {
      id: "3",
      title: "นายกฯ สั่ง 8 ข้อ เร่งสกัด คลัสเตอร์คลองเตย ระดมฉีดวัคซีน 1-3 พันคนต่อวัน",
      image: require('../images/3.jpeg')
    },
    {
      id: "4",
      title: "ไทยรัฐทีวีร่วมกับมูลนิธิดวงประทีป เปิดรับบริจาคช่วยโควิด-19",
      image: require('../images/4.jpeg')
    },
    {
      id: "5",
      title: "บุรีรัมย์ วอนหยุดอยู่บ้าน หลังโควิดพุ่งสูง 123 ราย พร้อมปิด 3 หมู่บ้าน",
      image: require('../images/5.jpeg')
    },
    {
      id: "6",
      title: "ย้ายประเทศกันเถอะ เฟซบุ๊กกลุ่ม แฮชแท็กมาแรง แชร์ประสบการณ์ชีวิตในต่างแดน",
      image: require('../images/6.jpeg')
    },
  ];

  const itemWidth = (wp(75) + wp(2)) * 2

  const _renderItem = ({ item }) => {
    return (
      <Card
        style={{
          margin: 8,
          padding: 8,
          width: Dimensions.get('window').width - 16
        }}
        onPress={() => { alert('test') }}
      >
        <Card.Cover source={item.image} />
        <Card.Content>
          <Paragraph>{item.title}</Paragraph>
        </Card.Content>
      </Card>
    );
  }

  return (
    <Carousel
      ref={_carousel}
      data={DATA}
      renderItem={_renderItem}
      sliderWidth={Dimensions.get('window').width}
      itemWidth={Dimensions.get('window').width}
    />
  );
}

const wp = (percentage) => {
  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.lightGray4
  },
  tab_style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50
  },
});

export default MainAnnouncement
