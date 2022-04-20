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

                searchIcon={{
                    name: 'search',
                    type: 'feather',
                    color: color.borderColor,
                    size: 30
                }}
                placeholder="Tìm kiếm sản phẩm, tin mua,..."
                onChangeText={this.updateSearch}
                value={search}
                rounded
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                }}
                inputStyle={{ backgroundColor: color.underBackground, borderRadius: 10, }}
                inputContainerStyle={{ backgroundColor: color.underBackground, borderRadius: 10, }}
                leftIconContainerStyle={{ backgroundColor: color.underBackground }}
            />
        );
    }
}