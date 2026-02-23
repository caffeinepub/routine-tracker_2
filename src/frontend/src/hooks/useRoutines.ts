import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Routine, RoutineId } from '@/backend';

export function useRoutines() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const routinesQuery = useQuery<Routine[]>({
    queryKey: ['routines'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRoutines();
    },
    enabled: !!actor && !isFetching,
  });

  const addRoutineMutation = useMutation({
    mutationFn: async (data: { name: string; description: string; scheduledTime: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addRoutine(data.name, data.description, data.scheduledTime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });

  const editRoutineMutation = useMutation({
    mutationFn: async (data: {
      id: RoutineId;
      name: string;
      description: string;
      scheduledTime: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.editRoutine(data.id, data.name, data.description, data.scheduledTime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });

  const markCompleteMutation = useMutation({
    mutationFn: async (id: RoutineId) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.markRoutineCompleted(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });

  const deleteRoutineMutation = useMutation({
    mutationFn: async (id: RoutineId) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteRoutine(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });

  return {
    routines: routinesQuery.data || [],
    isLoading: routinesQuery.isLoading,
    addRoutine: addRoutineMutation.mutateAsync,
    isAdding: addRoutineMutation.isPending,
    editRoutine: editRoutineMutation.mutateAsync,
    isEditing: editRoutineMutation.isPending,
    markComplete: markCompleteMutation.mutateAsync,
    isMarkingComplete: markCompleteMutation.isPending,
    deleteRoutine: deleteRoutineMutation.mutateAsync,
    isDeleting: deleteRoutineMutation.isPending,
  };
}
