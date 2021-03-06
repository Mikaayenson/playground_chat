import { useChat } from 'context';
import { useEffect } from 'react';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail, ChatToolbar, ChatInput, MessageList } from 'components';

export const Chat = () => {
    const { myChats, setMyChats, chatConfig, selectedChat, selectChatClick, setSelectedChat } = useChat();

    useEffect(() => {
        console.log('Config: ', chatConfig);
        console.log('My Chats: ', myChats);
    }, [myChats, chatConfig]);


    return (
        <>
        <LeftRail/>
        {!!chatConfig && (
            <ChatEngine
                hideUI={true}
                userName={chatConfig.userName}
                projectID={chatConfig.projectId}
                userSecret={chatConfig.userSecret}
                onConnect={() => {
                    getChats(chatConfig, setMyChats);
                }}
                onNewChat = {chat => {
                    if (chat.admin.username === chatConfig.userName){
                        selectChatClick(chat);
                    }
                    setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
                }}
                onDeleteChat = {chat => {
                    if (selectedChat?.id === chat.id){
                        setSelectedChat(null);
                    }
                    setMyChats(
                        myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id)
                    );
                }}
                onNeMessage={(chatId, message) => {
                    if (selectedChat && chatId === selectedChat.id){
                        setSelectedChat({
                            ...selectedChat,
                            messages: [...selectedChat.messages, message],
                        });
                    }
                    const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
                    const filteredChats = myChats.filter(c => c.id !== chatId);
                    const updatedChat = {
                        ...chatThatMessageBelongsTo,
                        last_message: message,
                    };
                    setMyChats(
                        [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
                    );
                }

                }
            />
        )}

        <div className="chat-container">
            <div className="current-chat">
                {selectedChat ? <div className='chat'>
                    <ChatToolbar/>
                    <ChatInput/>
                    <MessageList/>
                </div> : <div className='no-chat-selected'>
                    <img
                        src="/img/pointLeft.png"
                        className="point-left"
                        alt="point-left"
                    />
                    Select A Chat
                </div>
                }
            </div>
        </div>
        </>
    );
};