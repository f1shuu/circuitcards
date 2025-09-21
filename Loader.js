import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import HomeScreen from './HomeScreen';

SplashScreen.preventAutoHideAsync();

export default function Loader() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                await Font.loadAsync({
                    'F1': require('./assets/fonts/F1.ttf')
                })
            } catch (error) {
                console.error(error);
            } finally {
                setFontsLoaded(true);
            }
        }
        load();
    }, [])

    useEffect(() => {
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded])

    if (!fontsLoaded) return null;

    return <HomeScreen />
}
