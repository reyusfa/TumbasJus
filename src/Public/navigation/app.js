import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from '../../App/Home';
import Order from '../../App/Order';
import OrderHistory from '../../App/Order/OrderHistory';
import Profile from '../../App/Profile';
import EditProfile from '../../App/Profile/EditProfile';
import ChangePassword from '../../App/Profile/ChangePassword';
import SideMenu from '../components/SideMenu';

const HomeScreen = createStackNavigator({
  Home: {
    screen: Home
  }
});

const OrderScreen = createStackNavigator({
  Order: {
    screen: Order
  },
  OrderHistory: {
    screen: OrderHistory
  }
});

const ProfileScreen = createStackNavigator({
  Profile: {
    screen: Profile
  },
  EditProfile: {
    screen: EditProfile
  },
  ChangePassword: {
    screen: ChangePassword
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
