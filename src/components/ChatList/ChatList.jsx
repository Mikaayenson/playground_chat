import { useChat } from 'context';
import { ChatAvatar } from 'components';
import { Icon } from "semantic-ui-react";
import { joinUsernames, notMe } from 'helpers';

export const ChatList = () => {
    const {
        myChats,
        chatConfig,
        selectedChat,
        selectChatClick,
        deleteChatClick,
    } = useChat();

    return (
        <div className='chat-list'>
            {myChats.map((c, index) => (
                <div
                    className={`chat-list-item ${
                        selectedChat?.id === c.id ? 'selected-chat-item' : ''
                    }`}
                    key={index}>

                    <div
                        onClick={() => selectChatClick(c)}
                        className='chat-list-item-content'>

                        {c.people.length === 1  ? (
                            <>
                                <Icon circular inverted color="violet" name="user cancel"></Icon>
                                <div className="chat-list-preview">
                                    <div className="preview-username"> No One Added Yet
                                    </div>
                                </div>
                            </>
                        ) : c.people.length === 2 ? (
                            <>
                                <ChatAvatar username={notMe(chatConfig, c)} chat={c}/>

                                <div className="chat-list-preview">
                                    <div className="preview-username">
                                    {notMe(chatConfig, c)}
                                    </div>
                                    <div className="preview=message">
                                        { c.last_message.attachments.length? `${c.last_message.sender.username} sent an attachment`: c.last_message.text.slice(0, 50) + " ... " }
                                    </div>
                                </div>
                            </>
                        ) : (
                        <>
                            <Icon circular inverted color="brown" name="users"/>

                            <div className="preview-username">
                                {joinUsernames(c.people, chatConfig.username).slice(0, 50).slice(0, 50)+"..."}
                            </div>
                            <div className="preview-message">
                                {c.last_message.attachments.length
                                    ? `${c.last_message.sender.username} sent an attachment` : c.last_message.text.slice(0, 50) + '...'}
                            </div>
                        </>
                            )}
                    </div>
                    <div onClick={() => deleteChatClick(c)} className="chat-item-delete">
                        <Icon name="delete" />
                    </div>
                </div>
            ))}
        </div>
    );
}