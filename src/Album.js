import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import ApiCall from '../utiles';
import folder from './assets/images/folder.png';

const RenderFiles = props => {
  const {data, navigation} = props;

  const title = data?.title?.slice(0, 20);

  const navToPhotos = () => {
    navigation.navigate('User Photos', {userId: data?.id});
  };

  return (
    <TouchableOpacity style={styles.renderContainer} onPress={navToPhotos}>
      <View style={styles.imageContainer}>
        <Image source={folder} style={styles.image} />
      </View>
      <Text numberOfLines={2} style={styles.text}>
        {title?.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

function Album(props) {
  const {route} = props;
  const {userId} = route?.params;

  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await ApiCall({
      url: 'https://jsonplaceholder.typicode.com/albums',
      method: 'GET',
    });
    setData(response);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = data?.filter(s => s.userId === userId);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        extraData={filteredData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <RenderFiles {...props} index={index} data={item} />
        )}
      />
    </View>
  );
}

export default Album;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: 10,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  renderContainer: {
    flexGrow: 1,
    padding: 10,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
  },
  image: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  text: {
    flex: 1,
    margin: 4,
    color: '#000',
    textAlign: 'center',
  },
});
