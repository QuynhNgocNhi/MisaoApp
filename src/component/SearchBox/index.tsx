

import React, { useState } from "react";
import { Image, View, Text, TextInput, StyleSheet } from "react-native";

import TextButton from "../Button";
const popular = ["thing 1", "another thing", "third popular thing"];
const SearchBox = ({

    placeholder = "Search...",
    placeholderTextColor = "#999",

}) => {
    const [searchText, setSearchText] = React.useState("");
    const [hasFocus, setHasFocus] = React.useState(false);
    const searchRef = React.useRef();
    function handleSearch() {
        console.log("user hit enter, search with: ", searchText);
    }
    function handleSearchFocus() {
        console.log("grow me");
        setHasFocus(true);
        renderSearchOptions();
    }
    function cancelSearchFocus() {
        console.log("canceling focus");
        searchRef?.current?.blur();
        setSearchText("");
        setHasFocus(false);
    }
    function renderSearchOptions() {
        return (
            <View style={{ flex: 1, height: "100%", padding: 5 }}>
                <Text style={{ color: 'white' }}>
                    Recent Searches
                </Text>
                {popular.map((item) => (
                    <View key={item} style={{ flexDirection: "row" }}>

                        <Text
                            style={{ color: '#fff', margin: 5, }}
                        >
                            {item}
                        </Text>
                    </View>
                ))}
            </View>
        );
    }
    return (
        <View
            style={{

                flex: 1,
                height: "100%",
            }}
        >

            <View style={{ flex: 1 }}>
                <View
                    style={{
                        alignItems: "center",
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        //height: 50,
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        marginTop: 85,
                        marginHorizontal: 5,
                        padding: 5,
                    }}
                >

                    <TextInput

                        onFocus={handleSearchFocus}
                        onSubmitEditing={handleSearch}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}

                        value={searchText}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            borderWidth: hasFocus ? 2 : 1,
                            borderColor: hasFocus ? '#000' : '#fff',
                            borderRadius: 12 / 2,
                            marginHorizontal: 5,
                            padding: 2,

                        }}
                    />
                    <TextButton

                        buttonStyle={styles.customButton}
                        title={'cancel'.toUpperCase()}

                        onPress={() => cancelSearchFocus()}
                    />
                </View>
                {hasFocus && renderSearchOptions()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    SearchBox: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000000'
    },
    customButton: {
        width: '20%',
        borderRadius: 5
    },

});
export default SearchBox;