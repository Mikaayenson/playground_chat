import { useChat } from 'context';
import { useEffect } from 'react';
import { getChats, ChatEngine } from 'react-chat-engine';

export const Chat = () => {
    const { myChats, setMyChats, chatConfig, selectedChat } = useChat();

    useEffect(() => {
        console.log('Config: ', chatConfig);
        console.log('My Chats: ', myChats);
    }, [myChats, chatConfig]);


    return <>{ !!chatConfig &&
     <ChatEngine
        hideUI={true}
        userName={chatConfig.userName}
        projectID={chatConfig.projectId}
        userSecret={chatConfig.userSecret}
        onConnect={() => {
            getChats(chatConfig, setMyChats);
        }}
     />}</>;
};