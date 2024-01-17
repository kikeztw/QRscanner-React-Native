import React, {useEffect, useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {
  useCameraPermission,
  Camera,
  useCodeScanner,
  useCameraDevice,
} from 'react-native-vision-camera';

function App(): React.JSX.Element {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const [response, setResponse] = useState('');
  // const {hasPermission, requestPermission} = useCameraPermission();
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      setResponse(JSON.stringify(codes, null, 2));
    },
  });

  useEffect(() => {
    console.log('hasPermission', hasPermission);
    if (!hasPermission) {
      requestPermission();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  if (device == null) {
    return <Text>No camera error</Text>;
  }

  return (
    <ScrollView style={{flex: 1}}>
      <Camera
        style={{width: '100%', height: 300}}
        isActive={true}
        device={device}
        codeScanner={codeScanner}
        onError={error => console.log('error', error)}
        exposure={0}
      />
      <Text>{response}</Text>
    </ScrollView>
  );
}

export default App;
