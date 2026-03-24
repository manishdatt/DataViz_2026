#!/usr/bin/env python3
"""
Find all non-trivial palindromes in pi decimal digits
(excludes palindromes made of repeated digits like 44, 555, 666, etc.)
"""
import sys
import json
from pathlib import Path
from collections import defaultdict

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

def is_trivial_palindrome(s):
    """Check if palindrome is made of only repeated digits (trivial)"""
    # A trivial palindrome has all characters the same
    return len(set(s)) == 1

def find_all_nontrivial_palindromes(s, min_length=2):
    """
    Find all non-trivial palindromes (excluding repeated digits)
    Returns list of (palindrome, length, position)
    """
    palindromes = []
    
    def expand_around_center(left, right):
        """Expand around center and return palindrome"""
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]
    
    print(f"Searching for all non-trivial palindromes (min length: {min_length})...")
    trivial_count = 0
    
    for i in range(len(s)):
        # Odd length palindromes (single character center)
        p1 = expand_around_center(i, i)
        if len(p1) >= min_length:
            if is_trivial_palindrome(p1):
                trivial_count += 1
            else:
                pos = s.find(p1, max(0, i - len(p1)))
                palindromes.append({
                    'palindrome': p1,
                    'length': len(p1),
                    'position': pos
                })
        
        # Even length palindromes (two character center)
        p2 = expand_around_center(i, i + 1)
        if len(p2) >= min_length:
            if is_trivial_palindrome(p2):
                trivial_count += 1
            else:
                pos = s.find(p2, max(0, i - len(p2)))
                palindromes.append({
                    'palindrome': p2,
                    'length': len(p2),
                    'position': pos
                })
        
        if (i + 1) % 100000 == 0:
            print(f"  Searched up to position {i + 1}... Found {len(palindromes)} non-trivial palindromes so far ({trivial_count} trivial excluded)")
    
    print(f"  Total trivial palindromes excluded: {trivial_count}")
    return palindromes

# Find all non-trivial palindromes (min length 2)
print("\nSearching for all non-trivial palindromes...\n")
all_nontrivial_palindromes = find_all_nontrivial_palindromes(pi_decimal_str, min_length=2)

# Remove duplicates and keep unique palindromes
unique_nontrivial = {}
for pal_data in all_nontrivial_palindromes:
    key = pal_data['palindrome']
    if key not in unique_nontrivial:
        unique_nontrivial[key] = pal_data

print(f"\nTotal non-trivial palindrome occurrences: {len(all_nontrivial_palindromes)}")
print(f"Unique non-trivial palindromes: {len(unique_nontrivial)}")

# Calculate frequency by length
frequency_by_length = defaultdict(int)
for pal_data in all_nontrivial_palindromes:
    length = pal_data['length']
    frequency_by_length[length] += 1

# Sort by length
sorted_lengths = sorted(frequency_by_length.keys())
print(f"\nNon-trivial Palindrome length distribution:")
print(f"{'Length':<10} {'Frequency':<10}")
print(f"{'-'*20}")
for length in sorted_lengths:
    count = frequency_by_length[length]
    print(f"{length:<10} {count:<10}")

# Prepare data for JSON export
nontrivial_stats = {
    'total_palindromes': len(all_nontrivial_palindromes),
    'unique_palindromes': len(unique_nontrivial),
    'frequency_by_length': {int(k): v for k, v in frequency_by_length.items()},
    'all_palindromes': list(unique_nontrivial.values())[:1000]  # Save top 1000 unique
}

# Save to JSON file
output_path = Path(__file__).parent / "pi_palindromes_nontrivial.json"
with open(output_path, 'w') as f:
    json.dump(nontrivial_stats, f, indent=2)

print(f"\n✓ Results saved to: {output_path}")
print(f"  Total non-trivial palindrome occurrences: {nontrivial_stats['total_palindromes']}")
print(f"  Unique non-trivial palindromes: {nontrivial_stats['unique_palindromes']}")

# Also save a summary file
summary_path = Path(__file__).parent / "pi_palindrome_nontrivial_summary.txt"
with open(summary_path, 'w') as f:
    f.write("Non-Trivial Palindrome Analysis of Pi Decimal Digits\n")
    f.write("(Excludes repeated digit palindromes like 44, 555, 666, etc.)\n")
    f.write("="*80 + "\n\n")
    f.write(f"Total Non-Trivial Palindrome Occurrences: {nontrivial_stats['total_palindromes']}\n")
    f.write(f"Unique Non-Trivial Palindromes: {nontrivial_stats['unique_palindromes']}\n\n")
    f.write("Frequency by Length:\n")
    f.write(f"{'Length':<10} {'Frequency':<10}\n")
    f.write("-"*20 + "\n")
    for length in sorted_lengths:
        count = frequency_by_length[length]
        f.write(f"{length:<10} {count:<10}\n")

print(f"✓ Summary saved to: {summary_path}")
