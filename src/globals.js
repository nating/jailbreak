import { Platform} from 'react-native';

module.exports = {
  stripe_endpoint: '',
  stripe_key: '',
  endpoint: '',
  errors: {},
  styles: {
    headerTitle: {
      alignSelf:'center',
      color:'white'
    },
    header: {
      backgroundColor:'black',
      height: Expo.Constants.statusBarHeight + (Platform.OS === "ios" ? 44 : 56),
      paddingTop: Platform.OS === "ios" ? 20 : Expo.Constants.statusBarHeight,
    },
  }
};
