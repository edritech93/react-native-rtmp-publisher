import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  AccentButton,
  PrimaryButton,
  SecondaryButton,
} from './components/Buttons';
import { CardView } from './components/Card';
import { Text } from './components/Text';
import RTMPPublisher, { StreamState } from 'react-native-rtmp-streaming';
import {
  getPermissionCamera,
  getPermissionMicrophone,
} from './libs/permission';
import { moderateScale } from './libs/scaling';

const DATA_STREAM = {
  URL_STREAM: 'rtmp://demo.flashphoner.com:1935/live/',
  STREAM_KEY: '123qwe',
  // URL_STREAM: 'rtmp://a.rtmp.youtube.com/live2',
  // STREAM_KEY: 'stream_key_here',
};

export default function Home(props) {
  const [isCamera, setIsCamera] = useState(false);
  const [isStream, setIsStream] = useState(false);
  const [statusStream, setStatusStream] = useState(StreamState.DISCONNECTED);
  const publisherRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      _loadPermissionCamera();
    }, 1000);
  }, []);

  async function _loadPermissionCamera() {
    await getPermissionCamera();
    await getPermissionMicrophone();
    setIsCamera(true);
  }

  useEffect(() => {
    async function _isStreaming() {
      const isActive = await publisherRef.current
        .isStreaming()
        .catch(() => false);
      setIsStream(isActive);
    }
    if (isCamera) {
      _isStreaming();
    }
  }, [isCamera]);

  const _onStartStream = async () => {
    setIsStream(true);
    await publisherRef.current.startStream();
  };

  const _onStopStream = async () => {
    setIsStream(false);
    await publisherRef.current.stopStream();
  };

  const _onSwitchCamera = async () => {
    await publisherRef.current.switchCamera();
  };

  return (
    <View style={styles.container}>
      {isCamera && (
        <RTMPPublisher
          ref={publisherRef}
          streamURL={DATA_STREAM.URL_STREAM}
          streamName={DATA_STREAM.STREAM_KEY}
          onStreamStateChanged={(state) => setStatusStream(state)}
          style={styles.wrapCamera}
        />
      )}
      <CardView style={styles.wrapAction}>
        <Text style={styles.textTitle}>{'Testing Stream RTMP'}</Text>
        <Text style={styles.textStatus}>{`Status: ${statusStream}`}</Text>
        <View style={styles.wrapButton}>
          <PrimaryButton
            title={'Start'}
            disabled={isStream}
            onPress={_onStartStream}
            style={styles.btnStart}
          />
          <SecondaryButton
            title={'Stop'}
            disabled={!isStream}
            onPress={_onStopStream}
            style={styles.btnStart}
          />
          <AccentButton title={'Switch Camera'} onPress={_onSwitchCamera} />
        </View>
      </CardView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  wrapCamera: {
    flex: 1,
    backgroundColor: 'red',
  },
  wrapAction: {
    position: 'absolute',
    left: moderateScale(16),
    right: moderateScale(16),
    bottom: moderateScale(16),
    padding: moderateScale(16),
  },
  textTitle: {
    marginBottom: moderateScale(4),
  },
  wrapButton: {
    flexDirection: 'row',
  },
  textStatus: {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    marginBottom: moderateScale(8),
  },
  btnStart: {
    marginRight: 16,
  },
});
