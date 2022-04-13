import { SearchBar } from 'react-native-elements';
import { View, StyleSheet, Image } from 'react-native';

import React from 'react';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParameterList } from '../../MainNavigator';

import Animated, { Easing } from 'react-native-reanimated';

const { Value, timing } = Animated

/* _onfocus = () => {

} */
const width = layout.SCREEN_WIDTH;
const height = layout.SCREEN_HEIGHT;

export default class App extends React.Component {
  /*  state = {
     search: '',
   }; */

  /* updateSearch = (search) => {
    this.setState({ search });
  }; */
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
      keyword: ''
    }
    //animationValue

    this.inputBoxTranslateX = new Value(width)
    this.backButton = new Value(0)
    this.contentBoxTranslateY = new Value(height)
    this.contentOpacity = new Value(0)
  }
  render() {
    const { search } = this.state;

    return (
      <View>

        <SearchBar

          placeholder="Tìm kiếm sản phẩm, tin bán,..."
          onChangeText={this.updateSearch}
          value={search}
          rounded
          containerStyle={{
            backgroundColor: color.themeBackground,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
          inputStyle={{ backgroundColor: color.white, borderRadius: 10, }}
          inputContainerStyle={{ backgroundColor: color.white, borderRadius: 10, }}
          leftIconContainerStyle={{ backgroundColor: color.white }}

        />
      </View>
    );
  }
}