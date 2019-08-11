/**
 * Represents a RGB color with optional alpha. Values range from [0 -> 1]
 */
export interface ColorRGB {
  r: number;
  b: number;
  g: number;
  a?: number;
}

/**
 * Represents a HSL color with optional alpha.
 */
export interface ColorHSL {
  h: number /** Ranges from  0->360 degrees*/;
  s: number /** Ranges from 0->1 */;
  l: number /** Ranges from 0->1 */;
  a?: number /** Ranges from 0->1 */;
}

/**
 * Represents an HSV color with optional alpha.
 */
export interface ColorHSV {
  h: number /** Ranges from  0->360 degrees*/;
  s: number /** Ranges from 0->1 */;
  v: number /** Ranges from 0->1 */;
  a?: number /** Ranges from 0->1 */;
}

/**
 * Composite type of all supported color formats.
 */
export type ColorType = string | number | ColorRGB | ColorHSL | ColorHSV;

/**
 * Type guard for determining whether a color is a ColorRGB object.
 * @param value The value to test.
 */
export function isColorRGB(value: unknown): value is ColorRGB {
  if (typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.r === 'number' &&
    typeof record.g === 'number' &&
    typeof record.b === 'number' &&
    (record.a === undefined || typeof record.a === 'number')
  );
}

/**
 * Type guard for determining whether a color is a ColorHSV object.
 * @param value The value to test.
 */
export function isColorHSV(value: unknown): value is ColorHSV {
  if (typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.h === 'number' &&
    typeof record.s === 'number' &&
    typeof record.v === 'number' &&
    (record.a === undefined || typeof record.a === 'number')
  );
}

/**
 * Type guard for determining whether a color is a ColorHSL object.
 * @param value The value to test.
 */
export function isColorHSL(value: unknown): value is ColorHSL {
  if (typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.h === 'number' &&
    typeof record.s === 'number' &&
    typeof record.l === 'number' &&
    (record.a === undefined || typeof record.a === 'number')
  );
}

export enum ColorFormat {
  STRING,
  HEX_STRING,
  NUMBER,
  RGBA_OBJECT,
  HSLA_OBJECT,
  HSVA_OBJECT
}
