# PowerShell script to kill process on a specific port
param(
    [Parameter(Mandatory=$true)]
    [int]$Port
)

Write-Host "Finding process on port $Port..."

$process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($process) {
    Write-Host "Found process ID: $process"
    $processInfo = Get-Process -Id $process -ErrorAction SilentlyContinue
    if ($processInfo) {
        Write-Host "Process: $($processInfo.ProcessName) (PID: $process)"
        $confirm = Read-Host "Kill this process? (Y/N)"
        if ($confirm -eq 'Y' -or $confirm -eq 'y') {
            Stop-Process -Id $process -Force
            Write-Host "Process killed successfully!"
        } else {
            Write-Host "Cancelled."
        }
    }
} else {
    Write-Host "No process found on port $Port"
}

