import {Text, View} from 'react-native';
import React from 'react';

const Title = ({title, style}) => {
  return (
    <View
      style={[
        style,
        {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#212121',
          fontFamily: 'Poppins-SemiBold',
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: '#212121',
          fontFamily: 'Poppins-Regular',
        }}>
        See all
      </Text>
    </View>
  );
};

export default Title;
