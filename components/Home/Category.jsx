import { View, Text, FlatList } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore/lite';
import { db } from '../../configs/FirebaseConfig';
import { useEffect } from 'react';
import { useState } from 'react';
import CategoryItem from './CategoryItem';
import { useRouter } from 'expo-router';

export default function Category() {

  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async() => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList(prev=> [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <View style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
      }}>
        <Text style={{
          fontSize: 20,
          fontFamily: 'outfit-bold'
        }}>Category</Text>
        <Text style={{
          color: Colors.PRIMARY,
          fontFamily: 'outfit-medium'
        }}>View All</Text>
      </View>

      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 20
        }}
        renderItem={({item, index}) => (
          <CategoryItem  
            category={item} 
            key={index}
            onCategoryPress={() => router.push('/businesslist/'+ item.name)}
          />
        )} />
    </View>
  )
}