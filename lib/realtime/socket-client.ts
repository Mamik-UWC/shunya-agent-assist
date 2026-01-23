import type { RealtimeEvent } from "./event-types";

type EventHandler = (event: RealtimeEvent) => void;

class SocketClient {
  private socket: WebSocket | null = null;
  private handlers: Map<string, Set<EventHandler>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect(url: string): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      this.socket = new WebSocket(url);
      this.setupEventHandlers();
    } catch (error) {
      console.error("Failed to connect WebSocket:", error);
      this.attemptReconnect(url);
    }
  }

  private setupEventHandlers(): void {
    if (!this.socket) return;

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      try {
        const data: RealtimeEvent = JSON.parse(event.data);
        this.handleEvent(data);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
      // Attempt to reconnect if not manually closed
      if (this.socket) {
        this.attemptReconnect(this.socket.url);
      }
    };
  }

  private attemptReconnect(url: string): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    setTimeout(() => {
      this.connect(url);
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  private handleEvent(event: RealtimeEvent): void {
    const handlers = this.handlers.get(event.type);
    if (handlers) {
      handlers.forEach((handler) => handler(event));
    }
  }

  subscribe(eventType: string, handler: EventHandler): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.handlers.get(eventType);
      if (handlers) {
        handlers.delete(handler);
      }
    };
  }

  send(event: RealtimeEvent): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(event));
    } else {
      console.warn("WebSocket is not open. Cannot send event.");
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.handlers.clear();
  }
}

export const socketClient = new SocketClient();
