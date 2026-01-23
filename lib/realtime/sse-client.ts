import type { RealtimeEvent } from "./event-types";

type EventHandler = (event: RealtimeEvent) => void;

class SSEClient {
  private eventSource: EventSource | null = null;
  private handlers: Map<string, Set<EventHandler>> = new Map();

  connect(url: string): void {
    if (this.eventSource?.readyState === EventSource.OPEN) {
      return;
    }

    try {
      this.eventSource = new EventSource(url);
      this.setupEventHandlers();
    } catch (error) {
      console.error("Failed to connect SSE:", error);
    }
  }

  private setupEventHandlers(): void {
    if (!this.eventSource) return;

    this.eventSource.onopen = () => {
      console.log("SSE connected");
    };

    this.eventSource.onmessage = (event) => {
      try {
        const data: RealtimeEvent = JSON.parse(event.data);
        this.handleEvent(data);
      } catch (error) {
        console.error("Failed to parse SSE message:", error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error("SSE error:", error);
    };
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

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.handlers.clear();
  }
}

export const sseClient = new SSEClient();
