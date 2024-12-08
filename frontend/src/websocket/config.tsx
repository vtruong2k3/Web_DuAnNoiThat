import { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Kết nối tới WebSocket server
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    // Xử lý khi kết nối thành công
    ws.onopen = () => {
      console.log('Connected to WebSocket server');
      ws.send(JSON.stringify({ type: 'join', userId: 'user123' })); // Gửi thông điệp tới server
    };

    // Xử lý khi nhận được tin nhắn từ server
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };

    // Xử lý khi kết nối bị đóng
    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    // Xử lý khi có lỗi
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Dọn dẹp khi component bị unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'message', content: 'Hello, server!' }));
    }
  };

  return (
    <div>
      <h2>WebSocket Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;
