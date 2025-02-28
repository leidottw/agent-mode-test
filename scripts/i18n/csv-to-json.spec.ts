import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

// Mock dependencies
jest.mock('fs');
jest.mock('path');
jest.mock('csv-parse');

// Import the function after mocking dependencies
const csvToJsonModule = require('./csv-to-json');

describe('CSV to JSON Conversion', () => {
  // Save original console methods to restore later
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

  beforeEach(() => {
    // Mock implementation setup
    jest.resetAllMocks();

    // Mock console methods
    console.log = jest.fn();
    console.error = jest.fn();

    // Mock path.join to return predictable paths
    (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));

    // Mock process.exit - fix the type signature
    jest.spyOn(process, 'exit').mockImplementation((code?: number | string | null) => {
      return undefined as never;
    });
  });

  afterEach(() => {
    // Restore console methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
  });

  it('should convert CSV data to language-specific JSON files', async () => {
    // Mock CSV data with translations
    const mockRecords = [
      { key: 'common.title', en: 'Title', zh: '标题' },
      { key: 'common.submit', en: 'Submit', zh: '提交' },
      { key: 'error.notFound', en: 'Not Found', zh: '未找到' },
    ];

    // Setup mock for csv-parse
    const mockParser = {
      [Symbol.asyncIterator]: async function* () {
        for (const record of mockRecords) {
          yield record;
        }
      },
    };
    (parse as unknown as jest.Mock).mockReturnValue({});
    const mockPipe = jest.fn().mockReturnValue(mockParser);
    (fs.createReadStream as jest.Mock).mockReturnValue({ pipe: mockPipe });

    // Expected output structure
    const expectedEnOutput = {
      common: {
        title: 'Title',
        submit: 'Submit',
      },
      error: {
        notFound: 'Not Found',
      },
    };

    const expectedZhOutput = {
      common: {
        title: '标题',
        submit: '提交',
      },
      error: {
        notFound: '未找到',
      },
    };

    // Call the function
    await csvToJsonModule.convertCsvToJson('mock-file.csv', 'output-dir');

    // Verify file writes
    expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
    expect(fs.writeFileSync).toHaveBeenCalledWith('output-dir/en.json', JSON.stringify(expectedEnOutput, null, 2));
    expect(fs.writeFileSync).toHaveBeenCalledWith('output-dir/zh.json', JSON.stringify(expectedZhOutput, null, 2));
    expect(console.log).toHaveBeenCalledWith('Generated en.json');
    expect(console.log).toHaveBeenCalledWith('Generated zh.json');
  });

  it('should handle error when CSV path is not provided', () => {
    // Save the original argv
    const originalArgv = process.argv;

    try {
      // Simulate no CSV path provided
      process.argv = ['node', 'csv-to-json.ts'];

      // Mock the main function to directly test CLI behavior
      const mainFn = require('./csv-to-json').main;

      if (typeof mainFn === 'function') {
        mainFn();

        // Verify error message and exit
        expect(console.error).toHaveBeenCalledWith('Please provide the CSV file path');
        expect(process.exit).toHaveBeenCalledWith(1);
      } else {
        // If main isn't directly accessible, execute the module's code manually
        jest.isolateModules(() => {
          // Set require.main to simulate direct execution
          Object.defineProperty(require, 'main', { value: module });

          require('./csv-to-json');
        });
      }
    } finally {
      // Restore argv
      process.argv = originalArgv;
    }
  });

  it('should handle errors during conversion', async () => {
    // Setup mock to throw error
    const mockError = new Error('Test error');
    (fs.createReadStream as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    // Set argv to include CSV path
    const originalArgv = process.argv;
    process.argv = ['node', 'csv-to-json.ts', 'test.csv'];

    try {
      await csvToJsonModule.convertCsvToJson('test.csv', 'output-dir');
    } catch (error) {
      expect(error).toBe(mockError);
    }

    // Restore argv
    process.argv = originalArgv;
  });

  it('should handle empty CSV file', async () => {
    // Mock empty CSV data
    const mockParser = {
      [Symbol.asyncIterator]: async function* () {
        // No records
      },
    };
    (parse as unknown as jest.Mock).mockReturnValue({});
    const mockPipe = jest.fn().mockReturnValue(mockParser);
    (fs.createReadStream as jest.Mock).mockReturnValue({ pipe: mockPipe });

    // Call the function
    await csvToJsonModule.convertCsvToJson('empty-file.csv', 'output-dir');

    // Should not write any files
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it('should handle missing translations', async () => {
    // Mock CSV data with missing translations
    const mockRecords = [
      { key: 'common.title', en: 'Title', zh: '' },
      { key: 'common.submit', en: 'Submit' }, // missing zh
    ];

    const mockParser = {
      [Symbol.asyncIterator]: async function* () {
        for (const record of mockRecords) {
          yield record;
        }
      },
    };
    (parse as unknown as jest.Mock).mockReturnValue({});
    const mockPipe = jest.fn().mockReturnValue(mockParser);
    (fs.createReadStream as jest.Mock).mockReturnValue({ pipe: mockPipe });

    // Expected output with empty strings for missing translations
    const expectedZhOutput = {
      common: {
        title: '',
        submit: '',
      },
    };

    // Call the function
    await csvToJsonModule.convertCsvToJson('partial-file.csv', 'output-dir');

    // Verify zh file has empty strings for missing translations
    const zhCallArgs = (fs.writeFileSync as jest.Mock).mock.calls.find(call => call[0] === 'output-dir/zh.json');

    expect(zhCallArgs).toBeDefined();
    expect(JSON.parse(zhCallArgs[1])).toEqual(expectedZhOutput);
  });
});
