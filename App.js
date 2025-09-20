import { Text, View } from 'react-native';

import colors from './colors';

export default function App() {
  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 16,
      color: colors.primary
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello world</Text>
    </View>
  )
}
