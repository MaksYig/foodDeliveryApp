import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import HorizontalFoodCard from '../../components/HorizontalFoodCard';
import VerticalFoodCard from '../../components/VerticalFoodCard';
import {
  FONTS,
  COLORS,
  icons,
  dummyData,
  SIZES,
  images,
} from '../../constants';

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      {/* Hedaer */}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity>
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
            Show all
          </Text>
        </TouchableOpacity>
      </View>
      {/* Content */}
      {children}
    </View>
  );
};

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(1);
  const [recomends, setRecomends] = React.useState([]);
  const [popular, setPopular] = React.useState([]);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const [menuList, setMenuList] = React.useState([]);

  React.useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  /* Handler */

  function handleChangeCategory(categoryId, menuTypeId) {
    //Retrieve the popular menu
    let selectedPopular = dummyData.menu.find((a) => a.name == 'Popular');
    //Retrieve recomended menu
    let selectedRecomend = dummyData.menu.find((a) => a.name == 'Recommended');

    //   Find menu based on menuTypeId
    let selectedMenu = dummyData.menu.find((a) => a.id == menuTypeId);
    //Set recommended List by category type
    setRecomends(
      selectedRecomend?.list.filter((a) => a.categories.includes(categoryId))
    );
    //Set popular menu based on category ID

    setPopular(
      selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
    );
    // Set the menu based on categotyID
    setMenuList(
      selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
    );
  }

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 40,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {/* Icon */}
        <Image
          source={icons.search}
          style={{ width: 20, height: 20, tintColor: COLORS.black }}
        />
        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholder='Search food...'
        />
        {/* Filter Button */}
        <TouchableOpacity
        // onPress={}
        >
          <Image
            source={icons.filter}
            style={{ width: 20, height: 20, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMenuTypes() {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              marginRight:
                index === dummyData.menu.length - 1 ? SIZES.padding : 0,
            }}
            onPress={() => {
              setSelectedMenuType(item.id);
              handleChangeCategory(selectedCategoryId, item.id);
            }}
          >
            <Text
              style={{
                color:
                  selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  }

  function renderRecomendedSection() {
    return (
      <Section title='Recomended' onPress={() => console.log('Show all')}>
        <FlatList
          data={recomends}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HorizontalFoodCard
              containerStyle={{
                height: 180,
                width: SIZES.width * 0.85,
                marginLeft: index == 0 ? SIZES.padding : 18,
                padding: 18,
                marginRight: index == recomends.length - 1 ? SIZES.padding : 0,
                paddingRight: SIZES.radius,
                alignItems: 'center',
              }}
              imageStyle={{
                marginTop: 35,
                width: 150,
                height: 150,
              }}
              item={item}
              onPress={() => console.log('HorizontalFoodCard')}
            />
          )}
        />
      </Section>
    );
  }
  function renderPopularSection() {
    return (
      <Section
        title='Popular near you'
        onPress={() => console.log('popular near you')}
      >
        <FlatList
          data={recomends}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <VerticalFoodCard
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : 18,
                marginRight: index == popular.length - 1 ? SIZES.padding : 0,
              }}
              item={item}
              onPress={() => console.log('VerticalFoodCard')}
            />
          )}
        />
      </Section>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Search */}
      {renderSearch()}
      {/* List */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Popular */}
            {renderPopularSection()}
            {/* Recomended */}
            {renderRecomendedSection()}
            {/* Menu Type */}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{ marginTop: 20, width: 110, height: 110 }}
              item={item}
              onPress={() => console.log('HorizontalCard')}
            />
          );
        }}
      />
    </View>
  );
};

export default Home;
