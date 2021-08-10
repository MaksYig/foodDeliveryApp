import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { MainLayout } from '../screens';
import { COLORS, icons, dummyData, constants } from '../constants';
import { FONTS, SIZES } from '../constants/theme';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tabs/tabActions';

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{ width: 20, height: 20, tintColor: COLORS.white }}
      />
      <Text style={{ marginLeft: 15, color: COLORS.white, ...FONTS.h3 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerComponent = ({ navigation, selectedTab, setSelectedTab }) => {
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, paddingHorizontal: SIZES.radius }}>
        {/* Close */}
        <View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{ height: 35, width: 35, tintColor: 'white' }}
            />
          </TouchableOpacity>
        </View>
        {/* Profile */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center',
          }}
          onPress={() => {
            console.log('Profile');
          }}
        >
          <Image
            source={dummyData.myProfile.profile_image}
            style={{ width: 40, height: 40, borderRadius: SIZES.radius }}
          />
          <View style={{ marginLeft: SIZES.radius }}>
            <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
              {dummyData.myProfile.name}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
              View your profile
            </Text>
          </View>
        </TouchableOpacity>
        {/* Drawer Items*/}
        <View style={{ flex: 1, marginTop: SIZES.radius }}>
          <CustomDrawerItem
            label={constants.screens.home}
            isFocused={selectedTab === constants.screens.home}
            icon={icons.home}
            onPress={() => {
              setSelectedTab(constants.screens.home);
              navigation.navigate('MainLayout');
            }}
          />
          <CustomDrawerItem
            label={constants.screens.my_wallet}
            icon={icons.wallet}
            isFocused={selectedTab === constants.screens.my_wallet}
            icon={icons.wallet}
            onPress={() => {
              setSelectedTab(constants.screens.my_wallet);
              navigation.navigate('MainLayout');
            }}
          />
          <CustomDrawerItem
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={selectedTab === constants.screens.notification}
            onPress={() => {
              setSelectedTab(constants.screens.notification);
              navigation.navigate('MainLayout');
            }}
          />
          <CustomDrawerItem
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocused={selectedTab === constants.screens.favourite}
            onPress={() => {
              setSelectedTab(constants.screens.favourite);
              navigation.navigate('MainLayout');
            }}
          />
          {/* Line Devider */}
          <View
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />
          <CustomDrawerItem label='Track your order' icon={icons.location} />
          <CustomDrawerItem label='Coupons' icon={icons.coupon} />

          <CustomDrawerItem label='Settings' icon={icons.setting} />
          <CustomDrawerItem label='Invite Friend' icon={icons.profile} />
          <CustomDrawerItem label='Help center' icon={icons.help} />
        </View>
        <View style={{ marginBottom: SIZES.padding }}>
          <CustomDrawerItem label='Log out' icon={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Drawer.Navigator
        drawerType='slide'
        overlayColor='transparent'
        drawerStyle={{
          flex: 1,
          width: '65%',
          paddingRight: 20,
          backgroundColor: 'transparent',
        }}
        sceneContainerStyle={{
          backgroundColor: 'transparent',
        }}
        initialRouteName='MainLayout'
        drawerContent={(props) => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);

          return (
            <CustomDrawerComponent
              navigation={props.navigation}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          );
        }}
      >
        <Drawer.Screen name='MainLayout'>
          {(props) => (
            <MainLayout {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

// export default CustomDrawer;
function mapStateToProps(state) {
  return { selectedTab: state.tabReducers.selectedTab };
}
function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
