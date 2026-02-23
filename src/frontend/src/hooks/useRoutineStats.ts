import { useMemo } from 'react';
import { useRoutines } from './useRoutines';

export function useRoutineStats() {
  const { routines, isLoading } = useRoutines();

  const stats = useMemo(() => {
    const totalRoutines = routines.length;
    const completedRoutines = routines.filter((r) => r.isCompleted).length;
    const completionPercentage =
      totalRoutines > 0 ? Math.round((completedRoutines / totalRoutines) * 100) : 0;

    // Simple streak calculation - in a real app, this would track historical data
    // For now, we'll show 1 if all routines are complete, 0 otherwise
    const streak = totalRoutines > 0 && completedRoutines === totalRoutines ? 1 : 0;

    return {
      totalRoutines,
      completedRoutines,
      completionPercentage,
      streak,
    };
  }, [routines]);

  return {
    ...stats,
    isLoading,
  };
}
