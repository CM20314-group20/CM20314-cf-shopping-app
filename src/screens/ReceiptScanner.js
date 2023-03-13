import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from '../components/CameraButton';
import ChangeScanButton from '../components/ChangeScanButton';
import BarcodeIcon from '../components/BarcodeIcon';
import axios from 'axios';

export default function ReceiptScanner() {
  
  const [update, setUpdate] = useState("")

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [isReceipt, setIsReceipt] = useState(true);

  // const ip = "192.168.1.94";
  const ip = '10.0.2.2' // Android Emulator
  const port = "4000";


  // TODO - post request to send image to backend
  async function postImageToBackend(base64) {
    // Decides where to send image
    let backendLocation = '';
    if (isReceipt){
      backendLocation = '/receiptscanner'
    } else {
      backendLocation = '/barcodescanner'
    }

    const form = new FormData();
    form.append('Image', {
      name: `scanned-receipt`,
      base64: base64,
      type: "image.jpg",
    });
    try {
      // await axios.post('http://127.0.0.1:5000/receiptscanner', {
      await axios.post('http://' + ip + ':' + port + backendLocation, {
        data: form,
      }).then((response) => {
        // Display this data on a new page
        console.log(response.data);
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
        const data = await cameraRef.current.takePictureAsync({base64:true});
        setImage(data.uri);
        // TODO - replace this post to backend in Save image
        // for permission reasons it wont let it work off code
        postImageToBackend(data['base64']);
      } catch(e) {
        console.log(e);
      }
    }
  }

  const saveImage = async() => {
    if (image) {
      try{
        await MediaLibrary.createAssetAsync(image);
        // TODO - send image to backend here
        // postImageToBackend(image);
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
            flex:1
            
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
              //   <Image
              //   style={styles.barcodeTarget}
              //   source={require('../assets/qr-code-scan-9775.svg')}
              //   />
              // :
              // <Text></Text>
              <View style={{flex:10, flexDirection: 'column', justifyContent:'center'}}>
                <BarcodeIcon/>
              </View>
              // <Text></Text>
              :
              <Text></Text>
            }
          <View>
            <CameraButton title={'Scan'} icon="camera" onPress={takePicture}/>
          </View>
        </Camera>
        :
        <ImageBackground source={{uri: image}} style={styles.camera}>
          <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
              flex: 1
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
    flex: 1,
    flexDirection: 'column',
  },
  BottomSeparator: {
    height:90,
  }
});

