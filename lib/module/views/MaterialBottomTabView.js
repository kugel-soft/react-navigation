function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { SafeAreaProviderCompat } from '@react-navigation/elements';
import { CommonActions, Link, useLinkBuilder, useTheme } from '@react-navigation/native';
import * as React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { BottomNavigation, DarkTheme, DefaultTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Optionally require vector-icons referenced from react-native-paper:
// https://github.com/callstack/react-native-paper/blob/4b26429c49053eaa4c3e0fae208639e01093fa87/src/components/MaterialCommunityIcon.tsx#L14
let MaterialCommunityIcons;

try {
  // Optionally require vector-icons
  MaterialCommunityIcons = require('react-native-vector-icons/MaterialCommunityIcons').default;
} catch (e) {
  let isErrorLogged = false; // Fallback component for icons

  MaterialCommunityIcons = _ref => {
    let {
      name,
      color,
      size,
      selectionColor: _0,
      onLayout: _1,
      ...rest
    } = _ref;

    if (!isErrorLogged) {
      if (!/(Cannot find module|Module not found|Cannot resolve module)/.test(e.message)) {
        console.error(e);
      }

      console.warn(`Tried to use the icon '${name}' in a component from '@react-navigation/material-bottom-tabs', but 'react-native-vector-icons/MaterialCommunityIcons' could not be loaded.`, `To remove this warning, try installing 'react-native-vector-icons' or use another method to specify icon: https://reactnavigation.org/docs/material-bottom-tab-navigator/#tabbaricon.`);
      isErrorLogged = true;
    }

    return (
      /*#__PURE__*/
      // @ts-expect-error: we're passing icon props to text, but we don't care about it since it's just fallback
      React.createElement(Text, _extends({}, rest, {
        style: [styles.icon, {
          color: typeof color !== 'number' ? color : undefined,
          fontSize: size
        }]
      }), "\u25A1")
    );
  };
}

function MaterialBottomTabViewInner(_ref2) {
  let {
    state,
    navigation,
    descriptors,
    ...rest
  } = _ref2;
  const insets = useSafeAreaInsets();
  const {
    dark,
    colors
  } = useTheme();
  const buildLink = useLinkBuilder();
  const theme = React.useMemo(() => {
    const t = dark ? DarkTheme : DefaultTheme;
    return { ...t,
      colors: { ...t.colors,
        ...colors,
        surface: colors.card
      }
    };
  }, [colors, dark]);
  return /*#__PURE__*/React.createElement(BottomNavigation, _extends({}, rest, {
    theme: theme,
    navigationState: state,
    onIndexChange: index => navigation.dispatch({ ...CommonActions.navigate({
        name: state.routes[index].name,
        merge: true
      }),
      target: state.key
    }),
    renderScene: _ref3 => {
      let {
        route
      } = _ref3;
      return descriptors[route.key].render();
    },
    renderTouchable: Platform.OS === 'web' ? _ref4 => {
      let {
        onPress,
        route,
        accessibilityRole: _0,
        borderless: _1,
        centered: _2,
        rippleColor: _3,
        style,
        ...rest
      } = _ref4;
      return /*#__PURE__*/React.createElement(Link, _extends({}, rest, {
        // @ts-expect-error: to could be undefined, but it doesn't affect functionality
        to: buildLink(route.name, route.params),
        accessibilityRole: "link",
        onPress: e => {
          if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && ( // ignore clicks with modifier keys
          e.button == null || e.button === 0) // ignore everything but left clicks
          ) {
            e.preventDefault();
            onPress === null || onPress === void 0 ? void 0 : onPress(e);
          }
        },
        style: [styles.touchable, style]
      }));
    } : undefined,
    renderIcon: _ref5 => {
      let {
        route,
        focused,
        color
      } = _ref5;
      const {
        options
      } = descriptors[route.key];

      if (typeof options.tabBarIcon === 'string') {
        return /*#__PURE__*/React.createElement(MaterialCommunityIcons, {
          name: options.tabBarIcon,
          color: color,
          size: 24,
          style: styles.icon
        });
      }

      if (typeof options.tabBarIcon === 'function') {
        return options.tabBarIcon({
          focused,
          color
        });
      }

      return null;
    },
    getLabelText: _ref6 => {
      let {
        route
      } = _ref6;
      const {
        options
      } = descriptors[route.key];
      return options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
    },
    getColor: _ref7 => {
      let {
        route
      } = _ref7;
      return descriptors[route.key].options.tabBarColor;
    },
    getBadge: _ref8 => {
      let {
        route
      } = _ref8;
      return descriptors[route.key].options.tabBarBadge;
    },
    getAccessibilityLabel: _ref9 => {
      let {
        route
      } = _ref9;
      return descriptors[route.key].options.tabBarAccessibilityLabel;
    },
    getTestID: _ref10 => {
      let {
        route
      } = _ref10;
      return descriptors[route.key].options.tabBarTestID;
    },
    onTabPress: _ref11 => {
      let {
        route,
        preventDefault
      } = _ref11;
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true
      });

      if (event.defaultPrevented) {
        preventDefault();
      }
    } // @ts-ignore (depends on react-native-paper typing which will be altered later)
    ,
    onTabLongPress: _ref12 => {
      let {
        route,
        preventDefault
      } = _ref12;
      const event = navigation.emit({
        type: 'tabLongPress',
        target: route.key,
        // @ts-ignore (depends on react-native-paper typing which will be altered later)
        canPreventDefault: true
      }); // @ts-ignore (depends on react-native-paper typing which will be altered later)

      if (event.defaultPrevented) {
        preventDefault();
      }
    },
    safeAreaInsets: insets
  }));
}

export default function MaterialBottomTabView(props) {
  return /*#__PURE__*/React.createElement(SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(MaterialBottomTabViewInner, props));
}
const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent'
  },
  touchable: {
    display: 'flex',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=MaterialBottomTabView.js.map