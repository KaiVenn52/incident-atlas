$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$reviewArchivePath = Join-Path (Get-Location) 'deliverables/IncidentAtlas-local-review.zip'
$reviewArchive = [IO.Compression.ZipFile]::OpenRead($reviewArchivePath)
try {
    $reviewManifestReader = [IO.StreamReader]::new($reviewArchive.GetEntry('MANIFEST.json').Open())
    try { $reviewManifest = $reviewManifestReader.ReadToEnd() | ConvertFrom-Json } finally { $reviewManifestReader.Dispose() }
    foreach ($reviewEntry in $reviewArchive.Entries) {
        if ($reviewEntry.FullName -match '(^node_modules/|^dist/|^deliverables/|^private-onboarding/|(^|/)\.env$|(^|/)acceptance-approval\.local\.json$|^evidence/(acceptance/)?live-|^evidence/(submission-demo|IncidentAtlas-submission-demo\.mp4$)|(^|/)\.\./)') { throw "Excluded or unsafe file in archive: $($reviewEntry.FullName)" }
    }
    foreach ($reviewRequiredFile in @('scripts/live-acceptance.mjs','lib/live-acceptance.mjs','fixtures/acceptance-input.json','acceptance-approval.example.json','submission/LIVE-ACCEPTANCE.md')) {
        if (-not $reviewArchive.GetEntry($reviewRequiredFile)) { throw "Missing acceptance entry: $reviewRequiredFile" }
    }
    foreach ($reviewFile in $reviewManifest.files) {
        $reviewEntry = $reviewArchive.GetEntry($reviewFile.path)
        if (-not $reviewEntry) { throw "Missing archive entry: $($reviewFile.path)" }
        $reviewEntryStream = $reviewEntry.Open()
        $reviewHasher = [Security.Cryptography.SHA256]::Create()
        try { $reviewDigest = [BitConverter]::ToString($reviewHasher.ComputeHash($reviewEntryStream)).Replace('-', '').ToLowerInvariant() } finally { $reviewHasher.Dispose(); $reviewEntryStream.Dispose() }
        if ($reviewDigest -ne $reviewFile.sha256) { throw "Archive hash mismatch: $($reviewFile.path)" }
    }
    $reviewFileStream = [IO.File]::OpenRead($reviewArchivePath)
    $reviewArchiveHasher = [Security.Cryptography.SHA256]::Create()
    try { $reviewArchiveHash = [BitConverter]::ToString($reviewArchiveHasher.ComputeHash($reviewFileStream)).Replace('-', '').ToLowerInvariant() } finally { $reviewArchiveHasher.Dispose(); $reviewFileStream.Dispose() }
    Set-Content -LiteralPath 'deliverables/IncidentAtlas-local-review.zip.sha256' -Value "$reviewArchiveHash  IncidentAtlas-local-review.zip"
    @{ verified = $true; entries = $reviewArchive.Entries.Count; bytes = (Get-Item -LiteralPath $reviewArchivePath).Length; sha256 = $reviewArchiveHash; secretsIncluded = $false } | ConvertTo-Json
} finally { $reviewArchive.Dispose() }
