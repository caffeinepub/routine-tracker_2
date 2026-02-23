import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useRoutineStats } from '@/hooks/useRoutineStats';
import { CheckCircle2, Target, Flame } from 'lucide-react';

export default function Dashboard() {
  const { totalRoutines, completedRoutines, completionPercentage, streak, isLoading } =
    useRoutineStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-3">
              <div className="h-4 bg-muted rounded w-24"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Routines */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              Total Routines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalRoutines}</div>
            <p className="text-xs text-muted-foreground mt-1">routines tracked today</p>
          </CardContent>
        </Card>

        {/* Completed */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{completedRoutines}</div>
            <p className="text-xs text-muted-foreground mt-1">routines finished</p>
          </CardContent>
        </Card>

        {/* Streak */}
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{streak}</div>
            <p className="text-xs text-muted-foreground mt-1">consecutive days</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Today's Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={completionPercentage} className="h-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completedRoutines} of {totalRoutines} completed
            </span>
            <span className="font-semibold text-primary">{completionPercentage}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
