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
    VrButton,
} from 'react-360';
import InfoButton from 'InfoButton.react';

const {AudioModule, VideoModule} = NativeModules;

const DATA_BASE = [
  {
    type: 'photo',
    source: asset('homepage.jpg'),
    list: [
      'Band 1',
      'Band 1',
    ]
  },
  // {
  //   type: 'photo',
  //   source: asset('homepage.jpg'),
  //   audio: asset(''),
  //   list: [
  //     'Band 2',
  //     'Band 2',
  //   ]
  // },
  {
    type: 'photo',
    source: asset('homepage.jpg'),
    audio: asset(''),
    list: [
      'Band 3',
      'Band 3',
    ]
  },
// ];

// const DATA_BASE2 = [
  // {
  //   type: 'video',
  //   source: {url: asset('stonesour.mp4').uri},
  //   audio: asset ('stonesour.mp3')
  //   /* If you want to have muliple format of source
  //   and let browser choose the supported one
  //   try the following:
  //   source: [
  //     // Here we provide two format to the source so
  //     // if first format doesn't work, the second one
  //     // will be used.
  //     {url: asset('video360.mp4').uri},
  //     {url: asset('video360.webm').uri},
  //   ],
  //   */
  // },

  {
    type: 'photo',
    source: asset('homepage.jpg'),
    audio: asset(''),
    list: [
      'Band 1',
      'Band 2',
    ]
  },
];
  // {
  //   type: 'video',
  //   source: {url: asset('highlysus.mp4').uri},
  //   audio: asset ('highlysuspect.mp3')
  //   /* If you want to have muliple format of source
  //   and let browser choose the supported one
  //   try the following:
  //   source: [
  //     // Here we provide two format to the source so
  //     // if first format doesn't work, the second one
  //     // will be used.
  //     {url: asset('video360.mp4').uri},
  //     {url: asset('video360.webm').uri},
  //   ],
  //   */
  // },



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
    // const data = DATA_BASE2[nextProps.index];
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
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 4,
    borderRadius: 10,
    height: 60,
    padding: 25,
    margin: 20,
  },
  listText: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    borderColor: 'red',
  },
});

module.exports = ScenePage;