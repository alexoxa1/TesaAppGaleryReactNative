/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const API_KEY = "2-k9G8Kjra3dc6o2BzuKcy9zt00hgXHKeTYKsM7D39U";
const API_URL = "https://api.unsplash.com/photos/?page=1&per_page=10&client_id=2-k9G8Kjra3dc6o2BzuKcy9zt00hgXHKeTYKsM7D39U#";
const IMAGE_SIZE = 80;
const SPACING = 10;


  const fetchImagesFromUnsplash = async () => {
    const data = await fetch(API_URL, {
    headers: {
            'Authorization': API_KEY,
        }
    })

    const  results  = await data.json();
    return results;
  }

  export default () => {
    const [images, setImages] = React.useState(null);
    React.useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchImagesFromUnsplash();

            setImages(images);

        }

        fetchImages();
    }, []);

    const topRef = React.useRef();
    const thumbRef = React.useRef();
    const [activeIndex, setActiveIndex] = React.useState(0);

    const scrollToActiveIndex = (index) => {
      setActiveIndex(index);
      topRef?.current?.scrollToOffset({
        offset: index * width,
        animated: true,
      })
    }

    if (!images) {
        return <Text>Loading...</Text>;
    }


   return (
       <View style={styles.container}>
          <FlatList
            ref={topRef}
            data={images}
            keyExtractor={item => item.id}
            horizontal
            scrollEnabled={false}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={ev => {
              scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
            }}
            renderItem={({ item }) => {
              return <View style={{width, height}}>
              <Image 
                  source={{uri: item.urls.regular}}
                   style={[StyleSheet.absoluteFillObject]}
          />

          </View>
            }}
            />
            <FlatList
            ref={thumbRef}
            data={images}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{position: 'absolute', bottom: IMAGE_SIZE }}
            contentContainerStyle={{paddingHorizontal: SPACING}}
            renderItem={({item, index}) => {
              return <TouchableOpacity
                onPress={() => scrollToActiveIndex(index)}
              
              >
                  <Image 
                    source={{uri: item.urls.regular}}
                    style={{
                      width: IMAGE_SIZE,
                      height: IMAGE_SIZE,
                      borderRadius: 12,
                      marginRight: SPACING,
                      borderWidth: 2,
                      borderColor: activeIndex === index ? '#fff' : 'transparent',
                    }}
            />
            <Text style={{ color: "white",  width: "75%", fontWeight: 'bold', backgroundColor: "linear-gradient(270deg, rgba(2,0,36,1) 0%, rgba(205,172,210,0.1407913507199755) 35%, rgba(0,212,255,1) 100%)" }}>{item.user.name}</Text>
              </TouchableOpacity>
            }}
            />
      </View>
   );
   
 };



 //Styles parameters

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  imageSize: {
    width: "50%",
    height: "50%",
  },
  textButton: {
    width: "25%",
    backgroundColor: "transparent",
  }
});