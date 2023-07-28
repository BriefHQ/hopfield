import type OpenAI from 'openai';

import {
  type DefaultChatN,
  type InferInput,
  type InferInputMessage,
  type InferResult,
  defaultChatN,
} from './chat.js';
import {
  type DefaultEmbeddingCount,
  defaultEmbeddingCount,
} from './embedding.js';
import { OpenAIChat, OpenAIChatSchema } from './openai/chat/non-streaming.js';
import { OpenAIEmbedding, OpenAIEmbeddingSchema } from './openai/embedding.js';
import { OpenAIFunction } from './openai/function.js';
import {
  type DefaultOpenAIChatModelName,
  type DefaultOpenAIEmbeddingModelName,
  type OpenAIChatModelName,
  type OpenAIEmbeddingModelName,
  defaultOpenAIChatModelName,
  defaultOpenAIEmbeddingModelName,
} from './openai/models.js';

const template = {
  function: OpenAIFunction.templates,
} as const;

function providerFunction<Provider extends OpenAI>(provider: Provider) {
  function chat(): OpenAIChat<
    Provider,
    DefaultOpenAIChatModelName,
    DefaultChatN
  >;
  function chat<ModelName extends OpenAIChatModelName>(
    model: ModelName,
  ): OpenAIChat<Provider, ModelName, DefaultChatN>;
  function chat<ModelName extends OpenAIChatModelName, N extends number>(
    model: ModelName,
    n: N,
  ): OpenAIChat<Provider, ModelName, N>;
  function chat<ModelName extends OpenAIChatModelName, N extends number>(
    model?: ModelName,
    n?: N,
  ) {
    return new OpenAIChat({
      provider,
      model: model ?? (defaultOpenAIChatModelName as ModelName),
      n: n ?? (defaultChatN as N),
    });
  }

  function embedding(): OpenAIEmbedding<
    Provider,
    DefaultOpenAIEmbeddingModelName,
    DefaultEmbeddingCount
  >;
  function embedding<ModelName extends OpenAIEmbeddingModelName>(
    model: ModelName,
  ): OpenAIEmbedding<Provider, ModelName, DefaultEmbeddingCount>;
  function embedding<
    ModelName extends OpenAIEmbeddingModelName,
    EmbeddingCount extends number,
  >(
    model: ModelName,
    count: EmbeddingCount,
  ): OpenAIEmbedding<Provider, ModelName, EmbeddingCount>;
  function embedding<
    ModelName extends OpenAIEmbeddingModelName,
    EmbeddingCount extends number,
  >(model?: ModelName, count?: EmbeddingCount) {
    return new OpenAIEmbedding({
      provider,
      model: model ?? (defaultOpenAIEmbeddingModelName as ModelName),
      count: count ?? (defaultEmbeddingCount as EmbeddingCount),
    });
  }

  return {
    chat,
    embedding,
    function: OpenAIFunction.function,

    template,
  };
}

function chat(): OpenAIChatSchema<DefaultOpenAIChatModelName, DefaultChatN>;
function chat<ModelName extends OpenAIChatModelName>(
  model: ModelName,
): OpenAIChatSchema<ModelName, DefaultChatN>;
function chat<ModelName extends OpenAIChatModelName, N extends number>(
  model: ModelName,
  n: N,
): OpenAIChatSchema<ModelName, N>;
function chat<ModelName extends OpenAIChatModelName, N extends number>(
  model?: ModelName,
  n?: N,
) {
  return new OpenAIChatSchema({
    model: model ?? (defaultOpenAIChatModelName as ModelName),
    n: n ?? (defaultChatN as N),
  });
}

function embedding(): OpenAIEmbeddingSchema<
  DefaultOpenAIEmbeddingModelName,
  DefaultEmbeddingCount
>;
function embedding<ModelName extends OpenAIEmbeddingModelName>(
  model: ModelName,
): OpenAIEmbeddingSchema<ModelName, DefaultEmbeddingCount>;
function embedding<
  ModelName extends OpenAIEmbeddingModelName,
  EmbeddingCount extends number,
>(
  model: ModelName,
  count: EmbeddingCount,
): OpenAIEmbeddingSchema<ModelName, EmbeddingCount>;
function embedding<
  ModelName extends OpenAIEmbeddingModelName,
  EmbeddingCount extends number,
>(model?: ModelName, count?: EmbeddingCount) {
  return new OpenAIEmbeddingSchema({
    model: model ?? (defaultOpenAIEmbeddingModelName as ModelName),
    count: count ?? (defaultEmbeddingCount as EmbeddingCount),
  });
}

const fn = OpenAIFunction.function;

export {
  chat,
  embedding,
  fn as function,
  providerFunction as provider,
  template,
};

export type {
  InferInput as inferInput,
  InferInputMessage as inferMessageInput,
  InferResult as inferResult,
};

export type * from './openai/chat/non-streaming.js';
export type * from './openai/chat/streaming.js';

export * from './errors.js';
export * from './types.js';
