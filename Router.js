import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Screens/login';
import SignUp from './Screens/signUp';
import Forgot from './Screens/forget';
import ChangePassword from './Screens/changePassword';
import Verify from './Screens/verify';
import Timeline from './Screens/timeline';
import UploadPost from './Screens/uploadPost';
import Logout from './Screens/logout';
import SinglePost from './Screens/singlePost';
import UploadCategory from './Screens/uploadCategory';
import {DrawerItems, createDrawerNavigator} from 'react-navigation-drawer';
import CustomDrawer from './Screens/component/customDrawer';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const p = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerShown: false,
      },
    },
    Forgot: {
      screen: Forgot,
      navigationOptions: {
        headerShown: false,
      },
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        headerShown: false,
      },
    },
    Verify: {
      screen: Verify,
      navigationOptions: {
        headerShown: false,
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Login',
  },
);
const xyz = createAppContainer(p);
const AppNavigator = createStackNavigator(
  {
    SinglePost: {
      screen: SinglePost,
      navigationOptions: {
        headerTitle: 'Post',
        headerShown: true,
      },
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        headerShown: false,
      },
    },

    UploadPost: {
      screen: UploadPost,
      navigationOptions: {
        headerShown: false,
      },
    },
    Timeline: {
      screen: Timeline,
      navigationOptions: {
        headerShown: false,
      },
    },
    UploadCategory: {
      screen: UploadCategory,
      navigationOptions: {
        headerTitle: 'Upload Category',
      },
    },
  },
  {
    initialRouteName: 'Timeline',
  },
);

const Drawer = createDrawerNavigator(
  {
    // Home: Timeline,
    // UploadPost: {
    //   screen: UploadPost,
    //   navigationOptions: {
    //     title: 'Upload Post',
    //   },
    // },
    // Verify: Verify,
    // Logout: {
    //   screen: Logout,
    // },
    // SignUp: SignUp,
    // Login: Login,
    // UploadCategory: {
    //   screen: UploadCategory,
    //   navigationOptions: {
    //     title: 'Upload Category ',
    //   },
    // },
    AppNavigator: {
      screen: AppNavigator,
      navigationOptions: {
        title: '',
      },
    },
  },

  {
    headerMode: 'float',
    // intialRouteName: 'Login',
    //drawerBackgroundColor: 'rgba(255,255,255,0.98)',
    contentComponent: CustomDrawer,
    drawerWidth: screenWidth * 0.75,
  },
);
const SwitchNavigator = createSwitchNavigator(
  {
    InitialStack: xyz,
    MainStack: createAppContainer(Drawer),
  },
  {
    initialRouteName: 'InitialStack',
  },
);

export default createAppContainer(SwitchNavigator);
