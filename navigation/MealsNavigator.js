import React from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import CategoriesScreen, {
  screenOptions as catScreenOptions,
} from '../screens/CategoriesScreen';
import CategoryMealsScreen, {
  screenOptions as catMealScreenOptions,
} from '../screens/CategoryMealsScreen';
import MealDetailScreen, {
  screenOptions as mealDetailScreenOptions,
} from '../screens/MealDetailScreen';
import FavoritesScreen, {
  screenOptions as favScreenOptions,
} from '../screens/FavoritesScreen';
import FiltersScreen, {
  screenOptions as filterScreenOptions,
} from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  headerTitle: 'A Screen',
};

const MealsNavigator = createStackNavigator();

export const MealsStackNavigator = () => {
  return (
    <MealsNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <MealsNavigator.Screen
        name="Categories"
        component={CategoriesScreen}
        options={catScreenOptions}
      />
      <MealsNavigator.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={catMealScreenOptions}
      />
      <MealsNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={mealDetailScreenOptions}
      />
    </MealsNavigator.Navigator>
  );
};

const FavNavigator = createStackNavigator();

export const FavStackNavigator = () => {
  return (
    <FavNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FavNavigator.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={favScreenOptions}
      />
      <FavNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={mealDetailScreenOptions}
      />
    </FavNavigator.Navigator>
  );
};

// Handle for android App like:
// const tabScreenConfig = {
//   Meals: {
//     screen: MealsNavigator,
//     navigationOptions: {
//       tabBarIcon: tabInfo => {
//         return (
//           <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
//         );
//       },
//       tabBarColor: Colors.primaryColor,
//       tabBarLabel:
//         Platform.OS === 'android' ? (
//           <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
//         ) : (
//           'Meals'
//         )
//     }
//   },
//   Favorites: {
//     screen: FavNavigator,
//     navigationOptions: {
//       tabBarIcon: tabInfo => {
//         return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
//       },
//       tabBarColor: Colors.accentColor,
//       tabBarLabel:
//         Platform.OS === 'android' ? (
//           <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
//         ) : (
//           'Favorites'
//         )
//     }
//   }
// };

// const MealsFavTabNavigator =
//   Platform.OS === 'android'
//     ? createMaterialBottomTabNavigator(tabScreenConfig, {
//         activeTintColor: 'white',
//         shifting: true,
//         barStyle: {
//           backgroundColor: Colors.primaryColor
//         }
//       })
//     : createBottomTabNavigator(tabScreenConfig, {
//         tabBarOptions: {
//           labelStyle: {
//             fontFamily: 'open-sans'
//           },
//           activeTintColor: Colors.accentColor
//         }
//       });
const MealsFavTabNavigator = createBottomTabNavigator();

export const MealsFavoriteTabNavigator = () => {
  return (
    <MealsFavTabNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
        },
      }}
    >
      <MealsFavTabNavigator.Screen
        name="Meals"
        component={MealsStackNavigator}
        options={{
          tabBarIcon: (props) => {
            return (
              <Ionicons
                name="ios-restaurant"
                size={25}
                color={Colors.accentColor}
              />
            );
          },
          tabBarColor: Colors.accentColor,
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
            ) : (
              'Meals'
            ),
        }}
      />
      <MealsFavTabNavigator.Screen
        name="Favorites"
        component={FavStackNavigator}
        options={{
          tabBarIcon: (props) => {
            return (
              <Ionicons name="ios-star" size={25} color={Colors.accentColor} />
            );
          },
          tabBarColor: Colors.accentColor,
          tabBarLabel:
            Platform.OS === 'android' ? (
              <Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
            ) : (
              'Favorites'
            ),
        }}
      />
    </MealsFavTabNavigator.Navigator>
  );
};

const FiltersNavigator = createStackNavigator();

export const FilterStackNavigator = () => {
  return (
    <FiltersNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FiltersNavigator.Screen
        name="Filters"
        component={FiltersScreen}
        options={filterScreenOptions}
      />
    </FiltersNavigator.Navigator>
  );
};

const MainNavigator = createDrawerNavigator();

export const MainDrawerNavigator = () => {
  return (
    <MainNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.accentColor,
        labelStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <MainNavigator.Screen
        name="Meals"
        component={MealsFavoriteTabNavigator}
        options={{
          drawerLabel: 'Meals',
        }}
      />
      <MainNavigator.Screen name="Filters" component={FilterStackNavigator} />
    </MainNavigator.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainDrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
