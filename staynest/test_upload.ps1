$payload = @{
    dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:5000/api/upload" -Method POST -Body $payload -ContentType "application/json"
Write-Host "Upload Response:" ($res | ConvertTo-Json)

$files = Get-ChildItem "C:\Users\HP\.gemini\antigravity\scratch\staynest\uploads"
Write-Host "Files in uploads directory:" $files.Count
