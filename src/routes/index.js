import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Login from '../pages/login';
import Main from '../pages/main';
import Detalhar from '../pages/detalhar';
import Ajuda from '../pages/ajuda';
import Sair from '../pages/sair';
import CadastroUsuario from '../pages/cadastroUsuario';
import CadastroImovel from '../pages/cadastroImovel';
import ListarImovel from '../pages/listarImovel';

import Icon from 'react-native-vector-icons/FontAwesome';

import Menu from '../components/menu';
import Acao from '../components/acao';
import NavigationDrawerStructure from '../components/navigationDrawerStructure';

import Colors from '../styles/colors';

const AjudaPage = createStackNavigator({
  First: {
    screen: Ajuda,
    navigationOptions: ({ navigation }) => ({
      title: 'Ajuda',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.fundo,
    }),
  },
});

const Tab = createMaterialTopTabNavigator(
  {
    // Definir as pastas
    Pasta1: {
      screen: Main,
      navigationOptions: () => ({
        title: 'Imóveis',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="file-code-o"
            size={15}
            color={focused === true ? Colors.white : Colors.whiteTransparent}
          />
        ),
      }),
    },
    Pasta2: {
      screen: Main,
      navigationOptions: () => ({
        title: 'Usuário',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="hand-pointer-o"
            color={focused === true ? Colors.white : Colors.whiteTransparent}
          />
        ),
      }),
    },
    Pasta3: {
      screen: Main,
      navigationOptions: () => ({
        title: 'Contatos',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="vcard-o"
            size={15}
            color={focused === true ? Colors.white : Colors.whiteTransparent}
          />
        ),
      }),
    },
  },
  // Formatar as pastas
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      activeTintColor: Colors.white,
      inactiveTintColor: Colors.whiteTransparent,
      labelStyle: {
        fontSize: 8,
      },

      style: {
        backgroundColor: Colors.fundo,
      },
      indicatorStyle: {
        borderBottomColor: Colors.amareloMenu,
        borderBottomWidth: 3,
      },
    },
  },
);

const MainPage = createStackNavigator({
  Second: {
    screen: Tab,
    navigationOptions: ({ navigation }) => ({
      title: 'Main',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.fundo,
      headerRight: () => <Acao navigation={navigation} />,
      // headerRightContainerStyle : ( { height:200})
    }),
  },
});

const DetalharPage = createStackNavigator({
  Detalhar: {
    screen: Detalhar,
    navigationOptions: ({ navigation }) => ({
      title: 'Pesquisar',
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.white,
    }),
  },
});

const LoginPage = createStackNavigator({
  Third: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  CadastroUsuario: {
    screen: CadastroUsuario,
    navigationOptions: ({ navigation }) => ({
      title: 'Cadastrar Usuário',
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.white,
    }),
  },
});

const SairPage = createStackNavigator({
  Fourth: {
    screen: Sair,
    navigationOptions: ({ navigation }) => ({
      title: 'Sair',
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.fundo,
    }),
  },
});

const HiddenPage = createStackNavigator({
  Fifth: {
    screen: 'Hidden',
  },
});

const CadastroImovelPage = createStackNavigator({
  CadastroImovel: {
    screen: CadastroImovel,
    navigationOptions: ({ navigation }) => ({
      title: 'Cadastrar Imóvel',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.fundo,
    }),
  },
});

const ListarImovelPage = createStackNavigator({
  ListarImovel: {
    screen: ListarImovel,
    navigationOptions: ({ navigation }) => ({
      title: 'Listar Imóveis',
      headerLeft: () => (
        <NavigationDrawerStructure navigationProps={navigation} />
      ),
      headerStyle: {
        backgroundColor: Colors.fundo,
      },
      headerTintColor: Colors.fundo,
    }),
  },
});

const DrawerNavigatorMenu = createDrawerNavigator(
  {
    Main: MainPage,
    Login: LoginPage,
    Ajuda: AjudaPage,
    Sair: SairPage,
    Hidden: HiddenPage,
    CadastrarImovel: CadastroImovelPage,
    ListarImovel: ListarImovelPage,
    Detalhar: DetalharPage,
  },
  {
    contentComponent: Menu,
    initialRouteName: 'Login',
  },
);

export default createAppContainer(DrawerNavigatorMenu);
