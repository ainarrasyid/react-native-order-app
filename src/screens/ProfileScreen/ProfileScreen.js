import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import CustomButton from '../../components/CustomButton';
import {UserContext} from '../../context/UserContext';
import * as ImagePicker from 'react-native-image-picker';

const {width, height} = Dimensions.get('screen');

const ProfileScreen = () => {
  const {userData, signOut} = useContext(UserContext);
  const [photo, setPhoto] = useState(null);

  function handleUploadImage() {
    ImagePicker.launchImageLibrary(
      {maxWidth: 500, maxHeight: 500, mediaType: 'photo', includeBase64: false},
      response => {
        if (response.didCancel) {
          return;
        }
        setPhoto({uri: response.assets[0].uri});
        let formData = new FormData();
        formData.append('id', userData.id);
        formData.append('photo', {
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        });
        fetch(
          'https://neptune.crocodic.net/crocodic-training-api/public/api/v1/user/update-photo',
          {
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
          },
        )
          .then(res => res.json())
          .then(result => {
            if (result.status === 200) {
              setPhoto({uri: result.photo});
              console.log(result.photo);
            }
          });
      },
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={photo === null ? {uri: userData.photo} : {uri: photo.uri}}
          style={styles.image}
        />
        <CustomButton
          text="Upload Photo"
          bgColor="#0288D1"
          onPress={handleUploadImage}
        />
        <CustomButton text="Logout" bgColor="red" onPress={signOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: height * 0.25,
    height: height * 0.25,
    borderRadius: height / 3 / 2,
    borderWidth: 5,
    borderColor: 'grey',
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
});

export default ProfileScreen;
