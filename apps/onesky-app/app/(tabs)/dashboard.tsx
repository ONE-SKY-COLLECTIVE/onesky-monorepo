import { View, Text, Animated, Dimensions, Easing, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import icons from '@/lib/icons';
import { Redirect, useRouter } from 'expo-router';

const dashboard = () => {
  return <Redirect href={'/(auth)/login'} />;
};

export default dashboard;
