"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Share2, 
  Copy, 
  Mail, 
  MessageCircle, 
  Twitter,
  Facebook,
  Linkedin
} from "lucide-react";
import { type Quiz } from "@/lib/mock-data/quizzes";

interface ShareQuizProps {
  quiz: Quiz;
}

export default function ShareQuiz({ quiz }: ShareQuizProps) {
  const [isOpen, setIsOpen] = useState(false);
  const quizUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/quiz/${quiz.id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(quizUrl);
      toast.success("Link copied!", {
        description: "Quiz link has been copied to your clipboard.",
      });
    } catch (err) {
      toast.error("Failed to copy", {
        description: "Could not copy the link. Please try again.",
      });
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this quiz: ${quiz.title}`);
    const body = encodeURIComponent(
      `I found this interesting quiz and thought you might enjoy it!\n\n` +
      `"${quiz.title}"\n${quiz.description}\n\n` +
      `Difficulty: ${quiz.difficulty}\n` +
      `Duration: ${quiz.duration}\n\n` +
      `Take the quiz here: ${quizUrl}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`Just discovered this ${quiz.difficulty.toLowerCase()} quiz: "${quiz.title}" - ${quiz.description}`);
    const url = encodeURIComponent(quizUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(quizUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(quizUrl);
    const title = encodeURIComponent(quiz.title);
    const summary = encodeURIComponent(quiz.description);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`,
      '_blank'
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          <Share2 className="mr-2 h-4 w-4" />
          Share Quiz
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Share Quiz</SheetTitle>
          <SheetDescription>
            Share "{quiz.title}" with others to let them take this quiz.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Copy Link Section */}
          <div className="space-y-2">
            <Label htmlFor="quiz-url">Quiz Link</Label>
            <div className="flex space-x-2">
              <Input
                id="quiz-url"
                value={quizUrl}
                readOnly
                className="flex-1"
              />
              <Button onClick={handleCopyLink} size="sm">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Sharing Buttons */}
          <div className="space-y-3">
            <Label>Share via</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleEmailShare}
                variant="outline"
                className="justify-start"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              
              <Button
                onClick={handleTwitterShare}
                variant="outline"
                className="justify-start"
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              
              <Button
                onClick={handleFacebookShare}
                variant="outline"
                className="justify-start"
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              
              <Button
                onClick={handleLinkedInShare}
                variant="outline"
                className="justify-start"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>

          {/* Quiz Preview */}
          <div className="p-4 border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">{quiz.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">
              {quiz.description}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{quiz.difficulty} • {quiz.category}</span>
              <span>{quiz.duration} • {quiz.questions.length} questions</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}