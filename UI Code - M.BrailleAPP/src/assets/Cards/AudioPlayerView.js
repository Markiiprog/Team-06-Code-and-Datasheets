import React from 'react';
import { View, Text, Platform, TouchableOpacity, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';

const AudioPlayerView = ({
  active,
  playable,
  loading,
  isPlaying,
  playAudio,
  pauseAudio,
  totalDuration,
  seekAudio,
  duration,
}) => {
  const handleIconClick = () => {
    if (!loading) {
      if (!isPlaying) {
        playAudio();
      } else {
        pauseAudio();
      }
    }
  };

  const formattedTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0'); // Add leading zero if necessary
    const formattedSeconds = String(seconds).padStart(2, '0'); // Add leading zero if necessary
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
      {!playable ? (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <Text style={{ fontSize: 14, color: '#ffffff' }}>Audio not playable</Text>
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={handleIconClick} disabled={loading} style={{ padding: 5 }}>
          <MaterialIcons name={isPlaying ? 'pause' : 'play-arrow'} size={24} color={loading ? '#cccccc' : '#007bff'} />
        </TouchableOpacity>
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={totalDuration}
          value={duration}
          minimumTrackTintColor="#007bff"
          maximumTrackTintColor="#cccccc"
          thumbTintColor="#007bff"
          onSlidingComplete={seekAudio}
          disabled={loading}
        />
        <Text style={{ marginLeft: 10, color: active ? '#007bff' : '#cccccc' }}>{formattedTime(totalDuration - duration)}</Text>
      </View>
      {loading && <ActivityIndicator color="#007bff" />}
    </View>
  );
};

export default AudioPlayerView;
