function isPalindromeRecursive( str, start, end) {
    if (start >= end) {
        return true;
    }
    if (str[start] !== str[end]) {
        return false;
    }
    return isPalindromeRecursive(str, start + 1, end - 1);
}
function isPalindrome(str) {
    if(typeof str !== 'string')
        return false;
    // Remove non-alphanumeric characters and lowercase
    const cleanStr = str.replace(/[^a-z0-9]/gi, "").toLowerCase();
    return isPalindromeRecursive(cleanStr, 0, cleanStr.length - 1);
}

module.exports = isPalindrome;