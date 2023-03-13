import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = (props) => (
  <View style={props.style}>
    <Svg width="100%" height="100%" viewBox="0 0 256 256" {...props}>
      <Path
        d="M80.852 81.852H61.785c-.553 0-1-.447-1-1s.447-1 1-1h18.066V61.785c0-.553.447-1 1-1s1 .447 1 1v19.066c0 .552-.448 1-1 1z"
        fill="#fff"
      />
      <Path
        d="M28.215 81.852H9.148c-.552 0-1-.447-1-1V61.785c0-.553.448-1 1-1s1 .447 1 1v18.066h18.067c.552 0 1 .447 1 1s-.448 1-1 1z"
        fill="#fff"
      />
      <Path
        d="M9.148 29.215c-.552 0-1-.448-1-1V9.148c0-.552.448-1 1-1h19.067c.552 0 1 .448 1 1s-.448 1-1 1H10.148v18.067c0 .552-.448 1-1 1z"
        fill="#fff"
      />
      <Path
        d="M80.852 29.215c-.553 0-1-.448-1-1V10.148H61.785c-.553 0-1-.448-1-1s.447-1 1-1h19.066c.553 0 1 .448 1 1v19.067z"
        fill="#fff"
      />
      <Path
        d="M89 46H1c-.552 0-1-.448-1-1s.448-1 1-1h88c.553 0 1 .448 1 1s-.447 1-1 1z"
        fill="#fff"
      />
    </Svg>
  </View>
);

export default SvgComponent;