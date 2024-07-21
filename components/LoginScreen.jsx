import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import React from 'react';
import { Colors } from './../constants/Colors';
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                console.log('No session created');
            }
        } catch (err) {
            console.error('OAuth error', err);
            console.error('Error details:', JSON.stringify(err, null, 2));
        }
    }, [startOAuthFlow]);

    return (
        <View>
            <View style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: 100
            }}>
                <Image source={require('./../assets/images/login.png')} 
                    style={{
                        width: 220,
                        height: 450,
                        borderRadius: 20,
                        borderWidth: 6,
                        borderColor: Colors.BLACK
                    }} 
                />
            </View>
            <View style={styles.subContainer}>
                <Text style={{
                    fontSize: 30,
                    fontFamily: 'outfit-bold',
                    textAlign: 'center'
                }}>Your Ultimate
                    <Text style={{ color: Colors.PRIMARY }}>
                        Community Business Directory
                    </Text> App
                </Text>
                <Text style={{
                    fontSize: 15,
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    marginVertical: 15,
                    color: Colors.GRAY
                }}>
                    Find your favorite business near you and post your own business to your community
                </Text>

                <TouchableOpacity onPress={onPress} style={styles.btn}>
                    <Text style={{
                        textAlign: 'center',
                        color: Colors.WHITE,
                        fontFamily: 'outfit'
                    }}>Let's Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    subContainer: {
        backgroundColor: Colors.WHITE,
        padding: 20,
        marginTop: -20
    },
    btn: {
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop: 20
    }
});
