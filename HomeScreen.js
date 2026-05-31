import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, Animated, Button } from 'react-native';
import Checkbox from 'expo-checkbox';

import { circuits } from './constants/circuits';
import colors from './constants/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

const images = [
    require('./assets/circuits/1.webp'),
    require('./assets/circuits/2.webp'),
    require('./assets/circuits/3.webp'),
    require('./assets/circuits/4.webp'),
    require('./assets/circuits/5.webp'),
    require('./assets/circuits/6.webp'),
    require('./assets/circuits/7.webp'),
    require('./assets/circuits/8.webp'),
    require('./assets/circuits/9.webp'),
    require('./assets/circuits/10.webp'),
    require('./assets/circuits/11.webp'),
    require('./assets/circuits/12.webp'),
    require('./assets/circuits/13.webp'),
    require('./assets/circuits/14.webp'),
    require('./assets/circuits/15.webp'),
    require('./assets/circuits/16.webp'),
    require('./assets/circuits/17.webp'),
    require('./assets/circuits/18.webp'),
    require('./assets/circuits/19.webp'),
    require('./assets/circuits/20.webp'),
    require('./assets/circuits/21.webp'),
    require('./assets/circuits/22.webp')
]

const shuffleCircuits = (items) => {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    return shuffled;
}

export default function App() {
    const pan = React.useRef(new Animated.ValueXY()).current;
    const listRef = React.useRef(null);
    const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
    const [shuffledCircuits, setShuffledCircuits] = React.useState(() => shuffleCircuits(circuits));
    const [useOriginalOrder, setUseOriginalOrder] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const visibleCircuits = useOriginalOrder ? circuits : shuffledCircuits;

    const updateActiveIndex = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setActiveIndex(Math.min(Math.max(index, 0), visibleCircuits.length - 1));
    }

    const shuffleCards = () => {
        setShuffledCircuits(shuffleCircuits(circuits));
        setActiveIndex(0);
        setUseOriginalOrder(false);
        pan.setValue({ x: 0, y: 0 });
        listRef.current?.scrollToOffset({ offset: 0, animated: false });
    }

    const handleOriginalOrderChange = (checked) => {
        setUseOriginalOrder(checked);
        setActiveIndex(0);
        pan.setValue({ x: 0, y: 0 });
        listRef.current?.scrollToOffset({ offset: 0, animated: false });
    }

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
            alignItems: 'center',
            padding: 20,
            gap: 20
        },
        image: {
            resizeMode: 'center',
            width: '100%'
        },
        section: {
            height: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 30
        },
        largeText: {
            fontFamily: 'F1',
            fontSize: 36,
            color: colors.white,
            textAlign: 'center'
        },
        smallText: {
            fontFamily: 'F1',
            fontSize: 9,
            color: colors.primary,
        },
        text: {
            fontFamily: 'F1',
            fontSize: 18,
            color: colors.white
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        },
        container: {
            flex: 1,
            backgroundColor: colors.secondary,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 100
        },
        button: {
            backgroundColor: colors.primary,
            paddingHorizontal: 40,
            paddingVertical: 20,
            borderRadius: 10
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
                        <Image source={images[item.id - 1]} style={styles.image} />
                    </Animated.View>
                    <Animated.View style={[styles.item, { transform: [{ rotateY: backInterpolate }] }]}>
                        <Animated.View style={styles.section}>
                            <Animated.Text style={styles.largeText}>{item.name}</Animated.Text>
                        </Animated.View>
                        <Animated.View>
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
                        <Animated.View>
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
            <View style={{ alignItems: 'center', gap: 20 }}>
                <View style={styles.row}>
                    <Checkbox
                        value={useOriginalOrder}
                        onValueChange={handleOriginalOrderChange}
                        color={useOriginalOrder ? colors.primary : undefined}
                    />
                    <Text style={styles.text}>Use F1 2026 season order</Text>
                </View>
                <FlatList
                    ref={listRef}
                    data={visibleCircuits}
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
                    onMomentumScrollEnd={updateActiveIndex}
                    onScrollEndDrag={updateActiveIndex}
                    style={{ flexGrow: 0 }}
                />
                <Text style={[styles.text, { opacity: 0.5 }]}>{activeIndex + 1}/{visibleCircuits.length}</Text>
            </View>
            <TouchableOpacity onPress={shuffleCards} style={styles.button}>
                <Text style={styles.text}>Shuffle</Text>
            </TouchableOpacity>
        </View>
    )
}
