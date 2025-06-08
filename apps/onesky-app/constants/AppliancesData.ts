import { ImageSourcePropType, StyleSheet } from 'react-native';
import icons from '@/lib/icons';
import images from '@/lib/images';

export interface MapitemType {
  id: number;
  uri: ImageSourcePropType;
  text: string;
}

export const mapData: MapitemType[] = [
  {
    id: 1,
    uri: images.applianceStarter1,
    text: 'Help reduce wasted energy by turning off lights and unplugging appliances in stand-by mode',
  },
  {
    id: 2,
    uri: images.applianceStarter2,
    text: 'Vampire power can add up to 5% to 10% of your household energy bill',
  },
  {
    id: 3,
    uri: images.applianceStarter3,
    text: 'Turn off all lights and unplug all stand-by appliances to earn maximum points',
  },
];

export const activityStarterStyles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
  },
  container: {},
  button: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#A1CE3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export const applianceList: MapitemType[] = [
  {
    id: 1,
    text: 'Desk or room lights',
    uri: images.applianceBulb,
  },
  {
    id: 2,
    text: 'Laptop or desktop',
    uri: images.applianceLaptop,
  },
  {
    id: 3,
    text: 'TV',
    uri: images.applianceTv,
  },
  {
    id: 4,
    text: 'Printer',
    uri: images.appliancePrinter,
  },
  {
    id: 5,
    text: 'Game console',
    uri: images.applianceJoystick,
  },
  {
    id: 6,
    text: 'Microwave oven',
    uri: images.applianceOven,
  },
];

export const unplugAppliancesStyles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
  },
  button: {
    height: 40,
    borderRadius: 8,
    backgroundColor: '#A1CE3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectbutton: {
    height: 40,
    borderColor: '#E8EAEB',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectbuttonText: {
    color: '#262626',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#E7E5E4',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButtonText: {
    color: '#A8A29E',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  allSelectedButtonText: {
    color: '#A1CE3F',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  confettiAnimation: {
    height: 400,
    width: '100%',
    padding: 0,
    margin: 0,
    bottom: '30%',
    left: '10%',
    position: 'absolute',
    zIndex: -1000,
  },
});
