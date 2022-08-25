import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import ApiCall from '../utiles';
import {getShadow} from '../utiles';

const RenderCard = props => {
  const {data, navigation} = props;

  const {id, email, website, phone, username, address, company} = data || {};
  const {name} = company || {};
  const {city, street, suite, zipcode} = address || {};
  const companyAddress = city + ', ' + street + ', ' + suite + ', ' + zipcode;

  const navToAlbum = () => {
    navigation.navigate('User Album', {userId: id});
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={navToAlbum}>
      <Text style={styles.companyName}>{name}</Text>
      <View style={styles.userInfo}>
        <Text>{username}</Text>
        <Text>{phone}</Text>
      </View>
      <View style={styles.userContainer}>
        <Text>{email}</Text>
        <Text>{website}</Text>
      </View>
      <View>
        <Text numberOfLines={1} style={styles.address}>
          {companyAddress}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function Home(props) {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await ApiCall({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET',
    });
    setData(response);
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log('-------->');

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        extraData={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <RenderCard {...props} index={index} data={item} />
        )}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  cardContainer: {
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#fff',
    ...getShadow(1),
    borderRadius: 5,
  },
  companyName: {
    color: '#000',
    fontWeight: '700',
    margin: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 5,
  },
  address: {
    marginTop: 5,
    margin: 5,
    paddingBottom: 5,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
