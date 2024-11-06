import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ScrollView,
  StackLayout,
  Label,
  Button,
  FlexboxLayout
} from '@nativescript/core/ui';
import { useNavigation } from '@react-navigation/native';
import { useTaskScheduler } from '../hooks/useTaskScheduler';

type RootStackParamList = {
  Dashboard: undefined;
  TaskDetails: { taskId: string };
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export function Dashboard() {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const { schedule } = useTaskScheduler();

  const todaySchedule = schedule.find(
    day => new Date(day.date).toDateString() === new Date().toDateString()
  );

  return (
    <ScrollView>
      <StackLayout padding={16}>
        <Label
          text="Today's Tasks"
          fontSize={24}
          fontWeight="bold"
          marginBottom={16}
        />
        
        <FlexboxLayout flexDirection="column">
          {todaySchedule?.tasks.map(task => (
            <Button
              key={task.id}
              text={task.title}
              onTap={() => navigation.navigate('TaskDetails', { taskId: task.id })}
              marginBottom={8}
              padding={16}
              backgroundColor="white"
              borderRadius={8}
            />
          ))}
        </FlexboxLayout>
      </StackLayout>
    </ScrollView>
  );
}