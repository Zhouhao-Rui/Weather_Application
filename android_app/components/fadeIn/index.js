import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // 透明度初始值设为0

  React.useEffect(() => {
    Animated.timing(                 
      fadeAnim,                      
      {
        toValue: 1,                  
        duration: 3000,              
      }
    ).start();                        
  }, [fadeAnim])

  return (
    <Animated.View                 
      style={{
        ...props.style,
        opacity: fadeAnim,     
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export default FadeInView