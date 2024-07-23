import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function PopularBusinessCard({business}) {
  return (
    <View style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15
    }}>
        <Image
            source={{uri: business?.imageUrl}}
            style={{
                width: 200,
                height: 130,
                borderRadius: 15
            }}
        />
        <View style={{
            marginTop: 7,
            gap: 5
        }}>
            <Text style={{
                fontSize: 17,
                fontFamily: 'outfit-bold'
            }}>{business.name}</Text>
            <Text style={{
                fontSize: 17,
                fontFamily: 'outfit',
                color: Colors.GRAY
            }}>{business.address}</Text>
        
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{display: 'flex', flexDirection: 'row', gap:5}}>
                    <Image
                        source={require('./../../assets/images/favourite.png')}
                        style={{
                            width: 15,
                            height: 15
                        }}
                    />
                    <Text style={{fontFamily: 'outfit-bold'}}>4.5</Text>
                </View>
                <Text
                    style={{
                        fontFamily: 'outfit',
                        backgroundColor: Colors.PRIMARY,
                        color: Colors.WHITE,
                        borderRadius: 5,
                        padding: 3,
                        fontSize: 12
                    }}
                >{business.category}</Text>
            </View>
        </View>
    </View>
  )
}