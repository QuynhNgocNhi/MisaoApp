import { SearchBar } from 'react-native-elements';
import React from 'react';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';


export default class App extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
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
    );
  }
}