import type { Refs } from '../Refs.js';
import { type JsonSchema7Type, parseDef } from '../parseDef.js';
import type { JsonSchema7AllOfType } from './intersection.js';
import type { ZodPipelineDef } from 'zod';

export const parsePipelineDef = (
  def: ZodPipelineDef<any, any>,
  refs: Refs,
): JsonSchema7AllOfType | JsonSchema7Type | undefined => {
  if (refs.pipeStrategy === 'input') {
    return parseDef(def.in._def, refs);
  }

  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, 'allOf', '0'],
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, 'allOf', a ? '1' : '0'],
  });

  return {
    allOf: [a, b].filter((x): x is JsonSchema7Type => x !== undefined),
  };
};
