export {};

declare global {
  // Content block as defined in the WebMCP proposal (aligns with MCP ContentBlock)
  type WebMCPContentBlock = {
    type: "text";
    text: string;
  };

  interface WebMCPToolResult {
    content: WebMCPContentBlock[];
  }

  // Second parameter passed to execute() by the browser agent
  interface WebMCPAgent {
    requestUserInteraction: <T>(fn: () => Promise<T>) => Promise<T>;
  }

  // Augmented SubmitEvent fired by the browser when an agent invokes a declarative form tool
  interface WebMCPSubmitEvent extends SubmitEvent {
    agentInvoked?: boolean;
    respondWith?: (response: WebMCPToolResult | Promise<WebMCPToolResult>) => void;
  }

  interface WebMCPInputSchema {
    type: "object";
    properties?: Record<
      string,
      {
        type: string;
        description?: string;
        enum?: string[];
        format?: string;
      }
    >;
    required?: string[];
  }

  interface WebMCPToolRegistration {
    name: string;
    description: string;
    inputSchema?: WebMCPInputSchema;
    execute: (
      params: Record<string, unknown>,
      agent: WebMCPAgent,
    ) => WebMCPToolResult | Promise<WebMCPToolResult>;
  }

  interface WebMCPRegisterToolOptions {
    signal?: AbortSignal;
  }

  interface ModelContext {
    registerTool: (
      tool: WebMCPToolRegistration,
      options?: WebMCPRegisterToolOptions,
    ) => void;
    unregisterTool: (name: string) => void;
  }

  interface Navigator {
    modelContext?: ModelContext;
    modelContextTesting?: {
      listTools: () => Array<{ name: string; description: string; inputSchema: string }>;
      executeTool: (name: string, argsJson: string) => Promise<string | null>;
    };
  }
}

// Extend Astro's HTML element attribute types so toolname / tooldescription etc.
// can be used on plain HTML elements in .astro files without TS errors.
declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    toolname?: string;
    tooldescription?: string;
    toolparamdescription?: string;
    toolautosubmit?: boolean | string;
  }
}
