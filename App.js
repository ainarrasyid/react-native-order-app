import React, {useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ErrorContext} from './src/context/ErrorContext';
import {UserContext} from './src/context/UserContext';
import Navigation from './src/navigation';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const errorContext = useMemo(() => ({error, setError}), [error]);
  const userContext = useMemo(() => ({
    signIn: data => {
      setUserData(data);
      setError(null);
    },
    signOut: () => {
      setUserData(null);
      setError(null);
    },
    userData: userData,
  }));
  return (
    <SafeAreaView style={styles.root}>
      <UserContext.Provider value={userContext}>
        <ErrorContext.Provider value={errorContext}>
          <Navigation />
        </ErrorContext.Provider>
      </UserContext.Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});

export default App;
