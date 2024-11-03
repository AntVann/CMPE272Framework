import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [user, setUser] = useState('');
    const [showChat, setShowChat] = useState(false);
    const chatWindowRef = useRef(null);

    const handleUsernameSubmit = () => {
        if (user.trim() !== '') {
            setShowChat(true);
            setMessages([]);
        }
    };

    useEffect(() => {
        if (showChat) {
            const fetchMessages = async () => {
                const response = await axios.get('http://localhost:8080/chat');
                setMessages(response.data);
            };

            fetchMessages();
            const interval = setInterval(fetchMessages, 1000);

            return () => clearInterval(interval);
        }
    }, [showChat]);

    const sendMessage = async () => {
        if (input.trim() !== '' && user.trim() !== '') {
            await axios.post('http://localhost:8080/chat', { user, content: input });
            setInput('');
            scrollToBottom();
        }
    };

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    const formatTime = (timestamp) => {
        return dayjs(timestamp).format('HH:mm');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ 
                textAlign: 'left', 
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: 'bold'
            }}>Chat Room</h1>
            
            {!showChat ? (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'flex-start'
                }}>
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        placeholder="Enter username"
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '200px'
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
                    />
                    <button 
                        onClick={handleUsernameSubmit}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Enter Chat
                    </button>
                </div>
            ) : (
                <>
                    <div
                        ref={chatWindowRef}
                        style={{
                            height: '400px',
                            backgroundColor: '#f5f5f5',
                            padding: '20px',
                            overflowY: 'auto',
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}
                    >
                        {messages.map((msg, index) => (
                            <div key={index} style={{
                                marginBottom: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: msg.user === user ? 'flex-end' : 'flex-start'
                            }}>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#666',
                                    marginBottom: '4px'
                                }}>
                                    {msg.user}
                                </div>
                                <div style={{
                                    backgroundColor: msg.user === user ? '#007bff' : '#e9ecef',
                                    color: msg.user === user ? 'white' : 'black',
                                    padding: '10px 15px',
                                    borderRadius: '15px',
                                    maxWidth: '70%',
                                    wordBreak: 'break-word'
                                }}>
                                    <div>{msg.content}</div>
                                    <div style={{
                                        fontSize: '11px',
                                        marginTop: '4px',
                                        opacity: 0.8,
                                        textAlign: 'right'
                                    }}>
                                        {formatTime(msg.timestamp)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        display: 'flex',
                        gap: '10px'
                    }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            style={{
                                flex: 1,
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button 
                            onClick={sendMessage}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Send
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Chat;
