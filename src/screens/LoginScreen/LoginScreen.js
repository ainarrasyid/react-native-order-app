import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {ErrorContext} from '../../context/ErrorContext';
import {UserContext} from '../../context/UserContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(UserContext);
  const {error, setError} = useContext(ErrorContext);

  const onLoginButtonPressed = async () => {
    setError(null);
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const res = await fetch(
      'https://neptune.crocodic.net/crocodic-training-api/public/api/v1/login',
      {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      },
    );
    const result = await res.json();
    if (result.status === 200) {
      signIn(result.data);
    } else {
      setError(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Order</Text>
      {error && (
        <Text style={{color: 'red', marginVertical: 5}}>{error.message}</Text>
      )}
      <CustomInput
        placeholder="username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput
        placeholder="password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />
      <CustomButton text="Login" onPress={onLoginButtonPressed} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
});

export default LoginScreen;
