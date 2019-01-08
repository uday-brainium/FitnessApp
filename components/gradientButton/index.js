import React from 'react';
import {Button, Text} from 'react-native';
import {
  RkButton,
  RkText,
  RkComponent
} from 'react-native-ui-kitten';

export class GradientButton extends RkComponent {
  componentName = 'GradientButton';
  typeMapping = {
    button: {},
    gradient: {},
    text: {}
  };

  renderContent(textStyle){
    if(this.props.text){
      return (
          <RkText style={textStyle}>
            {this.props.text}
          </RkText>
      )
    } else {
      return this.props.children
    }
  }

  render() {
    let {button, gradient, text: textStyle} = this.defineStyles();
    let colors = this.extractNonStyleValue(gradient, 'colors');
    let {style, rkType, ...otherProps} = this.props;

    colors = this.props.colors ? this.props.colors : colors;

    return (
      <RkButton rkType='stretch'
                style={[button, style]}
                {...otherProps}>

          <Text style={{color: '#fff', fontSize: 18, marginTop: 5}}> Close </Text>

      </RkButton>
    )
  }
}
