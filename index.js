import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  asset,
  Environment,
  VrButton,
} from 'react-360';
import InfoButton from 'InfoButton.react';
import ScenePage from 'ScenePage.react';

// referencing an asset from 'static_assets' directory
const INFO_BUTTON_IMAGE = asset('info_icon.png');
const SCENE_COUNT = 3;
const SCENE_COUNT2 = 3;

// The root react component of the app
export default class BasicAppTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  _onClick = (index) => {
    this.setState({index: index});
  };

  render() {

    // Loop that was providing the genres based on index
    // const sceneButtons = [];
    // for (const i = 1; i < SCENE_COUNT; i++) {
    //   sceneButtons.push(
    //     <InfoButton
    //       key={i}
    //       style={styles.button}
    //       source={INFO_BUTTON_IMAGE}
    //       text={`Genre ${i}`}
    //       onClick={() => { this._onClick(i); }}
    //     />
    //     )
    // }

    const sceneButtons = [];
    // for (const i = 1; i < SCENE_COUNT; i++) {
      sceneButtons.push(
        <InfoButton
          style={styles.button}
          text={`Genre Rock`}
          onClick={() => { this._onClick(i); } }
        />
      )

      sceneButtons.push(
        <InfoButton
          style={styles.button}
          text={`Genre EDM`}
          onClick={() => { this._onClick(i); } }
        />
      )
    // }


    const sceneButtons2 = [];
    for (const x = 0; x < SCENE_COUNT2; x++) {
      sceneButtons2.push(
        <InfoButton
          key={x}
          style={styles.button}
          source={INFO_BUTTON_IMAGE}
          text={`Genre ${x}`}
          onClick={() => { this._onClick(x); }}
        />)
    }

    //VIEWS
    return (
      // Panel Box
      <View style={styles.panel}>

      {/* Greeting box */}
        <View>
        <Text style={styles.hellobox}>
        Click One of The Genres Below
        </Text>
        </View>

      {/* Genre Buttons row 1 */}
        <View style={styles.section}>  
          {sceneButtons}
        </View>

      {/* Genre Buttons row 2 */}
        <View style={styles.section}>  
          {sceneButtons2}
        </View> 

        

        
        <View style={styles.scenePage}>
          <ScenePage
            index={this.state.index} />
        </View>
      </View>
    );
  }
};

// defining StyleSheet
const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  section: {
    padding: 5,
    width: 750,
    backgroundColor: 'black',
    borderColor: 'red',
    borderWidth: 2,
    marginBottom: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
    borderColor: 'red',
  },
  scenePage: {
    padding: 5,
    width: 600,
    height: 300,
    backgroundColor: 'black',
    borderColor: 'red',
    borderRadius: 5,
  },
  hellobox: {
    fontSize: 60,
    fontWeight: '800',
    // lineHeight: 500,
    color: 'black',
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

// register the root component
// this will be used from client.js by r360.createRoot('BasicAppTemplate' ...)
AppRegistry.registerComponent('BasicAppTemplate', () => BasicAppTemplate);