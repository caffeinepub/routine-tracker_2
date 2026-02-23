import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRoutines } from '@/hooks/useRoutines';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AddRoutineForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [errors, setErrors] = useState<{ name?: string; scheduledTime?: string }>({});

  const { addRoutine, isAdding } = useRoutines();

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
      await addRoutine({
        name: name.trim(),
        description: description.trim(),
        scheduledTime: scheduledTime.trim(),
      });

      // Clear form
      setName('');
      setDescription('');
      setScheduledTime('');
      setErrors({});

      toast.success('Routine added successfully! 🎯');
    } catch (error) {
      toast.error('Failed to add routine. Please try again.');
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Routine
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Routine Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Morning Meditation"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledTime">
                Scheduled Time <span className="text-destructive">*</span>
              </Label>
              <Input
                id="scheduledTime"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className={errors.scheduledTime ? 'border-destructive' : ''}
              />
              {errors.scheduledTime && (
                <p className="text-xs text-destructive">{errors.scheduledTime}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any notes or details about this routine..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" disabled={isAdding} className="w-full">
            {isAdding ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Routine
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
