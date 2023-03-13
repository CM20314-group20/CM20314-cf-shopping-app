import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import { StyleSheet, Text, View, ImageBackground, Image, PermissionsAndroid, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from '../components/CameraButton';
import ChangeScanButton from '../components/ChangeScanButton';
import { justifyContent } from 'react-native-wind/dist/styles/flex/justify-content';
import ImagePicker from 'react-native-image-picker';

export default function ReceiptScanner() {
  
  const [update, setUpdate] = useState("")

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [wholeImage, setWholeImage] = useState(null);
  // const [imageBlob, setImageBlob] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isReceipt, setIsReceipt] = useState(true);
  const cameraRef = useRef(null);

  let urlIP = 'http://10.0.2.2:5000' // Android Emulator
  // let urlIP = 'http://127.0.0.1:5000' // IOS Emulator

  // async function getImageBlob(imageUri) {
  //   let response = await fetch(imageUri);
  //   let blob = await response.blob();
  //   return blob;
  // }

  // async function requestStoragePermission() {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission Required',
  //           message: 'This app needs access to your storage to select photos'
  //         }
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Storage permission granted');
  //         return true;
  //       } else {
  //         console.log('Storage permission denied');
  //         return false;
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   } else {
  //     // On iOS, permissions are granted at installation time
  //     return true;
  //   }
  // }

  // TODO - post request to send image to backend
  async function postImageToBackend() {

    fetch(image, (response) => {
      console.log('here');
      console.log(response);
    })
    console.log('here');

    const formData = new FormData();
        formData.append('image', {
          uri: wholeImage.uri,
          type: 'jpg',
          name: wholeImage.fileName,
        });

        let url = urlIP.concat('/receiptscanner');

        fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => response.json())
        .then((result) => {
          // console.log('here');
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        })


    // console.log(image);

    // let blob = await getImageBlob(image);
    // console.log(blob);

    // let formData = new FormData();
    // formData.append('image', {
    //   blob: blob,
    //   uri: image,
    //   type: 'image/jpeg',
    //   name: `scanned-receipt.jpg`
    // });
    // await axios.post(url, image)
    // .then((response) =>{
    //   console.log(response.data);
    // })
    // await axios.post(url, {
    //   data: formData,
    //   })
    // .catch((err) => {
    //   console.log(err.stack);
    // })
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
        setWholeImage(data);
        setImage(data.uri);
      } catch(e) {
        console.log(e);
      }
    }
  }

  const saveImage = async() => {
    if(wholeImage) {
      try{
        await MediaLibrary.createAssetAsync(image);
        // TODO - send image to backend
        // postImageToBackend(image);
        postImageToBackend();
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

