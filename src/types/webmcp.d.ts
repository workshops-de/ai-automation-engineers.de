export {};

declare global {
  interface WebMCPToolContent {
    type: "text";
    text: string;
  }

  interface WebMCPToolResult {
    content: WebMCPToolContent[];
  }

  interface WebMCPSubmitEvent extends SubmitEvent {
    agentInvoked?: boolean;
    respondWith?: (response: Promise<WebMCPToolResult> | WebMCPToolResult) => void;
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

  interface WebMCPTool {
    name: string;
    description: string;
    inputSchema: WebMCPInputSchema;
    execute: (params: Record<string, unknown>) => unknown | Promise<unknown>;
  }

  interface ModelContext {
    registerTool: (tool: WebMCPTool) => void;
    unregisterTool: (name: string) => void;
  }

  interface Navigator {
    modelContext?: ModelContext;
  }
}

declare module "astro/client" {
  interface HTMLAttributes {
    toolname?: string;
    tooldescription?: string;
    toolparamdescription?: string;
    toolautosubmit?: boolean | string;
  }
}
