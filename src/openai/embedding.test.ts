import { expect, it, test } from 'vitest';

import {
  openaiBasicEmbedding,
  openaiTiktokenEmbedding,
  openaiTiktokenTwoEmbeddings,
  openaiTwoEmbeddings,
} from '../_test/openai-embedding.js';
import { openai } from '../_test/openai.js';
import hop from '../index.js';
import * as Exports from './embedding.js';

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "OpenAIEmbeddingSchema",
      "OpenAIEmbedding",
    ]
  `);
});

test('should set a default model name', async () => {
  expect(hop.provider(openai).embedding().model).toMatchInlineSnapshot(
    '"text-embedding-ada-002"',
  );
});

test('all test messages', async () => {
  const allTests = [openaiBasicEmbedding, openaiTiktokenEmbedding];

  const testChat = hop.embedding();

  const allTypes: hop.inferResult<typeof testChat>[] = [];

  for (const message of allTests) {
    const output = testChat.returnType.parse(message);
    allTypes.push({
      ...output,
      data: output.data.map((d) => ({
        ...d,
        embedding: `${d.embedding[0]},...,${d.embedding[1535]}`,
      })) as any,
    });
  }

  expect(allTypes).toMatchInlineSnapshot(`
    [
      {
        "data": [
          {
            "embedding": "-0.0073538395,...,-0.001287617",
            "index": 0,
            "object": "embedding",
          },
        ],
        "model": "text-embedding-ada-002-v2",
        "object": "list",
        "usage": {
          "prompt_tokens": 2,
          "total_tokens": 2,
        },
      },
      {
        "data": [
          {
            "embedding": "-0.025408603,...,-0.024730118",
            "index": 0,
            "object": "embedding",
          },
        ],
        "model": "text-embedding-ada-002-v2",
        "object": "list",
        "usage": {
          "prompt_tokens": 6,
          "total_tokens": 6,
        },
      },
    ]
  `);
});

test('all n=2 messages', async () => {
  const allTests = [openaiTwoEmbeddings, openaiTiktokenTwoEmbeddings];

  const testChat = hop.embedding('text-embedding-ada-002', 2);

  const allTypes: hop.inferResult<typeof testChat>[] = [];

  for (const message of allTests) {
    const output = testChat.returnType.parse(message);
    allTypes.push({
      ...output,
      data: output.data.map((d) => ({
        ...d,
        embedding: `${d.embedding[0]},...,${d.embedding[1535]}`,
      })) as any,
    });
  }

  expect(allTypes).toMatchInlineSnapshot(`
    [
      {
        "data": [
          {
            "embedding": "-0.0073666335,...,-0.0013916683",
            "index": 0,
            "object": "embedding",
          },
          {
            "embedding": "-0.010871813,...,0.0046854005",
            "index": 1,
            "object": "embedding",
          },
        ],
        "model": "text-embedding-ada-002-v2",
        "object": "list",
        "usage": {
          "prompt_tokens": 5,
          "total_tokens": 5,
        },
      },
      {
        "data": [
          {
            "embedding": "-0.02534904,...,-0.024684511",
            "index": 0,
            "object": "embedding",
          },
          {
            "embedding": "-0.01885367,...,-0.027140701",
            "index": 1,
            "object": "embedding",
          },
        ],
        "model": "text-embedding-ada-002-v2",
        "object": "list",
        "usage": {
          "prompt_tokens": 12,
          "total_tokens": 12,
        },
      },
    ]
  `);
});
