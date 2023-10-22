import { useClient } from "@/hooks/useClient";
import LoginView from "@/views/LoginView";
import TimeAgo from "javascript-time-ago";
import { ReactNode, useEffect, useState } from "react";
import { useConversations } from "../hooks/useConversations";
import { useLatestMessages } from "../hooks/useLatestMessages";
import ConversationCellView from "../views/ConversationCellView";
import en from "javascript-time-ago/locale/en.json";
import ConversationView from "@/views/ConversationView";
import { findConversation } from "@/model/conversations";

TimeAgo.addDefaultLocale(en);

interface Props {
  children?: ReactNode;
}

export default function Chat({ children }: Props) {
  const client = useClient();
  const [readReceiptsEnabled, setReadReceiptsEnabled] = useState(
    window.localStorage.getItem("readReceiptsEnabled") === "true"
  );
  const [conversationId, setConversationId] = useState<any>(null);
  const [conversation, setConversation] = useState<any>(null);
  const [conversationLoading, setConversationLoading] = useState(true);
  //   const [conversationObj, setConversationObj] = useState<any>();
  const conversations = useConversations(client);
  const latestMessages = useLatestMessages(conversations);

  useEffect(() => {
    window.localStorage.setItem(
      "readReceiptsEnabled",
      String(readReceiptsEnabled)
    );
  }, [readReceiptsEnabled]);

  useEffect(() => {
    (async () => {
      if (conversationId) {
        setConversationLoading(true);
        const conversationTemp = await findConversation(conversationId);
        setConversation(conversationTemp);
        setConversationLoading(false);
      }
    })();
  }, [conversationId]);

  useEffect(() => {
    if (conversation) {
      console.log("Conv from Chat: ", conversation);
    }
  }, [conversation]);

  return (
    <main className="my-3">
      <div className="mx-auto p-3 rounded-xl bg-zinc-900 border border-zinc-800  max-h-[500px]">
        {client ? (
          <div className="grid grid-row-12 gap-x-5">
            <div className="col-span-8 reset-last-message flex flex-col space-y-2">
              {conversations?.length == 0 && <p>No conversations yet.</p>}
              {conversations
                ? conversations.map((conversation, i) => (
                    <button
                      onClick={() => {
                        setConversationId(conversation.topic);
                      }}
                      key={conversation.topic}
                    >
                      <ConversationCellView
                        conversation={conversation}
                        latestMessage={latestMessages[i]}
                      />
                    </button>
                  ))
                : "Could not load conversations"}
            </div>
            <div className="col-span-8 border border-gray-800 p-2 rounded-3xl">
              {!conversationLoading && (
                <ConversationView conversation={conversation} />
              )}
            </div>
          </div>
        ) : (
          <LoginView />
        )}
      </div>
    </main>
  );
}
