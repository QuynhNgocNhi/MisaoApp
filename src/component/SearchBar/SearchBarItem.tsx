import { SearchBar } from 'react-native-elements';
import React from 'react';
// import color, layout, style
import color from '../../theme/color';
import layout from '../../theme/layout';


export const SearchBarItem = ({keyword, setKeyword, onSearch} : any) =>  {
    
        return (
            <SearchBar
                onSubmitEditing={onSearch}
                searchIcon={{
                    name: 'search',
                    type: 'feather',
                    color: color.borderColor,
                    size: 30
                }}
                placeholder="Tìm kiếm sản phẩm, tin mua,..."
                onChangeText={(value : any) => setKeyword(value)}
                value={keyword}
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