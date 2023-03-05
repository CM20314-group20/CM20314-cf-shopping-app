import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from '../components/CameraButton';
import ChangeScanButton from '../components/ChangeScanButton';
import { justifyContent } from 'react-native-wind/dist/styles/flex/justify-content';

export default function ReceiptScanner() {
  
  const [update, setUpdate] = useState("")

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isReceipt, setIsReceipt] = useState(true);
  const cameraRef = useRef(null);

  let urlIP = 'http://10.0.2.2:5000' // Android Emulator
  // let urlIP = 'http://127.0.0.1:5000' // IOS Emulator

  // TODO - post request to send image to backend
  async function postImageToBackend(image) {
    let formData = new FormData();
    formData.append(image, {
      name: `scanned-receipt`

    });
    try {
      url = urlIP.concat('/receiptscanner');
      await axios.post(url, {
        data: formData,
      })
    }
    catch(err) {
      console.log(err);
    }
  }

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
        // TODO - send image to backend
        postImageToBackend(image);
        alert('Scanning')
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

            {isReceipt ? 
              <ChangeScanButton title={'Barcode Scanner'} onPress={() => {
                setIsReceipt(false);
              }}/>
            :
              <ChangeScanButton title={'Receipt Scanner'} onPress={() => {
                setIsReceipt(true);
              }}/>
            }
            
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
          {!isReceipt ?
                <Image
                style={styles.barcodeTarget}
                source={require('../assets/icons8-barcode-64.png')}
                />
              :
              <Text></Text>
            }
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
  barcodeTarget: {
    width:'70%',
    paddingBottom: '70%',
    marginBottom: '30%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    
  },
  camera: {
    flex: 1,
    alignItems: 'center',
  },
  BottomSeparator: {
    height:90,
  }
});

