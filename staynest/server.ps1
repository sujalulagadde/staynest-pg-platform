# StayNest Standalone PowerShell Database & File Upload REST Server
$port = 5000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

$uploadsDir = "C:\Users\HP\.gemini\antigravity\scratch\staynest\uploads"
if (!(Test-Path $uploadsDir)) { New-Item -ItemType Directory -Path $uploadsDir -Force }

$dbPath = "C:\Users\HP\.gemini\antigravity\scratch\staynest\staynest_db.json"

# Default Seed Data
$seedData = @{
    users = @(
        @{ id = "user-1"; name = "Rohan Sharma"; username = "rohan123"; email = "rohan@student.com"; password = "password123"; role = "student" },
        @{ id = "user-2"; name = "Rajesh Patil"; username = "rajesh_owner"; email = "rajesh@staynest.com"; password = "password123"; role = "owner" },
        @{ id = "admin-1"; name = "PCCOE Administrator"; username = "staynest.pccoe"; email = "admin@pccoe.edu"; password = "sujal.pccoe"; role = "admin" }
    );
    colleges = @(
        @{ id = "col-1"; name = "Pimpri Chinchwad College of Engineering (PCCOE)"; code = "PCCOE"; city = "Pune"; state = "Maharashtra"; area = "Akurdi / Nigdi"; image = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80"; lat = 18.6517; lng = 73.7616 },
        @{ id = "col-2"; name = "College of Engineering Pune (COEP Technological University)"; code = "COEP"; city = "Pune"; state = "Maharashtra"; area = "Shivajinagar"; image = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"; lat = 18.5293; lng = 73.8565 }
    );
    pgs = @(
        @{
            id = "pg-101"; ownerId = "user-2"; name = "Sunrise Luxury Student Living"; tagline = "Premium Boys PG with modern study lounge & high-speed Wi-Fi";
            genderType = "boys"; rentPerMonth = 7500; securityDeposit = 10000; extraChargesDescription = "Electricity billed at ₹9/unit on actual sub-meter reading.";
            totalBeds = 24; availableBeds = 5; sharingTypes = @("double", "triple");
            facilities = @("Wi-Fi", "Hot water", "24-hour water", "Washing machine", "CCTV", "Security", "Study table", "Cupboard", "Bed", "Electricity backup", "Housekeeping", "Attached bathroom");
            photos = @("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80");
            address = "Plot 42, Sector 26, Pradhikaran, Akurdi"; area = "Akurdi"; city = "Pune"; state = "Maharashtra"; pincode = "411044";
            lat = 18.6502; lng = 73.7645; googleMapUrl = "https://maps.google.com/?q=18.6502,73.7645";
            ownerName = "Rajesh Patil"; ownerPhone = "+91 98220 12345"; ownerEmail = "rajesh@staynest.com";
            verifiedStatus = "verified"; rating = 4.7; totalReviews = 48; foodAvailable = $true;
            foodDetails = "3 Meals daily (Pure Veg). Unlimited Breakfast, Lunch, and Dinner with Sunday Special.";
            nearbyColleges = @(@{ collegeId = "col-1"; collegeName = "PCCOE"; distanceKm = 0.6; travelTimeMins = 7 })
        },
        @{
            id = "pg-102"; ownerId = "user-2"; name = "Sai Krupa Girls PG & Hostel"; tagline = "Safe, secure & homely accommodation for female students";
            genderType = "girls"; rentPerMonth = 6800; securityDeposit = 8000; extraChargesDescription = "Includes Wi-Fi, Water & Maintenance. No hidden costs.";
            totalBeds = 18; availableBeds = 2; sharingTypes = @("single", "double", "triple");
            facilities = @("Wi-Fi", "Hot water", "24-hour water", "Washing machine", "CCTV", "Security", "Study table", "Cupboard", "Bed", "Attached bathroom", "Mess/Food", "Housekeeping");
            photos = @("https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=1000&q=80");
            address = "Near Station Road, Sector 24, Pradhikaran"; area = "Akurdi"; city = "Pune"; state = "Maharashtra"; pincode = "411044";
            lat = 18.6489; lng = 73.7680; googleMapUrl = "https://maps.google.com/?q=18.6489,73.7680";
            ownerName = "Sunita Deshmukh"; ownerPhone = "+91 94231 88900"; ownerEmail = "saikrupa.pg@staynest-demo.com";
            verifiedStatus = "verified"; rating = 4.8; totalReviews = 62; foodAvailable = $true;
            foodDetails = "Homely Maharashtrian Veg food prepared under hygienic supervision.";
            nearbyColleges = @(@{ collegeId = "col-1"; collegeName = "PCCOE"; distanceKm = 0.9; travelTimeMins = 10 })
        }
    );
    reviews = @()
}

if (!(Test-Path $dbPath)) {
    $seedData | ConvertTo-Json -Depth 10 | Set-Content -Path $dbPath -Encoding UTF8
}

function Get-DB {
    return Get-Content -Path $dbPath -Raw | ConvertFrom-Json
}

function Save-DB ($dbObj) {
    $dbObj | ConvertTo-Json -Depth 10 | Set-Content -Path $dbPath -Encoding UTF8
}

Write-Host "🚀 StayNest Database API Server active at http://localhost:$port/"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response

        # CORS Headers
        $res.AddHeader("Access-Control-Allow-Origin", "*")
        $res.AddHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
        $res.AddHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if ($req.HttpMethod -eq "OPTIONS") {
            $res.StatusCode = 200
            $res.Close()
            continue
        }

        $urlPath = $req.Url.AbsolutePath

        # 1. SERVE STATIC UPLOADED IMAGES FROM DISK /uploads/
        if ($urlPath.StartsWith("/uploads/")) {
            $fileName = $urlPath.Replace("/uploads/", "")
            $filePath = Join-Path $uploadsDir $fileName
            if (Test-Path $filePath) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $res.ContentType = "image/jpeg"
                $res.ContentLength64 = $bytes.Length
                $res.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $res.StatusCode = 404
            }
            $res.Close()
            continue
        }

        # READ REQUEST BODY JSON IF PRESENT
        $bodyText = ""
        if ($req.HasEntityBody) {
            $reader = New-Object System.IO.StreamReader($req.InputStream, $req.ContentEncoding)
            $bodyText = $reader.ReadToEnd()
            $reader.Close()
        }

        $db = Get-DB

        # 2. UPLOAD IMAGE FILE TO DISK (Option 2)
        if ($urlPath -eq "/api/upload" -and $req.HttpMethod -eq "POST") {
            $json = $bodyText | ConvertFrom-Json
            $photoUrls = @()

            if ($json.dataUrl) {
                # Base64 Upload -> Convert and Save to Disk
                $base64 = $json.dataUrl
                if ($base64.Contains(",")) { $base64 = $base64.Split(",")[1] }
                $bytes = [System.Convert]::FromBase64String($base64)
                $fileName = "pg-img-" + [DateTime]::Now.Ticks + ".jpg"
                $diskFile = Join-Path $uploadsDir $fileName
                [System.IO.File]::WriteAllBytes($diskFile, $bytes)
                $photoUrls += "http://localhost:$port/uploads/$fileName"
            } elseif ($json.photos) {
                $photoUrls = $json.photos
            }

            $out = @{ success = $true; photos = $photoUrls } | ConvertTo-Json
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        # 3. DELETE IMAGE FILE FROM DISK
        if ($urlPath -eq "/api/upload/delete" -and $req.HttpMethod -eq "POST") {
            $json = $bodyText | ConvertFrom-Json
            if ($json.photoUrl -and $json.photoUrl.Contains("/uploads/")) {
                $fileName = $json.photoUrl.Split("/uploads/")[1]
                $diskFile = Join-Path $uploadsDir $fileName
                if (Test-Path $diskFile) {
                    Remove-Item -Path $diskFile -Force
                    Write-Host "🗑️ Deleted image from disk: $fileName"
                }
            }
            $out = @{ success = $true; message = "Image removed from disk" } | ConvertTo-Json
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        # 4. GET PUBLIC VERIFIED PGS
        if ($urlPath -eq "/api/pgs" -and $req.HttpMethod -eq "GET") {
            $verified = @($db.pgs | Where-Object { $_.verifiedStatus -eq "verified" })
            $out = @{ success = $true; pgs = $verified } | ConvertTo-Json -Depth 10
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        # 5. GET ALL PGS FOR ADMIN / OWNER
        if ($urlPath -eq "/api/pgs/all" -and $req.HttpMethod -eq "GET") {
            $out = @{ success = $true; pgs = $db.pgs } | ConvertTo-Json -Depth 10
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        # 6. POST NEW PG (OWNER SUBMISSION)
        if ($urlPath -eq "/api/pgs" -and $req.HttpMethod -eq "POST") {
            $newPg = $bodyText | ConvertFrom-Json
            if (!$newPg.id) { $newPg | Add-Member -MemberType NoteProperty -Name "id" -Value ("pg-user-" + [DateTime]::Now.Ticks) }
            $newPg | Add-Member -MemberType NoteProperty -Name "verifiedStatus" -Value "pending" -Force
            
            $db.pgs += $newPg
            Save-DB $db

            $out = @{ success = $true; id = $newPg.id; message = "PG property submitted for Admin verification." } | ConvertTo-Json
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        # 7. UPDATE BEDS AVAILABLE
        if ($urlPath.StartsWith("/api/pgs/") -and $urlPath.EndsWith("/beds") -and $req.HttpMethod -eq "PATCH") {
            $parts = $urlPath.Split("/")
            $pgId = $parts[3]
            $json = $bodyText | ConvertFrom-Json
            
            foreach ($p in $db.pgs) {
                if ($p.id -eq $pgId) {
                    $p.availableBeds = [Math]::Max(0, [int]$json.availableBeds)
                }
            }
            Save-DB $db

            $out = @{ success = $true; message = "Beds updated" } | ConvertTo-Json
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        # 8. DELETE PG PROPERTY AND REMOVE DISK IMAGES (Option 2 Deletion)
        if ($urlPath.StartsWith("/api/pgs/") -and $req.HttpMethod -eq "DELETE") {
            $parts = $urlPath.Split("/")
            $pgId = $parts[3]

            $targetPg = $db.pgs | Where-Object { $_.id -eq $pgId }
            if ($targetPg) {
                if ($targetPg.photos) {
                    foreach ($photoUrl in $targetPg.photos) {
                        if ($photoUrl.Contains("/uploads/")) {
                            $fileName = $photoUrl.Split("/uploads/")[1]
                            $diskFile = Join-Path $uploadsDir $fileName
                            if (Test-Path $diskFile) {
                                Remove-Item -Path $diskFile -Force
                                Write-Host "🗑️ Unlinked photo on property delete: $fileName"
                            }
                        }
                    }
                }
                $db.pgs = @($db.pgs | Where-Object { $_.id -ne $pgId })
                Save-DB $db
            }

            $out = @{ success = $true; message = "Property and associated disk images deleted." } | ConvertTo-Json
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        # 9. ADMIN LOGIN & APPROVAL STATUS
        if ($urlPath -eq "/api/admin/login" -and $req.HttpMethod -eq "POST") {
            $json = $bodyText | ConvertFrom-Json
            if ($json.adminLoginId -eq "staynest.pccoe" -and $json.adminPassword -eq "sujal.pccoe") {
                $out = @{ success = $true; admin = @{ id = "admin-1"; username = "staynest.pccoe"; name = "PCCOE Administrator" } } | ConvertTo-Json
            } else {
                $res.StatusCode = 401
                $out = @{ error = "Invalid Admin Credentials" } | ConvertTo-Json
            }
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        if ($urlPath.StartsWith("/api/admin/pgs/") -and $urlPath.EndsWith("/status") -and $req.HttpMethod -eq "PATCH") {
            $parts = $urlPath.Split("/")
            $pgId = $parts[4]
            $json = $bodyText | ConvertFrom-Json

            foreach ($p in $db.pgs) {
                if ($p.id -eq $pgId) {
                    $p.verifiedStatus = $json.status
                }
            }
            Save-DB $db

            $out = @{ success = $true; status = $json.status } | ConvertTo-Json
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        # 10. USER LOGIN & SIGNUP
        if ($urlPath -eq "/api/auth/login" -and $req.HttpMethod -eq "POST") {
            $json = $bodyText | ConvertFrom-Json
            $q = $json.emailOrUsername.ToLower().Trim()
            $user = $db.users | Where-Object { ($_.email.ToLower() -eq $q -or $_.username.ToLower() -eq $q) -and $_.password -eq $json.password }
            if ($user) {
                $out = @{ success = $true; user = $user } | ConvertTo-Json
            } else {
                $res.StatusCode = 401
                $out = @{ error = "Invalid credentials" } | ConvertTo-Json
            }
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        if ($urlPath -eq "/api/auth/signup" -and $req.HttpMethod -eq "POST") {
            $json = $bodyText | ConvertFrom-Json
            $newUser = @{
                id = "user-" + [DateTime]::Now.Ticks;
                name = $json.name.Trim();
                username = $json.username.Trim();
                email = $json.email.Trim();
                password = $json.password;
                role = if ($json.role) { $json.role } else { "student" }
            }
            $db.users += $newUser
            Save-DB $db

            $out = @{ success = $true; user = $newUser } | ConvertTo-Json
            $buf = [System.Text.Encoding]::UTF8.GetBytes($out)
            $res.ContentType = "application/json"
            $res.OutputStream.Write($buf, 0, $buf.Length)
            $res.Close()
            continue
        }

        # DEFAULT RESPONSE IF UNMATCHED ROUTE
        $res.StatusCode = 404
        $res.Close()
    } catch {
        # continue loop
    }
}
