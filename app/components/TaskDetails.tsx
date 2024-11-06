import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  ScrollView,
  StackLayout,
  Label,
  Button
} from '@nativescript/core/ui';
import { useTaskScheduler } from '../hooks/useTaskScheduler';

type RootStackParamList = {
  TaskDetails: { taskId: string };
};

type TaskDetailsRouteProp = RouteProp<RootStackParamList, 'TaskDetails'>;

export function TaskDetails() {
  const navigation = useNavigation();
  const route = useRoute<TaskDetailsRouteProp>();
  const { schedule, completeTask } = useTaskScheduler();

  const task = schedule
    .flatMap(day => day.tasks)
    .find(t => t.id === route.params.taskId);

  if (!task) return null;

  return (
    <ScrollView>
      <StackLayout padding={16}>
        <Label
          text={task.title}
          fontSize={24}
          fontWeight="bold"
          marginBottom={16}
        />
        
        <Label
          text={task.description}
          marginBottom={16}
        />

        <Button
          text={task.status === 'completed' ? 'Completed' : 'Complete Task'}
          onTap={() => {
            completeTask(task.id);
            navigation.goBack();
          }}
          backgroundColor={task.status === 'completed' ? '#9CA3AF' : '#8B5CF6'}
          color="white"
          padding={16}
          borderRadius={8}
        />
      </StackLayout>
    </ScrollView>
  );
}