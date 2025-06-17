import React from 'react';
import { Tabs } from 'expo-router';
import { CustomTabIcon } from '@/components/TabComponents/DashboardIcon';
import TabIcons from '@/lib/tabIcons';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#617C26',
        tabBarInactiveTintColor: '#81A532',
        headerShown: false,
        tabBarStyle: {
          height: 90,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon
              focused={focused}
              inActiveIcon={TabIcons.inactiveHomeIcon}
              activeIcon={TabIcons.activeHomeIcon}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              focused={focused}
              inActiveIcon={TabIcons.inactiveDashIcon}
              activeIcon={TabIcons.activeDashIcon}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              focused={focused}
              inActiveIcon={TabIcons.inactiveRewardIcon}
              activeIcon={TabIcons.activeRewardIcon}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              focused={focused}
              inActiveIcon={TabIcons.inactiveCommunityIcon}
              activeIcon={TabIcons.activeCommunityIcon}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <CustomTabIcon
              focused={focused}
              inActiveIcon={TabIcons.inActiveProfile}
              activeIcon={TabIcons.activeProfile}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
