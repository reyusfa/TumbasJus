import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../../App/Home';
import Order from '../../App/Order';
import Profile from '../../App/Profile';
import SideMenu from '../components/SideMenu';

const HomeScreen = createStackNavigator({
  Home: {
    screen: Home
  }
});

const OrderScreen = createStackNavigator({
  Order: {
    screen: Order
  }
});

const ProfileScreen = createStackNavigator({
  Profile: {
    screen: Profile
  }
});

export default createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Order: {
      screen: OrderScreen
    },
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    contentComponent: SideMenu,
    drawerWidth: 300
  }
);
