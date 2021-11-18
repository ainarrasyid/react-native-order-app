import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {UserContext} from '../../context/UserContext';

const {height, width} = Dimensions.get('screen');

const OrderDetailScreen = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const details = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: details.name,
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
  });

  const {userData} = useContext(UserContext);

  const onButtonOrderPressed = async () => {
    setLoading(true);
    let formData = new FormData();
    formData.append('users_id', userData.id);
    formData.append('foods_id', details.id);
    fetch(
      'https://neptune.crocodic.net/crocodic-training-api/public/api/v1/orders/create',
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
        console.log(result);
        if (result.status === 200) {
          setLoading(false);
          navigation.navigate('History');
        }
      });
  };

  const createOrder = async () => {};

  return (
    <View style={styles.container}>
      <ScrollView
        style={{marginBottom: height * 0.11}}
        showsVerticalScrollIndicator={false}>
        <Image source={{uri: details.photo}} style={styles.image} />
        <Text style={styles.description}>{details.description}</Text>
      </ScrollView>
      <View style={styles.bottomBar}>
        <Text style={styles.price}>{details.price}</Text>
        <CustomButton
          text={
            isLoading ? (
              <ActivityIndicator animating={true} size="small" color="white" />
            ) : (
              'Order'
            )
          }
          onPress={onButtonOrderPressed}
          type="ROUNDED"
          width={width * 0.3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    height: height * 0.5,
    width: height * 0.5,
    borderRadius: 10,
    marginVertical: 20,
  },
  description: {
    textAlign: 'justify',
    fontSize: 18,
    color: '#212121',
  },
  bottomBar: {
    position: 'absolute',
    height: height * 0.1,
    width: width,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    bottom: 0,
    elevation: 10,
  },
  price: {
    fontSize: 18,
    color: '#008001',
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;
