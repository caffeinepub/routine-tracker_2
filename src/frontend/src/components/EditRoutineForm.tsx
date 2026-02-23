import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRoutines } from '@/hooks/useRoutines';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { Routine } from '@/backend';

interface EditRoutineFormProps {
  routine: Routine;
  onClose: () => void;
}

export default function EditRoutineForm({ routine, onClose }: EditRoutineFormProps) {
  const [name, setName] = useState(routine.name);
  const [description, setDescription] = useState(routine.description);
  const [scheduledTime, setScheduledTime] = useState(routine.scheduledTime);
  const [errors, setErrors] = useState<{ name?: string; scheduledTime?: string }>({});

  const { editRoutine, isEditing } = useRoutines();

  useEffect(() => {
    setName(routine.name);
    setDescription(routine.description);
    setScheduledTime(routine.scheduledTime);
  }, [routine]);

  const validateForm = () => {
    const newErrors: { name?: string; scheduledTime?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Routine name is required';
    }

    if (!scheduledTime.trim()) {
      newErrors.scheduledTime = 'Scheduled time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await editRoutine({
        id: routine.id,
        name: name.trim(),
        description: description.trim(),
        scheduledTime: scheduledTime.trim(),
      });

      toast.success('Routine updated successfully! ✨');
      onClose();
    } catch (error) {
      toast.error('Failed to update routine. Please try again.');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Routine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">
              Routine Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-name"
              placeholder="e.g., Morning Meditation"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-scheduledTime">
              Scheduled Time <span className="text-destructive">*</span>
            </Label>
            <Input
              id="edit-scheduledTime"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className={errors.scheduledTime ? 'border-destructive' : ''}
            />
            {errors.scheduledTime && (
              <p className="text-xs text-destructive">{errors.scheduledTime}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description (Optional)</Label>
            <Textarea
              id="edit-description"
              placeholder="Add any notes or details about this routine..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isEditing}>
              Cancel
            </Button>
            <Button type="submit" disabled={isEditing}>
              {isEditing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
