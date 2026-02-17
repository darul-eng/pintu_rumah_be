import { Injectable, BadRequestException } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';

export interface ParsedSvgResult {
  rawSvg: string;
  extractedIds: string[];
}

@Injectable()
export class SvgParserService {
  private readonly parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      allowBooleanAttributes: true,
    });
  }

  /**
   * Parse SVG file buffer and extract all element IDs
   */
  parseSvgFile(fileBuffer: Buffer): ParsedSvgResult {
    const rawSvg = fileBuffer.toString('utf-8');
    return this.parseSvgString(rawSvg);
  }

  /**
   * Parse SVG string and extract all element IDs
   */
  parseSvgString(svgContent: string): ParsedSvgResult {
    // Validate that it's an SVG
    if (!this.isValidSvg(svgContent)) {
      throw new BadRequestException(
        'Invalid SVG format. File must contain valid SVG markup.',
      );
    }

    const extractedIds = this.extractIds(svgContent);

    if (extractedIds.length === 0) {
      throw new BadRequestException(
        'No valid IDs found in SVG. Please ensure SVG elements have id attributes for unit mapping.',
      );
    }

    return {
      rawSvg: svgContent,
      extractedIds,
    };
  }

  /**
   * Validate if content is valid SVG
   */
  private isValidSvg(content: string): boolean {
    const trimmed = content.trim();
    // Check if it starts with SVG tag or XML declaration followed by SVG
    const hasSvgTag = /<svg[\s>]/i.test(trimmed);
    const hasClosingSvg = /<\/svg>/i.test(trimmed);
    return hasSvgTag && hasClosingSvg;
  }

  /**
   * Extract all IDs from SVG elements recursively
   */
  private extractIds(svgContent: string): string[] {
    const ids: Set<string> = new Set();

    try {
      const parsed = this.parser.parse(svgContent);
      this.extractIdsRecursive(parsed, ids);
    } catch {
      // Fallback to regex extraction if XML parsing fails
      const regexIds = this.extractIdsWithRegex(svgContent);
      regexIds.forEach((id) => ids.add(id));
    }

    // Filter out common non-unit IDs (like gradients, filters, etc.)
    const filteredIds = Array.from(ids).filter((id) => this.isUnitId(id));

    return filteredIds.sort();
  }

  /**
   * Recursively extract IDs from parsed XML object
   */
  private extractIdsRecursive(
    obj: Record<string, unknown>,
    ids: Set<string>,
  ): void {
    if (!obj || typeof obj !== 'object') return;

    for (const key of Object.keys(obj)) {
      const value = obj[key];

      // Check for id attribute
      if (key === '@_id' && typeof value === 'string' && value.trim()) {
        ids.add(value.trim());
      }

      // Recurse into nested objects and arrays
      if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === 'object') {
            this.extractIdsRecursive(item as Record<string, unknown>, ids);
          }
        }
      } else if (typeof value === 'object' && value !== null) {
        this.extractIdsRecursive(value as Record<string, unknown>, ids);
      }
    }
  }

  /**
   * Fallback: Extract IDs using regex
   */
  private extractIdsWithRegex(svgContent: string): string[] {
    const idRegex = /\bid=["']([^"']+)["']/gi;
    const ids: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = idRegex.exec(svgContent)) !== null) {
      if (match[1] && match[1].trim()) {
        ids.push(match[1].trim());
      }
    }

    return ids;
  }

  /**
   * Filter out non-unit IDs (gradients, filters, masks, etc.)
   * Unit IDs typically follow patterns like: A1, B-01, BLOK-A1, unit-1, etc.
   */
  private isUnitId(id: string): boolean {
    const nonUnitPatterns = [
      /^(linear|radial)?gradient/i,
      /^filter/i,
      /^mask/i,
      /^clip/i,
      /^pattern/i,
      /^symbol/i,
      /^marker/i,
      /^defs/i,
      /^style/i,
      /^__/,
      /^_x/i,
    ];

    for (const pattern of nonUnitPatterns) {
      if (pattern.test(id)) {
        return false;
      }
    }

    return true;
  }
}
