import React from 'react';
import { View, Image, FlatList, Dimensions, TouchableOpacity, Animated } from 'react-native';

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
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.secondary
    },
    item: {
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH,
      borderWidth: 4,
      borderRadius: 20,
      borderColor: colors.primary,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    }
  }

  const renderItem = ({ item, index }) => (
    <Animated.View
      style={{
        transform: [
          {
            scale: pan.x.interpolate({
              inputRange: [
                (index - 1) * SCREEN_WIDTH - (SCREEN_WIDTH / 2),
                index * SCREEN_WIDTH - (SCREEN_WIDTH / 2),
                (index + 1) * SCREEN_WIDTH - (SCREEN_WIDTH / 2),
              ],
              outputRange: [0.8, 1, 0.8],
              extrapolate: 'clamp'
            })
          }
        ]
      }}>
      <TouchableOpacity activeOpacity={0.75} style={styles.item}>
        <Image source={images[item.id]} style={styles.image} />
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={circuits}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
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