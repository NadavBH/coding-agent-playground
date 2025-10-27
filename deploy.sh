#!/bin/bash

# Contoso Toyland - Azure Deployment Script
# This script deploys the infrastructure using Bicep templates

set -e

# Configuration
SUBSCRIPTION_ID="$(az account show --query id -o tsv)"
TENANT_ID="f8f89bdc-0523-4906-bd93-c082d59bfff4"
RESOURCE_GROUP_NAME="contoso-toyland-prod-rg"
LOCATION="swedencentral"
DEPLOYMENT_NAME="contoso-toyland-deployment-$(date +%s)"
BICEP_FILE="./infrastructure/main.bicep"
PARAMETERS_FILE="./infrastructure/parameters.json"

echo "=========================================="
echo "Contoso Toyland - Azure Deployment"
echo "=========================================="
echo ""
echo "Configuration:"
echo "  Subscription ID: $SUBSCRIPTION_ID"
echo "  Tenant ID: $TENANT_ID"
echo "  Resource Group: $RESOURCE_GROUP_NAME"
echo "  Location: $LOCATION"
echo "  Deployment Name: $DEPLOYMENT_NAME"
echo ""

# Step 1: Verify Azure CLI is installed
echo "[1/5] Verifying Azure CLI installation..."
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first."
    exit 1
fi
echo "✅ Azure CLI is installed"
echo ""

# Step 2: Verify Bicep CLI is installed
echo "[2/5] Verifying Bicep CLI installation..."
if ! az bicep version &> /dev/null; then
    echo "⚠️  Bicep CLI not found. Installing Bicep..."
    az bicep install
fi
echo "✅ Bicep CLI is ready"
echo ""

# Step 3: Create Resource Group
echo "[3/5] Creating Resource Group..."
if az group exists --name "$RESOURCE_GROUP_NAME" --query value -o tsv | grep -q "false"; then
    echo "  Creating new resource group: $RESOURCE_GROUP_NAME"
    az group create \
        --name "$RESOURCE_GROUP_NAME" \
        --location "$LOCATION"
else
    echo "  Resource group already exists: $RESOURCE_GROUP_NAME"
fi
echo "✅ Resource Group ready"
echo ""

# Step 4: Validate Bicep Template
echo "[4/5] Validating Bicep template..."
az deployment group validate \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --template-file "$BICEP_FILE" \
    --parameters "$PARAMETERS_FILE" \
    --query "properties.validationStatus" \
    -o table
echo "✅ Template validation passed"
echo ""

# Step 5: Deploy Infrastructure
echo "[5/5] Deploying infrastructure (this may take 10-15 minutes)..."
echo ""

DEPLOYMENT_OUTPUT=$(az deployment group create \
    --name "$DEPLOYMENT_NAME" \
    --resource-group "$RESOURCE_GROUP_NAME" \
    --template-file "$BICEP_FILE" \
    --parameters "$PARAMETERS_FILE" \
    --query "properties.outputs" \
    -o json)

echo ""
echo "=========================================="
echo "✅ Deployment Completed Successfully!"
echo "=========================================="
echo ""
echo "Deployment Outputs:"
echo ""
echo "$DEPLOYMENT_OUTPUT" | jq .
echo ""

# Extract key outputs
APP_SERVICE_URL=$(echo "$DEPLOYMENT_OUTPUT" | jq -r '.appServiceUrl.value // "N/A"')
SQL_SERVER_FQDN=$(echo "$DEPLOYMENT_OUTPUT" | jq -r '.sqlServerFqdn.value // "N/A"')
KEY_VAULT_URI=$(echo "$DEPLOYMENT_OUTPUT" | jq -r '.keyVaultUri.value // "N/A"')
LOG_ANALYTICS_WS=$(echo "$DEPLOYMENT_OUTPUT" | jq -r '.logAnalyticsWorkspaceId.value // "N/A"')
RESOURCE_GROUP=$(echo "$DEPLOYMENT_OUTPUT" | jq -r '.resourceGroupName.value // "N/A"')

echo ""
echo "=========================================="
echo "📋 Important Information"
echo "=========================================="
echo ""
echo "🌐 App Service URL: $APP_SERVICE_URL"
echo "🗄️  SQL Server FQDN: $SQL_SERVER_FQDN"
echo "🔐 Key Vault URI: $KEY_VAULT_URI"
echo "📊 Log Analytics WS ID: $LOG_ANALYTICS_WS"
echo "📦 Resource Group: $RESOURCE_GROUP"
echo ""

echo "=========================================="
echo "📝 Next Steps"
echo "=========================================="
echo ""
echo "1. Access Azure Portal:"
echo "   https://portal.azure.com/#@${TENANT_ID}/resource/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP_NAME}"
echo ""
echo "2. Configure App Service Settings:"
echo "   - Add database password to Key Vault"
echo "   - Configure custom domain (optional)"
echo "   - Enable SSL certificate"
echo ""
echo "3. Deploy Application Code:"
echo "   - Push to GitHub repository"
echo "   - Configure GitHub Actions CI/CD"
echo "   - Deploy to App Service"
echo ""
echo "4. Monitor Deployment:"
echo "   - Check Application Insights dashboard"
echo "   - Review Log Analytics workspace"
echo "   - Set up alerts"
echo ""
echo "=========================================="
echo "✨ Deployment Complete!"
echo "=========================================="
