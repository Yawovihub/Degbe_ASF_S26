const  isPalindrome  = require('../src/palindrome');

describe('isPalindrome() recursion test', () => {

    describe('Basic Palindromes', () => {
        test('should return true for a simple palindrome', () => {
            expect(isPalindrome("racecar")).toBe(true);
        });

        test('should return true for an even-length palindrome', () => {
            expect(isPalindrome("noon")).toBe(true);
        });

        test('should return false for non-palindromes', () => {
            expect(isPalindrome("hello")).toBe(false);
        });
    });

    describe('String Cleaning testing', () => {
        test('should ignore capitalization', () => {
            expect(isPalindrome("RaceCar")).toBe(true);
        });

        test('should ignore spaces and punctuation', () => {
            const complex = "A man, a plan, a canal: Panama";
            expect(isPalindrome(complex)).toBe(true);
        });

        test('should handle strings with numbers', () => {
            expect(isPalindrome("12321")).toBe(true);
            expect(isPalindrome("12345")).toBe(false);
        });
    });

    describe('Empty, Single Character and other type Inputs', () => {
        test('should return true for an empty string', () => {
            expect(isPalindrome("")).toBe(true);
        });

        test('should return true for a single character', () => {
            expect(isPalindrome("a")).toBe(true);
        });
    });

    test('should return false for anything other than strings', () => {
        let isBoolean = true;
        let array = [" abc "];
        expect(isPalindrome(12321)).toBe(false);
        expect(isPalindrome(array)).toBe(false);
        expect(isPalindrome(isBoolean)).toBe(false);
        expect(isPalindrome(undefined)).toBe(false);
        expect(isPalindrome(null)).toBe(false);
        expect(isPalindrome(Boolean)).toBe(false);
    });
});
