/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export const App = () => {
  const [usersArray, setUsersArray] = useState([]);
  const [posts, setPosts] = useState([]);
  const [matchedDetails, setMatchedDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    findMatches();
  }, [posts]);


  const fetchUsers = () => {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(jsonUserResponse => {
      setUsersArray(jsonUserResponse);
      fetchPosts();
    })
    .catch(error => console.error(error));
  };

  const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(jsonPostResponse => {
      setPosts(jsonPostResponse);
    })
    .catch(error => console.error(error));
  };

  const findMatches = () => {
    let matched = [];
    usersArray.map(user => {
      let post = posts.find(post => post.id === user.id);

      let match = {
        companyName: user?.company?.name || '',
        lat: user?.address?.geo?.lat || '',
        lng: user?.address?.geo?.lng || '',
        title: post?.title || '',
        body: post?.body || '',
      };

      matched.push(match);
    });

    setMatchedDetails(matched);
    setLoading(false);
  }

  const renderMatchItem = ({ item }) => {
    return (
      <View style={styles.itemCard}>
        <Text style={styles.textKey}>
          title: 
          <Text style={styles.textValue}>{` ${item.title}`}</Text>
        </Text>
        <Text style={styles.textKey}>
          title: 
          <Text style={styles.textValue}>{` ${item.body}`}</Text>
        </Text>
                <Text style={styles.textKey}>
          title: 
          <Text style={styles.textValue}>{` ${item.companyName}`}</Text>
        </Text>
                <Text style={styles.textKey}>
          title: 
          <Text style={styles.textValue}>{` ${item.lat}`}</Text>
        </Text>
                <Text style={styles.textKey}>
          title: 
          <Text style={styles.textValue}>{` ${item.lng}`}</Text>
        </Text>
      </View>
    );
  };

  return (
      <View style={styles.container}>
        {
          loading ? (
              <Text>Loading...</Text>
            ) : (
            <FlatList 
              data={matchedDetails}
              renderItem={renderMatchItem}
              keyExtractor={item => `${item.title}`} 
            />
          )
        }
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingTop: '10%',
    paddingBottom: '5%',
  },
  itemCard: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  textKey: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textValue: {
    fontWeight: 'normal',
  },
});

