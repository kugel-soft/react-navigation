"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MaterialBottomTabView;

var _elements = require("@react-navigation/elements");

var _native = require("@react-navigation/native");

var React = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativePaper = require("react-native-paper");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
      React.createElement(_reactNative.Text, _extends({}, rest, {
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
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    dark,
    colors
  } = (0, _native.useTheme)();
  const buildLink = (0, _native.useLinkBuilder)();
  const theme = React.useMemo(() => {
    const t = dark ? _reactNativePaper.DarkTheme : _reactNativePaper.DefaultTheme;
    return { ...t,
      colors: { ...t.colors,
        ...colors,
        surface: colors.card
      }
    };
  }, [colors, dark]);
  return /*#__PURE__*/React.createElement(_reactNativePaper.BottomNavigation, _extends({}, rest, {
    theme: theme,
    navigationState: state,
    onIndexChange: index => navigation.dispatch({ ..._native.CommonActions.navigate({
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
    renderTouchable: _reactNative.Platform.OS === 'web' ? _ref4 => {
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
      return /*#__PURE__*/React.createElement(_native.Link, _extends({}, rest, {
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

function MaterialBottomTabView(props) {
  return /*#__PURE__*/React.createElement(_elements.SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(MaterialBottomTabViewInner, props));
}

const styles = _reactNative.StyleSheet.create({
  icon: {
    backgroundColor: 'transparent'
  },
  touchable: {
    display: 'flex',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=MaterialBottomTabView.js.map