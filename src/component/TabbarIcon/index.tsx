
// import dependencies
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import colors
import Colors from '../../theme/color';

// TabBadgeIcon Config

// TabBadgeIcon Styles
const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.important,
  },
  badgeText: {
    top: -0.5,
    fontSize: 10,
    color: Colors.onPrimaryColor,
  },

  AddItem: {

    height: 90,

  }
});

// TabBadgeIcon
const TabBadgeIcon = ({ badgeCount, color, focused, name, size, style }) => (
  <View>
    {name === 'plus-box' ? (


      <Icon name={name} size={size} color={color} style={styles.AddItem} />

    ) : (<Icon name={name} size={size} color={color} style={style} />)}

    {badgeCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badgeCount}</Text>
      </View>
    )}
  </View>
);

export default TabBadgeIcon;
