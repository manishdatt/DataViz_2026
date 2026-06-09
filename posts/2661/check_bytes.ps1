$bytes = [System.IO.File]::ReadAllBytes('dashboard.html')
# Find line 418 by counting newlines
$line = 1
$startOffset = 0
for ($i = 0; $i -lt $bytes.Length; $i++) {
    if ($bytes[$i] -eq 0x0A) {
        if ($line -eq 417) {
            $startOffset = $i + 1
            break
        }
        $line++
    }
}
# Show bytes from line 418 start
$lineEnd = $startOffset
while ($lineEnd -lt $bytes.Length -and $bytes[$lineEnd] -ne 0x0A) {
    $lineEnd++
}
$lineBytes = $bytes[$startOffset..($lineEnd - 1)]
$hex = ($lineBytes | ForEach-Object { $_.ToString('X2') }) -join ' '
Write-Output ("Line 418 bytes: {0}" -f $hex)
Write-Output ("Line 418 text: {0}" -f [System.Text.Encoding]::UTF8.GetString($lineBytes))
Write-Output ("Line 418 latin1: {0}" -f [System.Text.Encoding]::GetEncoding('ISO-8859-1').GetString($lineBytes))
