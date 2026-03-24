#!/usr/bin/env python3
"""
Find the largest (longest) palindrome in pi decimal digits
"""
import sys
from pathlib import Path

# Read the pi digits from CSV
csv_path = Path(__file__).parent / "pi_digits.csv"
print(f"Reading pi digits from: {csv_path}")

pi_digits = []
with open(csv_path, 'r') as f:
    lines = f.readlines()[1:]  # Skip header
    for line in lines:
        parts = line.strip().split(',')
        pi_digits.append(str(parts[1]))

# Create decimal string (all digits including the first 3)
pi_decimal_str = ''.join(pi_digits)
print(f"Total pi digits: {len(pi_decimal_str)}")
print(f"Pi decimal (first 100): {pi_decimal_str[:100]}")

# Find longest palindrome efficiently using expanding center approach
def find_longest_palindrome(s):
    """
    Find the longest palindrome substring using expanding center approach
    Time: O(n^2), Space: O(1)
    """
    if not s or len(s) < 1:
        return ""
    
    longest_palindrome = ""
    longest_length = 0
    
    def expand_around_center(left, right):
        """Expand around center and return palindrome"""
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]
    
    print("Searching for palindromes...")
    for i in range(len(s)):
        # Odd length palindromes (single character center)
        p1 = expand_around_center(i, i)
        if len(p1) > longest_length:
            longest_length = len(p1)
            longest_palindrome = p1
            if longest_length > 1:
                print(f"  Found at position {i - longest_length//2}: length {longest_length}: {p1[:50]}...")
        
        # Even length palindromes (two character center)
        p2 = expand_around_center(i, i + 1)
        if len(p2) > longest_length:
            longest_length = len(p2)
            longest_palindrome = p2
            print(f"  Found at position {i - longest_length//2 + 1}: length {longest_length}: {p2[:50]}...")
        
        if (i + 1) % 100000 == 0:
            print(f"  Searched up to position {i + 1}...")
    
    return longest_palindrome, longest_length

# Find the longest palindrome
print("\nSearching for longest palindrome...\n")
longest_pal, pal_length = find_longest_palindrome(pi_decimal_str)

print(f"\n{'='*80}")
print(f"RESULT: Longest palindrome found!")
print(f"{'='*80}")
print(f"Length: {pal_length} digits")
print(f"Palindrome: {longest_pal}")

# Find position in original string
if longest_pal:
    position = pi_decimal_str.find(longest_pal)
    print(f"Position (0-indexed): {position}")
    print(f"Position (1-indexed): {position + 1}")
    
    # Show surrounding context
    context_start = max(0, position - 10)
    context_end = min(len(pi_decimal_str), position + pal_length + 10)
    surrounding = pi_decimal_str[context_start:context_end]
    print(f"\nSurrounding context:")
    print(f"  ...{surrounding}...")
    print(f"  {'':>{position - context_start + 3}}{'_' * pal_length}")

# Save result to file
output_path = Path(__file__).parent / "pi_palindrome.txt"
with open(output_path, 'w') as f:
    f.write(f"Longest Palindrome in Pi Decimal Digits\n")
    f.write(f"{'='*80}\n")
    f.write(f"Length: {pal_length}\n")
    f.write(f"Position: {position + 1} (1-indexed)\n")
    f.write(f"Palindrome:\n{longest_pal}\n")

print(f"\n✓ Result saved to: {output_path}")
