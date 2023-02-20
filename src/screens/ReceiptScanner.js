import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from '../components/CameraButton';

export default function BarcodeScanner() {
  
  const [update, setUpdate] = useState("")

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status== 'granted');
    })();

  }, [])

  const takePicture = async () => {
    if(cameraRef) {
      try{
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch(e) {
        console.log(e);
      }
    }
  }

  const saveImage = async() => {
    if(image) {
      try{
        await MediaLibrary.createAssetAsync(image);
        alert('Picture Save!')
        setImage(null);
      } catch(e) {
        console.log(e)
      }
    }
  }

  if(hasCameraPermission === false) {
    return <Text> No access to camera</Text>
  }

  const BottomSeparator = () => <View style={styles.BottomSeparator} />;
  
  return (
    <>
    <View style={styles.container}>
      {!image ?
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 30,
            
          }}>
            <CameraButton icon={'retweet'} onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back)
            }}/>
            <CameraButton icon={'flash'}
            color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
            onPress={() => {
              setFlash(flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : Camera.Constants.FlashMode.off)}}/>
          </View>
          <View style={{
            flex:1,
          }}>
          </View>
          <CameraButton title={'Scan'} icon="camera" onPress={takePicture}/>
        </Camera>
        :
        <ImageBackground source={{uri: image}} style={styles.camera}>
          <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}>
              <CameraButton title={'Re-take'} icon="retweet" onPress={() => setImage(null)}/>
              <CameraButton title={"Save"} icon="check" onPress={saveImage}/>
            </View>
        </ImageBackground>
      }
      <BottomSeparator/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    
  },
  camera: {
    flex: 1
  },
  BottomSeparator: {
    height:90,
  }
});

