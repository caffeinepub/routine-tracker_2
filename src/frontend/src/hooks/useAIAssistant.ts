import { useState, useCallback } from 'react';
import { useRoutines } from './useRoutines';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { routines } = useRoutines();

  const generateResponse = useCallback(
    (userMessage: string): string => {
      const lowerMessage = userMessage.toLowerCase();

      // Analyze routines for context
      const totalRoutines = routines.length;
      const completedRoutines = routines.filter((r) => r.isCompleted).length;
      const incompleteRoutines = routines.filter((r) => !r.isCompleted);
      const completionRate =
        totalRoutines > 0 ? Math.round((completedRoutines / totalRoutines) * 100) : 0;

      // Greeting responses
      if (
        lowerMessage.includes('hello') ||
        lowerMessage.includes('hi') ||
        lowerMessage.includes('hey')
      ) {
        return `Hello! 👋 I'm here to help you with your daily routines. You currently have ${totalRoutines} routine${totalRoutines !== 1 ? 's' : ''} tracked${totalRoutines > 0 ? `, with ${completedRoutines} completed` : ''}. How can I assist you today?`;
      }

      // Status/progress queries
      if (
        lowerMessage.includes('progress') ||
        lowerMessage.includes('status') ||
        lowerMessage.includes('how am i doing') ||
        lowerMessage.includes('how many')
      ) {
        if (totalRoutines === 0) {
          return "You haven't added any routines yet. Start by adding your first routine above to begin tracking your daily habits!";
        }
        return `Great question! You have ${totalRoutines} routine${totalRoutines !== 1 ? 's' : ''} today, and you've completed ${completedRoutines} of them (${completionRate}%). ${
          completionRate === 100
            ? "Amazing work! You've completed all your routines! 🎉"
            : completionRate >= 50
              ? "You're doing great! Keep up the momentum! 💪"
              : "You've got this! Focus on one routine at a time. 🎯"
        }`;
      }

      // Incomplete routines reminder
      if (
        lowerMessage.includes('incomplete') ||
        lowerMessage.includes('remaining') ||
        lowerMessage.includes('left') ||
        lowerMessage.includes('todo') ||
        lowerMessage.includes('to do')
      ) {
        if (incompleteRoutines.length === 0) {
          return "Fantastic! You've completed all your routines for today! 🌟 Take a moment to celebrate your achievement!";
        }
        const routineList = incompleteRoutines
          .map((r) => `• ${r.name} (scheduled for ${r.scheduledTime})`)
          .join('\n');
        return `You have ${incompleteRoutines.length} routine${incompleteRoutines.length !== 1 ? 's' : ''} remaining:\n\n${routineList}\n\nTake them one at a time - you've got this! 💪`;
      }

      // Suggestions and tips
      if (
        lowerMessage.includes('suggest') ||
        lowerMessage.includes('tip') ||
        lowerMessage.includes('advice') ||
        lowerMessage.includes('help') ||
        lowerMessage.includes('improve')
      ) {
        const tips = [
          'Start small: Focus on building one routine at a time before adding more.',
          'Schedule routines at consistent times each day to build strong habits.',
          'Morning routines set the tone for your entire day - prioritize them!',
          'Track your progress daily to stay motivated and see your improvement.',
          'Celebrate small wins! Completing even one routine is progress.',
          'If you miss a routine, don\'t worry - just get back on track the next day.',
        ];
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        return `Here's a tip for you: ${randomTip}`;
      }

      // Motivation
      if (
        lowerMessage.includes('motivate') ||
        lowerMessage.includes('motivation') ||
        lowerMessage.includes('encourage')
      ) {
        const motivations = [
          "You're building something amazing - one routine at a time! 🌟",
          'Consistency is key. Every day you show up, you\'re getting stronger! 💪',
          'Small daily improvements lead to stunning long-term results. Keep going! 🚀',
          "Remember: You don't have to be perfect, you just have to be consistent! ✨",
          'Your future self will thank you for the habits you\'re building today! 🎯',
        ];
        const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
        return randomMotivation;
      }

      // Best time suggestions
      if (lowerMessage.includes('best time') || lowerMessage.includes('when should')) {
        return 'The best time for routines depends on your lifestyle! Morning routines (6-9 AM) are great for exercise and planning. Afternoon routines (12-3 PM) work well for breaks and reflection. Evening routines (6-9 PM) are perfect for winding down and preparation for the next day. Choose times when you have the most energy and consistency! ⏰';
      }

      // Default helpful response
      return `I'm here to help you manage your routines! You can ask me about:\n\n• Your progress and completion status\n• Remaining routines for today\n• Tips and suggestions for building better habits\n• Motivation and encouragement\n• Best times to schedule routines\n\nWhat would you like to know? 😊`;
    },
    [routines]
  );

  const sendMessage = useCallback(
    (content: string) => {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsProcessing(true);

      // Simulate AI processing delay
      setTimeout(() => {
        const responseContent = generateResponse(content);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsProcessing(false);
      }, 800);
    },
    [generateResponse]
  );

  return {
    messages,
    sendMessage,
    isProcessing,
  };
}
