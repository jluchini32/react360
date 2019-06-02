/**
 * @providesModule ScenePage.react
 */
'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  NativeModules,
  Environment,
} from 'react-360';
import InfoButton from 'InfoButton.react';

const {AudioModule, VideoModule} = NativeModules;

const DATA_BASE = [
  {
    type: 'photo',
    source: asset('homepage.jpg'),
    list: [
      'Bicycle',
      'Skateboard',
      'Scooter',
    ]
  },
  {
    type: 'photo',
    source: asset('ocean.jpg'),
    audio: asset('cafe.wav'),
    list: [
      'Towel',
      'Umbrella',
    ]
  },
  {
    type: 'video',
    source: {url: asset('highlysuspect.mp4').uri},
    audio: asset ('highlysuspect.mp3')
    /* If you want to have muliple format of source
    and let browser choose the supported one
    try the following:
    source: [
      // Here we provide two format to the source so
      // if first format doesn't work, the second one
      // will be used.
      {url: asset('video360.mp4').uri},
      {url: asset('video360.webm').uri},
    ],
    */
  },
];











class ScenePage extends React.Component {
  static defaultProps = {
    index: 0,
  };

  componentWillMount() {
    // create a play to play video
    VideoModule.createPlayer('myplayer');
    this._setData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this._setData(nextProps);
    }
  }

  _setData(nextProps) {
    const data = DATA_BASE[nextProps.index];
    if (data.type == 'photo') {
      // display background 360 photo
      Environment.setBackgroundImage(data.source, {format: '2D'});
    } else {
      // play background 360 video
      // Two steps:
      // 1. play video on the player
      // 2. set enviroment to the player
      VideoModule.play('myplayer', {
        source: data.source,
        // un-muted won't work with Android right now
        // will be solved later
        // muted: false,
      });
      Environment.setBackgroundVideo('myplayer');
    }
    if (data.audio) {
      // play an environmental audio
      AudioModule.playEnvironmental({
        source: data.audio,
        volume: 0.5,
      });
    } else {
      AudioModule.stopEnvironmental();
    }

    this.setState({data: data});
  }

  render() {
    const data = this.state.data;
    const list = [];
    for (const i = 0; i < data.list.length; i++) {
      list.push(
        <View
          key={i}
          style={styles.listView}>
          <Text style={styles.listText}>
            {data.list[i]}
          </Text>
        </View>);
    }
    return (
      <View style={styles.container}>
        {list}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 10,
    height: 60,
    padding: 20,
    margin: 20,
  },
  listText: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
  },
});

module.exports = ScenePage;