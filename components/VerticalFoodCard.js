import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FONTS, SIZES, icons, COLORS } from '../constants';

const VerticalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        padding: SIZES.radius,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
    >
      {/* Calories and Favourite */}
      <View style={{ flexDirection: 'row' }}>
        {/* Calories */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image source={icons.calories} style={{ width: 30, height: 30 }} />
          <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
            {item.calories} Calories
          </Text>
        </View>
        {/* Favourite */}
        <Image
          source={icons.love}
          style={{
            width: 20,
            height: 20,
            tintColor: item.isFavourite ? COLORS.primary : COLORS.gray,
          }}
        />
      </View>
      {/* Image */}
      <View
        style={{
          width: 150,
          height: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image source={item.image} style={{ width: '100%', height: '100%' }} />
      </View>
      {/* Info */}
      <View style={{ alignItems: 'center', marginTop: -20 }}>
        <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
        <Text
          style={{
            colo: COLORS.darkGray2,
            alignItems: 'center',
            ...FONTS.body5,
          }}
        >
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
