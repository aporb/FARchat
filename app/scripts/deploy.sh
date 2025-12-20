#!/bin/bash

# FARchat Landing Page Manual Deployment Script
# Government-compliant deployment with security checks
# Usage: ./scripts/deploy.sh [local|build|check]

set -e
set -u
set -o pipefail

ENVIRONMENT=${1:-local}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
VERSION=""

# Try to get git version, fallback to timestamp if not in git repo
if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    VERSION=$(git rev-parse --short HEAD)
else
    VERSION=$(date +"%Y%m%d_%H%M%S")
fi

echo "🚀 FARchat Landing Page v${VERSION} - Manual Deployment Only"
echo "📂 Working Directory: ${APP_DIR}"

# Color codes for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_security() {
    echo -e "${PURPLE}[SECURITY]${NC} $1"
}

# Security check function
security_checks() {
    print_security "Running government compliance security checks..."
    
    # Check for sensitive files that shouldn't be committed
    local sensitive_files=(
        "*.key"
        "*.pem" 
        "*.p12"
        "*.crt"
        "*.cert"
        ".env.production"
        "secrets"
    )
    
    for pattern in "${sensitive_files[@]}"; do
        if find "${APP_DIR}" -name "$pattern" -type f 2>/dev/null | grep -q .; then
            print_warning "Found potentially sensitive files matching: $pattern"
        fi
    done
    
    # Check for hardcoded secrets in source files
    if grep -r -i "password\|secret\|key\|token" "${APP_DIR}/src" --include="*.ts" --include="*.tsx" | grep -v "placeholder\|example\|demo\|test" | grep -q .; then
        print_warning "Potential hardcoded secrets found in source files. Please review."
    fi
    
    # Check package.json for security
    if [ -f "${APP_DIR}/package.json" ]; then
        if grep -q "file:" "${APP_DIR}/package.json"; then
            print_warning "Local file dependencies found in package.json"
        fi
    fi
    
    print_success "Security checks completed"
}

# Pre-deployment checks
pre_deployment_checks() {
    print_status "Running pre-deployment checks..."
    
    # Change to app directory
    cd "${APP_DIR}"
    
    # Check if we're in the correct directory
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Please run this script from the app directory."
        exit 1
    fi
    
    # Check Node.js version
    local node_version
    node_version=$(node --version | sed 's/v//')
    local required_major=18
    local current_major
    current_major=$(echo "$node_version" | cut -d. -f1)
    
    if [ "$current_major" -lt $required_major ]; then
        print_error "Node.js version $required_major or higher required. Current: $node_version"
        exit 1
    fi
    
    print_success "Node.js version check passed: $node_version"
    
    # Check npm version
    if ! command -v npm >/dev/null 2>&1; then
        print_error "npm not found. Please install npm."
        exit 1
    fi
    
    print_success "Pre-deployment checks completed"
}

# Install dependencies with security audit
install_dependencies() {
    print_status "Installing dependencies with security audit..."
    
    # Clean install
    npm ci
    
    # Run security audit
    print_status "Running npm security audit..."
    if ! npm audit --audit-level=moderate; then
        print_warning "Security vulnerabilities found. Consider running 'npm audit fix'"
    fi
    
    print_success "Dependencies installed successfully"
}

# Quality checks
quality_checks() {
    print_status "Running code quality checks..."
    
    # Run linting
    print_status "Running ESLint..."
    npm run lint
    
    # Run type checking
    print_status "Running TypeScript type checking..."
    npm run type-check
    
    print_success "Quality checks completed"
}

# Build application
build_application() {
    print_status "Building application for production..."
    
    # Clean previous builds
    npm run clean
    
    # Build the application
    npm run build
    
    # Test the build
    print_status "Validating build output..."
    if [ ! -d ".next" ]; then
        print_error "Build failed - .next directory not found"
        exit 1
    fi
    
    # Check if essential files exist
    local essential_files=(
        ".next/BUILD_ID"
        ".next/package.json"
    )
    
    for file in "${essential_files[@]}"; do
        if [ ! -f "$file" ]; then
            print_error "Build validation failed - $file not found"
            exit 1
        fi
    done
    
    print_success "Build completed and validated successfully!"
}

# Display deployment instructions
show_deployment_instructions() {
    print_status "Deployment Instructions:"
    echo ""
    echo "For Vercel deployment (Manual only):"
    echo "  1. Install Vercel CLI: npm install -g vercel"
    echo "  2. Login to Vercel: vercel login"
    echo "  3. Deploy: vercel --prod"
    echo ""
    echo "For other platforms:"
    echo "  - The built application is in the .next directory"
    echo "  - Use 'npm start' to run the production server"
    echo "  - Ensure Node.js 18+ is available on the target server"
    echo ""
    print_warning "Automated deployments are disabled for security compliance"
}

# Main deployment logic
main() {
    case $ENVIRONMENT in        
        "local")
            pre_deployment_checks
            security_checks
            install_dependencies
            quality_checks
            build_application
            print_status "Starting local production server..."
            print_warning "This will start a local server on port 3000"
            print_status "Press Ctrl+C to stop the server"
            npm run start
            ;;
            
        "build")
            pre_deployment_checks
            security_checks
            install_dependencies
            quality_checks
            build_application
            show_deployment_instructions
            ;;
            
        "check")
            pre_deployment_checks
            security_checks
            install_dependencies
            quality_checks
            print_success "All checks passed! Ready for deployment."
            ;;
            
        *)
            print_warning "Usage: ./scripts/deploy.sh [local|build|check]"
            echo ""
            print_status "Available commands:"
            print_status "  ./scripts/deploy.sh local    - Build and start local production server"
            print_status "  ./scripts/deploy.sh build    - Build for production deployment"
            print_status "  ./scripts/deploy.sh check    - Run all checks without building"
            echo ""
            show_deployment_instructions
            exit 0
            ;;
    esac
}

# Run main function
main "$@"