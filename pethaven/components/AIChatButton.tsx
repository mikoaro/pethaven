import { Bot } from "lucide-react";
import { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Button } from "./ui/button";

export default function AIChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)} className="rounded-full h-7">
        <Bot size={20} className="mr-2" />
        AI Chat
      </Button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}
