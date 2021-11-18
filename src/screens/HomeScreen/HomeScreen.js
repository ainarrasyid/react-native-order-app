import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Food Order',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <Image
            source={require('../../assets/images/order-history.png')}
            style={{
              tintColor: '#03A9F4',
              width: 40,
              height: 30,
              marginHorizontal: 15,
            }}
          />
        </TouchableOpacity>
      ),
    });

    fetch(
      'https://neptune.crocodic.net/crocodic-training-api/public/api/v1/foods',
    )
      .then(response => response.json())
      .then(result => {
        setOrderList(result.data);
      });
  }, []);

  function rupiah(number) {
    return `Rp. ${number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
  }

  function renderFoodList({item, index}) {
    return (
      <TouchableOpacity
        style={styles.list}
        onPress={() =>
          navigation.push('Details', {...item, price: rupiah(item.price)})
        }>
        <Image source={{uri: item.photo}} style={styles.image} />
        <View style={styles.text}>
          <Text style={styles.heading}>{item.name}</Text>
          <Text style={styles.subHeading}>{rupiah(item.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orderList}
        renderItem={renderFoodList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  list: {
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    height: width * 0.25,
    width: width * 0.25,
  },
  text: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  subHeading: {
    fontSize: 16,
    color: '#008001',
    fontWeight: '500',
    marginVertical: 5,
  },
});

export default HomeScreen;
