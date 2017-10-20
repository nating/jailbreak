
import * as Progress from 'react-native-progress';


// Shows a loading overlay screen
export function showLoadingScreen(loadingState){
  if(loadingState){
    return(<View
      style={{backgroundColor:'rgba(0,0,0,0.8)',alignItems:'center',justifyContent:'center',position:'absolute',top:0,left:0,height:'100%',width:'100%'}}>
      <Progress.CircleSnail size={60} thickness={4} color={['white']}/></View>)
  }
}
