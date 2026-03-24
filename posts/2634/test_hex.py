import os

# Read the pi digits
csv_path = r"c:\Users\bioinfo guru\OneDrive - bioinfo.guru\Documents\manishdatt\TidyT_11ty\posts\2634\pi_digits.csv"

with open(csv_path, 'r') as f:
    lines = f.readlines()[1:]  # Skip header
    digits = [int(line.strip().split(',')[1]) for line in lines]

# Create decimal representation
all_pi_digits = ''.join(str(d) for d in digits)
# Skip the first digit (3), and use only the fractional part for conversion
pi_decimal_digits = all_pi_digits[1:]  # Skip the 3
print(f'Total pi decimal digits (fractional part): {len(pi_decimal_digits)}')
print(f'All pi digits (including integer 3): {all_pi_digits[:50]}')

# Convert decimal to hexadecimal
def decimal_to_hex(decimal_string, num_hex_digits):
    hex_result = ''
    current_value = 0
    digit_index = 0
    
    for hex_idx in range(num_hex_digits):
        # Multiply current value by 16
        current_value *= 16
        
        # Add next 14 decimal digits to maintain precision
        digits_to_add = min(14, len(decimal_string) - digit_index)
        for _ in range(digits_to_add):
            if digit_index < len(decimal_string):
                current_value = current_value * 10 + int(decimal_string[digit_index])
                digit_index += 1
        
        # Extract hex digit
        divisor = 10 ** digits_to_add
        hex_digit = current_value // divisor
        hex_result += format(hex_digit, 'x')
        
        # Keep remainder
        current_value = current_value % divisor
    
    return hex_result

# Generate first 200 hex digits
print("\nGenerating hexadecimal representation...")
hex_pi = decimal_to_hex(pi_decimal_digits, 200)
print(f'Generated hex (first 100): {hex_pi[:100]}')
print(f'Expected hex  (first 100): 243f6a8885a308d313198a2e03707344a4093822299f31d0082efa98ec4e6c89452821e638d01377be5466cf34e90c6cc0ac29b7c97c50dd3f84d5b5b54709179216d5d98979fb1bd1310ba698dfb5ac2ffd72dbd01adfb7b8e1afed6a267e96ba7c9045f12c7f1418660239120e5db6169c0fbc007e23e7f68e1df5e7eb77e701a18b0ea')

# Count hex digit frequency
from collections import Counter
hex_freq = Counter(hex_pi)
print(f'\nHexadecimal digit frequencies (first 200 digits):')
for digit in '0123456789abcdef':
    print(f'{digit.upper()}: {hex_freq.get(digit, 0)}')

print(f'\nTotal hex digits generated: {len(hex_pi)}')
