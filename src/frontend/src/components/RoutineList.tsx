import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRoutines } from '@/hooks/useRoutines';
import { Pencil, Trash2, Clock, FileText } from 'lucide-react';
import EditRoutineForm from './EditRoutineForm';
import { toast } from 'sonner';
import type { Routine } from '@/backend';

export default function RoutineList() {
  const { routines, isLoading, markComplete, deleteRoutine } = useRoutines();
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);

  const handleMarkComplete = async (id: bigint, isCompleted: boolean) => {
    if (isCompleted) {
      toast.info('This routine is already completed');
      return;
    }
    try {
      await markComplete(id);
      toast.success('Routine marked as complete! 🎉');
    } catch (error) {
      toast.error('Failed to mark routine as complete');
    }
  };

  const handleDelete = async (id: bigint, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteRoutine(id);
        toast.success('Routine deleted successfully');
      } catch (error) {
        toast.error('Failed to delete routine');
      }
    }
  };

  if (isLoading) {
    return (
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Your Routines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Routines</span>
            <Badge variant="secondary">{routines.length} total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {routines.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No routines yet</h3>
              <p className="text-muted-foreground text-sm">
                Add your first routine above to get started!
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {routines.map((routine) => (
                  <div
                    key={routine.id.toString()}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      routine.isCompleted
                        ? 'bg-accent/20 border-accent/50'
                        : 'bg-card border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={routine.isCompleted}
                        onCheckedChange={() =>
                          handleMarkComplete(routine.id, routine.isCompleted)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4
                              className={`font-semibold text-base mb-1 ${
                                routine.isCompleted
                                  ? 'line-through text-muted-foreground'
                                  : 'text-foreground'
                              }`}
                            >
                              {routine.name}
                            </h4>
                            {routine.description && (
                              <p className="text-sm text-muted-foreground flex items-start gap-1 mb-2">
                                <FileText className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                <span>{routine.description}</span>
                              </p>
                            )}
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                <Clock className="w-3 h-3 mr-1" />
                                {routine.scheduledTime}
                              </Badge>
                              {routine.isCompleted && (
                                <Badge className="text-xs bg-accent text-accent-foreground">
                                  Completed
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingRoutine(routine)}
                              className="h-8 w-8"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(routine.id, routine.name)}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {editingRoutine && (
        <EditRoutineForm routine={editingRoutine} onClose={() => setEditingRoutine(null)} />
      )}
    </>
  );
}
