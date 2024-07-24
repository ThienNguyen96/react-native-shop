import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { db } from '../../configs/FirebaseConfig';
import { useState } from 'react';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {

    const navigation = useNavigation();
    const {category} = useLocalSearchParams();
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: category
        });

        getBusinessList();
    }, []);

    /**
    * use to get business list by category
    */

    const getBusinessList = async() => {
        setBusinessList([]);
        const q = query(collection(db, 'BusinessList'), where("category", '==', category));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev => [...prev, doc.data()]);
        })
    }

  return (
    <View>
        {businessList?.length > 0 ? 
        <FlatList
            data={businessList}
            renderItem={({item, index}) => (
                <BusinessListCard business={item} key={index}/>
            )}
        /> :
        <Text style={{
            fontFamily: 'outfit-bold',
            color: Colors.GRAY,
            fontSize: 20,
            textAlign: 'center',
            marginTop: '50%'
        }}>No Business Found</Text>
        }
    </View>
  )
}