import React from 'react';
import { View, Image, TouchableOpacity, FlatList, Dimensions, Animated } from 'react-native';

import { circuits } from './constants/circuits';
import colors from './constants/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const images = {
    1: require('./assets/circuits/1.jpg'),
    2: require('./assets/circuits/2.jpg'),
    3: require('./assets/circuits/3.jpg'),
    4: require('./assets/circuits/4.jpg'),
    5: require('./assets/circuits/5.jpg'),
    6: require('./assets/circuits/6.jpg'),
    7: require('./assets/circuits/7.jpg'),
    8: require('./assets/circuits/8.jpg'),
    9: require('./assets/circuits/9.jpg'),
    10: require('./assets/circuits/10.jpg'),
    11: require('./assets/circuits/11.jpg'),
    12: require('./assets/circuits/12.jpg'),
    13: require('./assets/circuits/13.jpg'),
    14: require('./assets/circuits/14.jpg'),
    15: require('./assets/circuits/15.jpg'),
    16: require('./assets/circuits/16.jpg'),
    17: require('./assets/circuits/17.jpg'),
    18: require('./assets/circuits/18.jpg'),
    19: require('./assets/circuits/19.jpg'),
    20: require('./assets/circuits/20.jpg'),
    21: require('./assets/circuits/21.jpg'),
    22: require('./assets/circuits/22.jpg'),
    23: require('./assets/circuits/23.jpg'),
    24: require('./assets/circuits/24.jpg')
}

export default function App() {
    const pan = React.useRef(new Animated.ValueXY()).current;
    const [scrollViewWidth, setScrollViewWidth] = React.useState(0);

    const styles = {
        item: {
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            borderWidth: 4,
            borderRadius: 20,
            borderColor: colors.primary,
            overflow: 'hidden',
            backfaceVisibility: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
        },
        image: {
            width: '100%',
            height: '100%'
        },
        section: {
            height: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30
        },
        text: {
            fontFamily: 'F1',
            fontSize: 18,
            color: colors.white
        },
        smallText: {
            fontFamily: 'F1',
            fontSize: 9,
            color: colors.primary,
        },
        row: {
            height: '20%',
            flexDirection: 'row',
            gap: 10
        },
        container: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.secondary
        }
    }

    const Card = ({ item, index, pan }) => {
        const flipAnim = React.useRef(new Animated.Value(0)).current;
        const [flipped, setFlipped] = React.useState(false);

        const frontInterpolate = flipAnim.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

        const backInterpolate = flipAnim.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

        const handleFlip = () => {
            Animated.spring(flipAnim, {
                toValue: flipped ? 0 : 180,
                useNativeDriver: true,
                friction: 8,
                tension: 10
            }).start(() => setFlipped(!flipped))
        }

        return (
            <Animated.View
                style={{
                    transform: [
                        {
                            scale: pan.x.interpolate({
                                inputRange: [
                                    (index - 1) * SCREEN_WIDTH - SCREEN_WIDTH / 2,
                                    index * SCREEN_WIDTH - SCREEN_WIDTH / 2,
                                    (index + 1) * SCREEN_WIDTH - SCREEN_WIDTH / 2
                                ],
                                outputRange: [0.8, 1, 0.8],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}
            >
                <TouchableOpacity activeOpacity={0.9} onPress={handleFlip}>
                    <Animated.View style={[styles.item, { transform: [{ rotateY: frontInterpolate }], position: 'absolute' }]}>
                        <Image source={images[item.id]} style={styles.image} />
                    </Animated.View>
                    <Animated.View style={[styles.item, { backgroundColor: colors.secondary, transform: [{ rotateY: backInterpolate }] }]}>
                        <Animated.View style={styles.section}>
                            <Animated.Text style={[styles.text, { fontSize: 36 }]}>{item.name}</Animated.Text>
                        </Animated.View>
                        <Animated.View style={{ height: '20%' }}>
                            <Animated.View>
                                <Animated.Text style={styles.smallText}>LOCATION:</Animated.Text>
                                <Animated.Text style={styles.text}>{item.city} ({item.country})</Animated.Text>
                            </Animated.View>
                        </Animated.View>
                        <Animated.View style={styles.row}>
                            <Animated.View>
                                <Animated.Text style={styles.smallText}>LENGTH (KM):</Animated.Text>
                                <Animated.Text style={styles.text}>{item.length}</Animated.Text>
                            </Animated.View>
                            <Animated.View>
                                <Animated.Text style={styles.smallText}>NUMBER OF LAPS:</Animated.Text>
                                <Animated.Text style={styles.text}>{item.numberOfLaps}</Animated.Text>
                            </Animated.View>
                            <Animated.View>
                                <Animated.Text style={styles.smallText}>NUMBER OF TURNS:</Animated.Text>
                                <Animated.Text style={styles.text}>{item.numberOfTurns}</Animated.Text>
                            </Animated.View>
                        </Animated.View>
                        <Animated.View style={{ height: '20%' }}>
                            <Animated.View>
                                <Animated.Text style={styles.smallText}>FASTEST LAP:</Animated.Text>
                                <Animated.Text style={styles.text}>{item.recordTime} ({item.recordDriver}, {item.recordYear})</Animated.Text>
                            </Animated.View>
                        </Animated.View>
                    </Animated.View >
                </TouchableOpacity >
            </Animated.View >
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={circuits}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                    <Card item={item} index={index} pan={pan} />
                )}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentInsetAdjustmentBehavior='never'
                snapToAlignment='center'
                decelerationRate='fast'
                automaticallyAdjustContentInsets={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                snapToInterval={SCREEN_WIDTH}
                contentOffset={{ x: (SCREEN_WIDTH / 2) * -1, y: 0 }}
                onLayout={(e) => {
                    setScrollViewWidth(e.nativeEvent.layout.width);
                }}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: pan.x } } }], { useNativeDriver: false })}
            />
        </View>
    )
}