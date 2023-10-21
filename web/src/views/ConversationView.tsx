import { ReactElement, useEffect, useState } from "react";
import { Conversation, Message } from "../model/db";
import { useMessages } from "../hooks/useMessages";
import MessageComposerView from "./MessageComposerView";
import MessageCellView from "./MessageCellView";
import Header from "../components/Header";
import { useLiveConversation } from "../hooks/useLiveConversation";
import { ContentTypeId } from "@xmtp/xmtp-js";
import { ContentTypeReaction } from "@xmtp/content-type-reaction";
import { useReadReceipts } from "../hooks/useReadReceipts";
import Head from "next/head";

const appearsInMessageList = (message: Message): boolean => {
  if (ContentTypeReaction.sameAs(message.contentType as ContentTypeId)) {
    return false;
  }

  return true;
};

export default function ConversationView({
  conversation,
}: {
  conversation: Conversation;
}): ReactElement {
  const liveConversation = useLiveConversation(conversation);
  const messages = useMessages(conversation);
  const showReadReceipt = useReadReceipts(conversation);
  const [isShowingSettings, setIsShowingSettings] = useState(false);

  useEffect(() => {
    // window.scrollTo({ top: 100000, behavior: "smooth" });
    console.log("Conv from CV: ", conversation);
  }, [messages?.length]);

  return (
    <div>
      <Head>
        <style>
          {`
          /* width */
          ::-webkit-scrollbar {
            width: 5px;
          }
          
          /* Track */
          ::-webkit-scrollbar-track {
            background: #111827;
          }
          
          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #1f2937;
          }
          
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          `}
        </style>
      </Head>
      <Header>
        <div className="flex justify-between font-bold">
          <span className="flex-grow text-white">
            Chatting with{" "}
            {liveConversation?.title ||
              `${conversation.peerAddress.slice(
                0,
                6
              )}...${conversation.peerAddress.slice(-4)}`}
          </span>
        </div>
      </Header>
      <div className="mt-2 h-[165px] overflow-y-scroll">
        {messages?.length == 0 && <p>No messages yet.</p>}
        {messages ? (
          messages.reduce((acc: ReactElement[], message: Message, index) => {
            const showRead = showReadReceipt && index === messages.length - 1;
            if (appearsInMessageList(message)) {
              acc.push(
                <MessageCellView
                  key={message.id}
                  message={message}
                  readReceiptText={showRead ? "Read" : undefined}
                />
              );
            }

            return acc;
          }, [] as ReactElement[])
        ) : (
          <span>Could not load messages</span>
        )}
      </div>
      <MessageComposerView conversation={conversation} />
    </div>
  );
}
