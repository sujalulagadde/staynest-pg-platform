$newPg = @{
    name = "Test Database Persistence PG"
    tagline = "Testing SQL Database Persistence"
    genderType = "boys"
    rentPerMonth = 8500
    securityDeposit = 12000
    totalBeds = 15
    availableBeds = 4
    sharingTypes = @("double")
    facilities = @("Wi-Fi", "Hot water")
    address = "Sector 28, Nigdi"
    area = "Nigdi"
    city = "Pune"
    pincode = "411044"
    ownerName = "Test Owner"
    ownerPhone = "+91 99999 88888"
    ownerEmail = "testowner@staynest.com"
    photos = @("https://images.unsplash.com/photo-1555854877-bab0e564b8d5")
} | ConvertTo-Json

$res = Invoke-RestMethod -Uri "http://localhost:5000/api/pgs" -Method POST -Body $newPg -ContentType "application/json"
Write-Host "1. PG Saved to Database ID:" $res.id

$all = Invoke-RestMethod -Uri "http://localhost:5000/api/pgs/all" -Method GET
Write-Host "2. Total PGs stored in database:" $all.pgs.Count

$pgId = $res.id
$del = Invoke-RestMethod -Uri "http://localhost:5000/api/pgs/$pgId" -Method DELETE
Write-Host "3. Test Cleanup Result:" $del.message
