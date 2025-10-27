# Contoso Toyland - Azure Deployment Script (PowerShell)
# This script deploys the infrastructure using Bicep templates

$ErrorActionPreference = "Stop"

# Configuration
$SubscriptionId = (az account show --query id -o tsv)
$TenantId = "f8f89bdc-0523-4906-bd93-c082d59bfff4"
$ResourceGroupName = "contoso-toyland-prod-rg"
$Location = "swedencentral"
$DeploymentName = "contoso-toyland-deployment-$(Get-Date -Format 'yyyyMMddHHmmss')"
$BicepFile = "./infrastructure/main.bicep"
$ParametersFile = "./infrastructure/parameters.json"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Contoso Toyland - Azure Deployment" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration:" -ForegroundColor Green
Write-Host "  Subscription ID: $SubscriptionId"
Write-Host "  Tenant ID: $TenantId"
Write-Host "  Resource Group: $ResourceGroupName"
Write-Host "  Location: $Location"
Write-Host "  Deployment Name: $DeploymentName"
Write-Host ""

# Step 1: Verify Azure CLI is installed
Write-Host "[1/5] Verifying Azure CLI installation..." -ForegroundColor Yellow
try {
    $azVersion = az --version
    Write-Host "✅ Azure CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Azure CLI is not installed. Please install it first." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 2: Verify Bicep CLI is installed
Write-Host "[2/5] Verifying Bicep CLI installation..." -ForegroundColor Yellow
try {
    az bicep version | Out-Null
    Write-Host "✅ Bicep CLI is ready" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Bicep CLI not found. Installing Bicep..." -ForegroundColor Yellow
    az bicep install
}
Write-Host ""

# Step 3: Create Resource Group
Write-Host "[3/5] Creating Resource Group..." -ForegroundColor Yellow
$rgExists = (az group exists --name "$ResourceGroupName" --query value -o tsv)
if ($rgExists -eq "false") {
    Write-Host "  Creating new resource group: $ResourceGroupName" -ForegroundColor Cyan
    az group create `
        --name "$ResourceGroupName" `
        --location "$Location"
} else {
    Write-Host "  Resource group already exists: $ResourceGroupName" -ForegroundColor Cyan
}
Write-Host "✅ Resource Group ready" -ForegroundColor Green
Write-Host ""

# Step 4: Validate Bicep Template
Write-Host "[4/5] Validating Bicep template..." -ForegroundColor Yellow
az deployment group validate `
    --resource-group "$ResourceGroupName" `
    --template-file "$BicepFile" `
    --parameters "$ParametersFile" `
    --query "properties.validationStatus" `
    -o table
Write-Host "✅ Template validation passed" -ForegroundColor Green
Write-Host ""

# Step 5: Deploy Infrastructure
Write-Host "[5/5] Deploying infrastructure (this may take 10-15 minutes)..." -ForegroundColor Yellow
Write-Host ""

$DeploymentOutput = az deployment group create `
    --name "$DeploymentName" `
    --resource-group "$ResourceGroupName" `
    --template-file "$BicepFile" `
    --parameters "$ParametersFile" `
    --query "properties.outputs" `
    -o json | ConvertFrom-Json

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ Deployment Completed Successfully!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Deployment Outputs:" -ForegroundColor Green
Write-Host ""
$DeploymentOutput | ConvertTo-Json | Write-Host
Write-Host ""

# Extract key outputs
$AppServiceUrl = $DeploymentOutput.appServiceUrl.value ?? "N/A"
$SqlServerFqdn = $DeploymentOutput.sqlServerFqdn.value ?? "N/A"
$KeyVaultUri = $DeploymentOutput.keyVaultUri.value ?? "N/A"
$LogAnalyticsWs = $DeploymentOutput.logAnalyticsWorkspaceId.value ?? "N/A"
$ResourceGroup = $DeploymentOutput.resourceGroupName.value ?? "N/A"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "📋 Important Information" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 App Service URL: $AppServiceUrl" -ForegroundColor Cyan
Write-Host "🗄️  SQL Server FQDN: $SqlServerFqdn" -ForegroundColor Cyan
Write-Host "🔐 Key Vault URI: $KeyVaultUri" -ForegroundColor Cyan
Write-Host "📊 Log Analytics WS ID: $LogAnalyticsWs" -ForegroundColor Cyan
Write-Host "📦 Resource Group: $ResourceGroup" -ForegroundColor Cyan
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "📝 Next Steps" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Access Azure Portal:" -ForegroundColor Yellow
Write-Host "   https://portal.azure.com/#@${TenantId}/resource/subscriptions/${SubscriptionId}/resourceGroups/${ResourceGroupName}"
Write-Host ""
Write-Host "2. Configure App Service Settings:" -ForegroundColor Yellow
Write-Host "   - Add database password to Key Vault"
Write-Host "   - Configure custom domain (optional)"
Write-Host "   - Enable SSL certificate"
Write-Host ""
Write-Host "3. Deploy Application Code:" -ForegroundColor Yellow
Write-Host "   - Push to GitHub repository"
Write-Host "   - Configure GitHub Actions CI/CD"
Write-Host "   - Deploy to App Service"
Write-Host ""
Write-Host "4. Monitor Deployment:" -ForegroundColor Yellow
Write-Host "   - Check Application Insights dashboard"
Write-Host "   - Review Log Analytics workspace"
Write-Host "   - Set up alerts"
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✨ Deployment Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
