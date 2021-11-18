import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {UserContext} from '../../context/UserContext';

const OrderHistoryScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [orderHistoryList, setOrderHistoryList] = useState([]);
  const {userData} = useContext(UserContext);

  function fetchOrderhistoryList() {
    let formData = new FormData();
    formData.append('users_id', userData.id);
    fetch(
      'https://neptune.crocodic.net/crocodic-training-api/public/api/v1/orders',
      {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      },
    )
      .then(response => response.json())
      .then(result => {
        setOrderHistoryList(result.data);
      });
  }

  function markOrderDelivered(id) {
    setLoading(true);
    let formData = new FormData();
    formData.append('orders_id', id);
    fetch(
      'https://neptune.crocodic.net/crocodic-training-api/public/api/v1/orders/delivered',
      {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      },
    )
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          fetchOrderhistoryList();
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/back.png')}
            style={{
              tintColor: '#03A9F4',
              width: 30,
              height: 30,
              marginRight: 10,
            }}
          />
        </Pressable>
      ),
    });

    fetchOrderhistoryList();
  }, []);

  function rupiah(number) {
    return `Rp. ${number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
  }

  function renderOrderHistoryList({item, index}) {
    return (
      <View style={styles.card}>
        <View style={styles.text}>
          <View>
            <Text style={styles.heading}>{item.name}</Text>
            <Text style={styles.subHeading}>{rupiah(item.price)}</Text>
          </View>
          <View>
            <Text
              style={[
                styles.status,
                item.status !== 'Delivered' ? {color: '#FFC107'} : {},
              ]}>
              {item.status}
            </Text>
          </View>
        </View>
        {item.status !== 'Delivered' && (
          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator
                  animating={true}
                  size="small"
                  color="white"
                />
              ) : (
                'Mark As Delivered'
              )
            }
            onPress={() => markOrderDelivered(item.id)}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orderHistoryList}
        renderItem={renderOrderHistoryList}
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
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 15,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
  },
  subHeading: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
    marginVertical: 5,
  },
  status: {
    fontSize: 16,
    color: '#008001',
    fontWeight: '500',
    marginVertical: 5,
  },
});

export default OrderHistoryScreen;
