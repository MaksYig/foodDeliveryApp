import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { SIZES, FONTS, COLORS } from '../constants';

const TextIconButton = ({
  containerStyle,
  label,
  labelStyle,
  iconStyle,
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Text style={{ ...FONTS.body3, ...labelStyle }}>{label}</Text>
      <Image
        source={icon}
        style={{
          marginLeft: 5,
          width: 20,
          height: 20,
          tintColor: COLORS.black,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default TextIconButton;
