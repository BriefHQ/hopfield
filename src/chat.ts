import { BaseHopfieldSchema } from './base.js';

export type ChatStream = 'streaming' | 'non-streaming';

export type BaseHopfieldChatProps<
  ModelName extends string,
  ModelStream extends ChatStream,
> = {
  model: ModelName;
  stream: ModelStream;
};

export abstract class BaseHopfieldChat<
  ModelName extends string,
  ModelStream extends ChatStream,
> extends BaseHopfieldSchema {
  model: ModelName;
  stream: ModelStream;

  constructor({
    model,
    stream,
  }: BaseHopfieldChatProps<ModelName, ModelStream>) {
    super();

    this.model = model;
    this.stream = stream;
  }
}

// // File generated from our OpenAPI spec by Stainless.

// import * as API from './';
// import * as Core from 'openai/core';
// import { APIResource } from 'openai/resource';
// import { Stream } from 'openai/streaming';

// export class Completions extends APIResource {
//   /**
//    * Creates a model response for the given chat conversation.
//    */
//   create(
//     body: CompletionCreateParams.CreateChatCompletionRequestNonStreaming,
//     options?: Core.RequestOptions,
//   ): Promise<Core.APIResponse<ChatCompletion>>;
//   create(
//     body: CompletionCreateParams.CreateChatCompletionRequestStreaming,
//     options?: Core.RequestOptions,
//   ): Promise<Core.APIResponse<Stream<ChatCompletionChunk>>>;
//   create(
//     body: CompletionCreateParams,
//     options?: Core.RequestOptions,
//   ): Promise<Core.APIResponse<ChatCompletion | Stream<ChatCompletionChunk>>> {
//     return this.post('/chat/completions', {
//       body,
//       ...options,
//       stream: body.stream ?? false,
//     });
//   }
// }

// export interface ChatCompletion {
//   id: string;

//   choices: Array<ChatCompletion.Choice>;

//   created: number;

//   model: string;

//   object: string;

//   usage?: ChatCompletion.Usage;
// }

// export namespace ChatCompletion {
//   export interface Choice {
//     finish_reason: 'stop' | 'length' | 'function_call';

//     index: number;

//     message: Choice.Message;
//   }

//   export namespace Choice {
//     export interface Message {
//       /**
//        * The role of the author of this message.
//        */
//       role: 'system' | 'user' | 'assistant' | 'function';

//       /**
//        * The contents of the message.
//        */
//       content?: string | null;

//       /**
//        * The name and arguments of a function that should be called, as generated by the
//        * model.
//        */
//       function_call?: Message.FunctionCall;
//     }

//     export namespace Message {
//       /**
//        * The name and arguments of a function that should be called, as generated by the
//        * model.
//        */
//       export interface FunctionCall {
//         /**
//          * The arguments to call the function with, as generated by the model in JSON
//          * format. Note that the model does not always generate valid JSON, and may
//          * hallucinate parameters not defined by your function schema. Validate the
//          * arguments in your code before calling your function.
//          */
//         arguments?: string;

//         /**
//          * The name of the function to call.
//          */
//         name?: string;
//       }
//     }
//   }

//   export interface Usage {
//     completion_tokens: number;

//     prompt_tokens: number;

//     total_tokens: number;
//   }
// }

// export interface ChatCompletionChunk {
//   id: string;

//   choices: Array<ChatCompletionChunk.Choice>;

//   created: number;

//   model: string;

//   object: string;
// }

// export namespace ChatCompletionChunk {
//   export interface Choice {
//     delta: Choice.Delta;

//     finish_reason: 'stop' | 'length' | 'function_call' | null;

//     index: number;
//   }

//   export namespace Choice {
//     export interface Delta {
//       /**
//        * The contents of the chunk message.
//        */
//       content?: string | null;

//       /**
//        * The name and arguments of a function that should be called, as generated by the
//        * model.
//        */
//       function_call?: Delta.FunctionCall;

//       /**
//        * The role of the author of this message.
//        */
//       role?: 'system' | 'user' | 'assistant' | 'function';
//     }

//     export namespace Delta {
//       /**
//        * The name and arguments of a function that should be called, as generated by the
//        * model.
//        */
//       export interface FunctionCall {
//         /**
//          * The arguments to call the function with, as generated by the model in JSON
//          * format. Note that the model does not always generate valid JSON, and may
//          * hallucinate parameters not defined by your function schema. Validate the
//          * arguments in your code before calling your function.
//          */
//         arguments?: string;

//         /**
//          * The name of the function to call.
//          */
//         name?: string;
//       }
//     }
//   }
// }

// export type CompletionCreateParams =
//   | CompletionCreateParams.CreateChatCompletionRequestNonStreaming
//   | CompletionCreateParams.CreateChatCompletionRequestStreaming;

// export namespace CompletionCreateParams {
//   export interface CreateChatCompletionRequestNonStreaming {
//     /**
//      * A list of messages comprising the conversation so far.
//      * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb).
//      */
//     messages: Array<CompletionCreateParams.CreateChatCompletionRequestNonStreaming.Message>;

//     /**
//      * ID of the model to use. See the
//      * [model endpoint compatibility](/docs/models/model-endpoint-compatibility) table
//      * for details on which models work with the Chat API.
//      */
//     model:
//       | (string & {})
//       | 'gpt-4'
//       | 'gpt-4-0314'
//       | 'gpt-4-0613'
//       | 'gpt-4-32k'
//       | 'gpt-4-32k-0314'
//       | 'gpt-4-32k-0613'
//       | 'gpt-3.5-turbo'
//       | 'gpt-3.5-turbo-16k'
//       | 'gpt-3.5-turbo-0301'
//       | 'gpt-3.5-turbo-0613'
//       | 'gpt-3.5-turbo-16k-0613';

//     /**
//      * Number between -2.0 and 2.0. Positive values penalize new tokens based on their
//      * existing frequency in the text so far, decreasing the model's likelihood to
//      * repeat the same line verbatim.
//      *
//      * [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
//      */
//     frequency_penalty?: number | null;

//     /**
//      * Controls how the model responds to function calls. "none" means the model does
//      * not call a function, and responds to the end-user. "auto" means the model can
//      * pick between an end-user or calling a function. Specifying a particular function
//      * via `{"name":\ "my_function"}` forces the model to call that function. "none" is
//      * the default when no functions are present. "auto" is the default if functions
//      * are present.
//      */
//     function_call?:
//       | 'none'
//       | 'auto'
//       | CompletionCreateParams.CreateChatCompletionRequestNonStreaming.FunctionCallOption;

//     /**
//      * A list of functions the model may generate JSON inputs for.
//      */
//     functions?: Array<CompletionCreateParams.CreateChatCompletionRequestNonStreaming.Function>;

//     /**
//      * Modify the likelihood of specified tokens appearing in the completion.
//      *
//      * Accepts a json object that maps tokens (specified by their token ID in the
//      * tokenizer) to an associated bias value from -100 to 100. Mathematically, the
//      * bias is added to the logits generated by the model prior to sampling. The exact
//      * effect will vary per model, but values between -1 and 1 should decrease or
//      * increase likelihood of selection; values like -100 or 100 should result in a ban
//      * or exclusive selection of the relevant token.
//      */
//     logit_bias?: Record<string, number> | null;

//     /**
//      * The maximum number of [tokens](/tokenizer) to generate in the chat completion.
//      *
//      * The total length of input tokens and generated tokens is limited by the model's
//      * context length.
//      * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb)
//      * for counting tokens.
//      */
//     max_tokens?: number;

//     /**
//      * How many chat completion choices to generate for each input message.
//      */
//     n?: number | null;

//     /**
//      * Number between -2.0 and 2.0. Positive values penalize new tokens based on
//      * whether they appear in the text so far, increasing the model's likelihood to
//      * talk about new topics.
//      *
//      * [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
//      */
//     presence_penalty?: number | null;

//     /**
//      * Up to 4 sequences where the API will stop generating further tokens.
//      */
//     stop?: string | null | Array<string>;

//     /**
//      * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be
//      * sent as data-only
//      * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
//      * as they become available, with the stream terminated by a `data: [DONE]`
//      * message.
//      * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_stream_completions.ipynb).
//      */
//     stream?: false | null;

//     /**
//      * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
//      * make the output more random, while lower values like 0.2 will make it more
//      * focused and deterministic.
//      *
//      * We generally recommend altering this or `top_p` but not both.
//      */
//     temperature?: number | null;

//     /**
//      * An alternative to sampling with temperature, called nucleus sampling, where the
//      * model considers the results of the tokens with top_p probability mass. So 0.1
//      * means only the tokens comprising the top 10% probability mass are considered.
//      *
//      * We generally recommend altering this or `temperature` but not both.
//      */
//     top_p?: number | null;

//     /**
//      * A unique identifier representing your end-user, which can help OpenAI to monitor
//      * and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
//      */
//     user?: string;
//   }

//   export namespace CreateChatCompletionRequestNonStreaming {
//     export interface Message {
//       /**
//        * The contents of the message. `content` is required for all messages, and may be
//        * null for assistant messages with function calls.
//        */
//       content: string | null;

//       /**
//        * The role of the messages author. One of `system`, `user`, `assistant`, or
//        * `function`.
//        */
//       role: 'system' | 'user' | 'assistant' | 'function';

//       /**
//        * The name and arguments of a function that should be called, as generated by the
//        * model.
//        */
//       function_call?: Message.FunctionCall;

//       /**
//        * The name of the author of this message. `name` is required if role is
//        * `function`, and it should be the name of the function whose response is in the
//        * `content`. May contain a-z, A-Z, 0-9, and underscores, with a maximum length of
//        * 64 characters.
//        */
//       name?: string;
//     }

//     export namespace Message {
//       /**
//        * The name and arguments of a function that should be called, as generated by the
//        * model.
//        */
//       export interface FunctionCall {
//         /**
//          * The arguments to call the function with, as generated by the model in JSON
//          * format. Note that the model does not always generate valid JSON, and may
//          * hallucinate parameters not defined by your function schema. Validate the
//          * arguments in your code before calling your function.
//          */
//         arguments: string;

//         /**
//          * The name of the function to call.
//          */
//         name: string;
//       }
//     }

//     export interface FunctionCallOption {
//       /**
//        * The name of the function to call.
//        */
//       name: string;
//     }

//     export interface Function {
//       /**
//        * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
//        * underscores and dashes, with a maximum length of 64.
//        */
//       name: string;

//       /**
//        * The parameters the functions accepts, described as a JSON Schema object. See the
//        * [guide](/docs/guides/gpt/function-calling) for examples, and the
//        * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
//        * documentation about the format.
//        *
//        * To describe a function that accepts no parameters, provide the value
//        * `{"type": "object", "properties": {}}`.
//        */
//       parameters: Record<string, unknown>;

//       /**
//        * A description of what the function does, used by the model to choose when and
//        * how to call the function.
//        */
//       description?: string;
//     }
//   }

//   export interface CreateChatCompletionRequestStreaming {
//     /**
//      * A list of messages comprising the conversation so far.
//      * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb).
//      */
//     messages: Array<CompletionCreateParams.CreateChatCompletionRequestStreaming.Message>;

//     /**
//      * ID of the model to use. See the
//      * [model endpoint compatibility](/docs/models/model-endpoint-compatibility) table
//      * for details on which models work with the Chat API.
//      */
//     model:
//       | (string & {})
//       | 'gpt-4'
//       | 'gpt-4-0314'
//       | 'gpt-4-0613'
//       | 'gpt-4-32k'
//       | 'gpt-4-32k-0314'
//       | 'gpt-4-32k-0613'
//       | 'gpt-3.5-turbo'
//       | 'gpt-3.5-turbo-16k'
//       | 'gpt-3.5-turbo-0301'
//       | 'gpt-3.5-turbo-0613'
//       | 'gpt-3.5-turbo-16k-0613';

//     /**
//      * If set, partial message deltas will be sent, like in ChatGPT. Tokens will be
//      * sent as data-only
//      * [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format)
//      * as they become available, with the stream terminated by a `data: [DONE]`
//      * message.
//      * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_stream_completions.ipynb).
//      */
//     stream: true;

//     /**
//      * Number between -2.0 and 2.0. Positive values penalize new tokens based on their
//      * existing frequency in the text so far, decreasing the model's likelihood to
//      * repeat the same line verbatim.
//      *
//      * [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
//      */
//     frequency_penalty?: number | null;

//     /**
//      * Controls how the model responds to function calls. "none" means the model does
//      * not call a function, and responds to the end-user. "auto" means the model can
//      * pick between an end-user or calling a function. Specifying a particular function
//      * via `{"name":\ "my_function"}` forces the model to call that function. "none" is
//      * the default when no functions are present. "auto" is the default if functions
//      * are present.
//      */
//     function_call?:
//       | 'none'
//       | 'auto'
//       | CompletionCreateParams.CreateChatCompletionRequestStreaming.FunctionCallOption;

//     /**
//      * A list of functions the model may generate JSON inputs for.
//      */
//     functions?: Array<CompletionCreateParams.CreateChatCompletionRequestStreaming.Function>;

//     /**
//      * Modify the likelihood of specified tokens appearing in the completion.
//      *
//      * Accepts a json object that maps tokens (specified by their token ID in the
//      * tokenizer) to an associated bias value from -100 to 100. Mathematically, the
//      * bias is added to the logits generated by the model prior to sampling. The exact
//      * effect will vary per model, but values between -1 and 1 should decrease or
//      * increase likelihood of selection; values like -100 or 100 should result in a ban
//      * or exclusive selection of the relevant token.
//      */
//     logit_bias?: Record<string, number> | null;

//     /**
//      * The maximum number of [tokens](/tokenizer) to generate in the chat completion.
//      *
//      * The total length of input tokens and generated tokens is limited by the model's
//      * context length.
//      * [Example Python code](https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb)
//      * for counting tokens.
//      */
//     max_tokens?: number;

//     /**
//      * How many chat completion choices to generate for each input message.
//      */
//     n?: number | null;

//     /**
//      * Number between -2.0 and 2.0. Positive values penalize new tokens based on
//      * whether they appear in the text so far, increasing the model's likelihood to
//      * talk about new topics.
//      *
//      * [See more information about frequency and presence penalties.](/docs/api-reference/parameter-details)
//      */
//     presence_penalty?: number | null;

//     /**
//      * Up to 4 sequences where the API will stop generating further tokens.
//      */
//     stop?: string | null | Array<string>;

//     /**
//      * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will
//      * make the output more random, while lower values like 0.2 will make it more
//      * focused and deterministic.
//      *
//      * We generally recommend altering this or `top_p` but not both.
//      */
//     temperature?: number | null;

//     /**
//      * An alternative to sampling with temperature, called nucleus sampling, where the
//      * model considers the results of the tokens with top_p probability mass. So 0.1
//      * means only the tokens comprising the top 10% probability mass are considered.
//      *
//      * We generally recommend altering this or `temperature` but not both.
//      */
//     top_p?: number | null;

//     /**
//      * A unique identifier representing your end-user, which can help OpenAI to monitor
//      * and detect abuse. [Learn more](/docs/guides/safety-best-practices/end-user-ids).
//      */
//     user?: string;
//   }

//   export namespace CreateChatCompletionRequestStreaming {
//     export interface Message {
//       /**
//        * The contents of the message. `content` is required for all messages, and may be
//        * null for assistant messages with function calls.
//        */
//       content: string | null;

//       /**
//        * The role of the messages author. One of `system`, `user`, `assistant`, or
//        * `function`.
//        */
//       role: 'system' | 'user' | 'assistant' | 'function';

//       /**
//        * The name and arguments of a function that should be called, as generated by the
//        * model.
//        */
//       function_call?: Message.FunctionCall;

//       /**
//        * The name of the author of this message. `name` is required if role is
//        * `function`, and it should be the name of the function whose response is in the
//        * `content`. May contain a-z, A-Z, 0-9, and underscores, with a maximum length of
//        * 64 characters.
//        */
//       name?: string;
//     }

//     export namespace Message {
//       /**
//        * The name and arguments of a function that should be called, as generated by the
//        * model.
//        */
//       export interface FunctionCall {
//         /**
//          * The arguments to call the function with, as generated by the model in JSON
//          * format. Note that the model does not always generate valid JSON, and may
//          * hallucinate parameters not defined by your function schema. Validate the
//          * arguments in your code before calling your function.
//          */
//         arguments: string;

//         /**
//          * The name of the function to call.
//          */
//         name: string;
//       }
//     }

//     export interface FunctionCallOption {
//       /**
//        * The name of the function to call.
//        */
//       name: string;
//     }

//     export interface Function {
//       /**
//        * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain
//        * underscores and dashes, with a maximum length of 64.
//        */
//       name: string;

//       /**
//        * The parameters the functions accepts, described as a JSON Schema object. See the
//        * [guide](/docs/guides/gpt/function-calling) for examples, and the
//        * [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for
//        * documentation about the format.
//        *
//        * To describe a function that accepts no parameters, provide the value
//        * `{"type": "object", "properties": {}}`.
//        */
//       parameters: Record<string, unknown>;

//       /**
//        * A description of what the function does, used by the model to choose when and
//        * how to call the function.
//        */
//       description?: string;
//     }
//   }
// }
