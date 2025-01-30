import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import UserList from '../screens/UserList';
import UserDetails from '../screens/UserDetails';

const AppNavigator = createStackNavigator(
  {
    Home: UserList,
    Details: UserDetails,
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);
