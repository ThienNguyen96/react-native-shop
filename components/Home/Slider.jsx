import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { db } from '../../configs/FirebaseConfig';
import { collection, query, getDocs } from 'firebase/firestore/lite';
import { useState } from 'react';

export default function Slider() {

    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        getSliderList();
    }, []);
    
    const getSliderList = async() => {
        setSliderList([]);

        const q = query(collection(db, 'Slider'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setSliderList(prev => [...prev, doc.data()])
        });
    };

  return (
    <View>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20,
        paddingLeft: 20,
        paddingTop: 20,
        marginBottom: 5
      }}>#Special for you</Text>

      <FlatList
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        paddingLeft: 20
      }}
      renderItem={({item, index}) => (
        <Image source={{uri:item.imageUrl}} style={{
            width: 300,
            height: 150,
            borderRadius: 15,
            marginRight: 15
        }} />
      )}
     />
    </View>
  )
}