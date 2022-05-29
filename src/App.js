import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  LoadingIndicator,
  ChannelList,
  useMessageContext,
} from "stream-chat-react";

import "stream-chat-react/dist/css/index.css";

const filters = {
  type: "messaging",
};

const sort = { last_message_at: -1 };

const attachment = [
  {
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71k0cry-ceL._SL1500_.jpg",
    name: "iPhone",
    type: "product",
    url: "https://goo.gl/ppFmcR",
  },
];

const CustomAttachment = (props) => {
  const {attachments} = props;
  const [attachment] = attachment || []

  if(attachment?.type === 'product') {
    <div>
      Product:
      <a href={attachment.url} rel='noreferrer'>
        <img alt='custom-attchment' height='100px' src={attachment.image} />
        <br />
        {attachment.name}
      </a>
    </div>
  }
  return <a
}

const CustomChannelPreview = (props) => {
  const { channel, setActiveChannel } = props;

  const { messages } = channel.state;
  const messagePreview = messages[messages.length - 1]?.text.slice(0, 30);

  return (
    <div onClick={() => setActiveChannel(channel)} style={{ margin: "12px" }}>
      <div>{channel.data.name || "Unamed Channel"}</div>
      <div style={{ fontSize: "14px" }}>{messagePreview}</div>
    </div>
  );
};

const CustomMessage = () => {
  const { message } = useMessageContext();

  return (
    <div>
      <b style={{ marginRight: "4px" }}>{message.user.name}</b> {message.text}
    </div>
  );
};

const App = () => {
  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance("bgnuyx7vbhmx");

      await client.connectUser(
        {
          id: "srain0626",
          name: "김은우",
          image: "https://getstream.io/random_svg/?id=srain0626&name='김은우'",
        },
        client.devToken("srain0626")
      );
      setChatClient(client);
    };
    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Chat client={chatClient} theme="messaging light">
      <ChannelList
        filters={filters}
        sort={sort}
        Preview={CustomChannelPreview}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList Message={CustomMessage} />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
