import { useClient } from "@/hooks/useClient";
import LoginView from "@/views/LoginView";
import TimeAgo from "javascript-time-ago";
import { ReactNode, useEffect, useState } from "react";
import { useConversations } from "../hooks/useConversations";
import { useLatestMessages } from "../hooks/useLatestMessages";
import ConversationCellView from "../views/ConversationCellView";
import en from "javascript-time-ago/locale/en.json";
import ConversationView from "@/views/ConversationView";
import NewConversationView from "@/views/NewConversationView";
import { findConversation } from "@/model/conversations";

TimeAgo.addDefaultLocale(en);

export default function Chat({ address }: any) {
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
      if (conversationId == null && conversations.length > 0) {
        setConversationId(conversations[0].topic);
      }

      if (conversationId) {
        setConversationLoading(true);
        const conversationTemp = await findConversation(conversationId);
        setConversation(conversationTemp);
        setConversationLoading(false);
      }
    })();
  }, [conversationId, conversations]);

  useEffect(() => {
    if (conversation) {
      console.log("Conv from Chat: ", conversation);
    }
  }, [conversation]);

  return (
    <main className="my-3">
      <div className="mx-auto p-3 rounded-xl bg-zinc-900 border border-zinc-800">
        {client ? (
          <div>
            <NewConversationView openAddress={address} />
            <div className="grid grid-row-12 gap-x-5 mt-5">
              <div className="col-span-8 reset-last-message flex flex-col space-y-2">
                {conversations?.length == 0 && <p>No conversations yet.</p>}
                {conversations ? (
                  <div>
                    <h1 className="text-sm font-bold mb-2">
                      Find other chats...
                    </h1>
                    {conversations.map((conversation, i) => (
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
                    ))}
                  </div>
                ) : (
                  "Could not load conversations"
                )}
              </div>
              <div className="col-span-8 border border-gray-800 p-2 rounded-3xl">
                {!conversationLoading && (
                  <ConversationView conversation={conversation} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <LoginView />
        )}
      </div>
    </main>
  );
}
