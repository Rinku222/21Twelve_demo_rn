import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import ApiCall, {getShadow} from '../utiles';

// const handleLinking = () => {
//   console.log('-------->handle linking');
// };

const openUrl = url => Linking.openURL(url);

const RenderPhotos = props => {
  const {data} = props;
  const {thumbnailUrl, url, title} = data || {};

  const titleText = title?.slice(0, 30);

  return (
    <View style={styles.renderContainer}>
      <Image source={{uri: thumbnailUrl}} style={styles.image} />
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text style={styles.text}>Title:</Text>
          <Text numberOfLines={2}>{titleText}</Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.text}>Url:</Text>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => openUrl(url)}>
            <Text style={styles.urlText} numberOfLines={1}>
              {url}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function Photos(props) {
  const {route} = props;
  const {userId} = route?.params;

  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await ApiCall({
      url: 'https://jsonplaceholder.typicode.com/photos',
      method: 'GET',
    });
    setData(response);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = data?.filter(s => s.albumId === userId);

  return (
    <View>
      <FlatList
        data={filteredData}
        extraData={filteredData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <RenderPhotos {...props} index={index} data={item} />
        )}
      />
    </View>
  );
}

export default Photos;

const styles = StyleSheet.create({
  image: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    borderRadius: 5,
  },
  renderContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    ...getShadow(1),
    margin: 10,
    borderRadius: 5,
    padding: 7,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  text: {
    color: '#000',
    fontWeight: '700',
    marginRight: 5,
  },
  titleContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlText: {
    flex: 1,
    flexGrow: 1,
  },
  touchableOpacity: {
    flex: 1,
  },
});
