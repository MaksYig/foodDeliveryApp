import React from 'react';
import { View, Text } from 'react-native';
import { FONTS, SIZES } from '../constants';

const Header = ({ containerStyle, title, leftComponent, rightComponent }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: SIZES.radius,
        ...containerStyle,
      }}
    >
      {/* Left */}
      {leftComponent}
      {/* Title */}
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <Text style={{ ...FONTS.h3 }}>{title}</Text>
      </View>
      {/* Right */}
      {rightComponent}
    </View>
  );
};

export default Header;
