#!/usr/bin/env python3
"""
Convert pi decimal digits to hexadecimal and write to a file
Uses chunked processing for efficiency
"""
import os
import sys
from pathlib import Path

# Increase the limit for large integer string conversions
sys.set_int_max_str_digits(2000000)

# Read the pi digits from CSV
csv_path = Path(__file__).parent / "pi_digits.csv"
print(f"Reading pi digits from: {csv_path}")

pi_digits = []
with open(csv_path, 'r') as f:
    lines = f.readlines()[1:]  # Skip header
    for line in lines:
        parts = line.strip().split(',')
        pi_digits.append(int(parts[1]))

# Create decimal string: skip first digit (3), use rest for fractional part
all_pi_str = ''.join(str(d) for d in pi_digits)
pi_decimal_frac = all_pi_str[1:]  # Skip the 3

print(f"Total pi digits: {len(all_pi_str)}")
print(f"Fractional part length: {len(pi_decimal_frac)}")
print(f"First 50 decimal digits: {pi_decimal_frac[:50]}")

# Convert decimal to hexadecimal using chunked processing
print("\nConverting to hexadecimal (chunked method)...")

hex_digits = []
chunk_size = 50000  # Process 50k decimal digits at a time
num_chunks = (len(pi_decimal_frac) + chunk_size - 1) // chunk_size

for chunk_idx in range(num_chunks):
    start = chunk_idx * chunk_size
    end = min(start + chunk_size, len(pi_decimal_frac))
    chunk = pi_decimal_frac[start:end]
    
    # Convert this chunk to hex
    value = int(chunk)
    denominator = 10 ** len(chunk)
    
    # Each chunk produces roughly len(chunk) * 0.833 hex digits
    est_hex_from_chunk = int(len(chunk) * 0.833) + 1
    
    for i in range(est_hex_from_chunk):
        if value == 0:
            break
        value = value * 16
        hex_digit = value // denominator
        if hex_digit < 16:
            hex_digits.append(format(hex_digit, 'x'))
        value = value % denominator
    
    print(f"  Chunk {chunk_idx + 1}/{num_chunks}: {len(chunk)} decimal digits -> {len(hex_digits)} hex digits total")

hex_str = ''.join(hex_digits)
pi_hex = f"3.{hex_str}"

print(f"\nHexadecimal representation:")
print(f"First 100 hex digits: {pi_hex[:102]}")
print(f"Expected (first 50):  3.243f6a8885a308d313198a2e03707344a4093822299f")
print(f"Total hex digits generated: {len(hex_str)}")

# Write to file
output_path = Path(__file__).parent / "pi_hex.txt"
with open(output_path, 'w') as f:
    f.write(pi_hex)

print(f"\n✓ Written to: {output_path}")
print(f"  File size: {len(pi_hex):,} bytes")
