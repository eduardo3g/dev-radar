import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        headerShown: false,
        title: 'dev'
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title: 'Github',
      },
    },
  }, {
    defaultNavigationOptions: {
	    headerTintColor: '#FFF',
	    headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: '#FF0000',
      }
    }
  })
);

export default Routes;