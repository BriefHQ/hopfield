import { getRefs } from '../Refs.js';
import { parseTupleDef } from './tuple.js';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

describe('objects', () => {
  it('should be possible to describe a simple tuple schema', () => {
    const schema = z.tuple([z.string(), z.number()]);

    const parsedSchema = parseTupleDef(schema._def, getRefs());
    const expectedSchema = {
      type: 'array',
      items: [{ type: 'string' }, { type: 'number' }],
      minItems: 2,
      maxItems: 2,
    };
    expect(parsedSchema).toStrictEqual(expectedSchema);
  });

  it('should be possible to describe a tuple schema with rest()', () => {
    const schema = z.tuple([z.string(), z.number()]).rest(z.boolean());

    const parsedSchema = parseTupleDef(schema._def, getRefs());
    const expectedSchema = {
      type: 'array',
      items: [{ type: 'string' }, { type: 'number' }],
      minItems: 2,
      additionalItems: {
        type: 'boolean',
      },
    };
    expect(parsedSchema).toStrictEqual(expectedSchema);
  });
});
