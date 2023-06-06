import {ImageBackground, Text} from 'react-native';
import {StatusBar, StyleSheet, View} from 'react-native';

const BootScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="light-content"></StatusBar>
      <ImageBackground
        source={require('../assets/images/decoration/BootScreen.png')}
        resizeMode="cover"
        style={{width: '100%', height: '100%', display: 'flex'}}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 30,
          }}>
          <Text>safas</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    elevation: 2,
  },
});

export default BootScreen;
