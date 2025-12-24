# FARchat v0.0.1 Deployment Strategy

## Overview
This deployment strategy covers the alpha release of FARchat, a RAG chatbot for FAR/DFARS regulations. The focus is on reliable local deployment with cloud-ready architecture for future scaling.

**Tech Stack**: Streamlit + FastAPI + ChromaDB + Claude Sonnet 4  
**Timeline**: Weekend implementation  
**Scope**: Alpha testing, not production  

## 1. LOCAL DEPLOYMENT

### Development Environment Setup

#### Prerequisites
- Python 3.9+ (recommended 3.11)
- Docker Desktop
- Git
- Anthropic API key

#### Environment Setup
```bash
# Clone and setup
git clone <repository-url>
cd FARchat

# Create virtual environment
python -m venv farchat-env
source farchat-env/bin/activate  # Linux/Mac
# farchat-env\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

#### Directory Structure
```
FARchat/
├── app/
│   ├── frontend/          # Streamlit app
│   ├── backend/           # FastAPI services
│   └── shared/            # Shared utilities
├── data/
│   ├── documents/         # RAG source documents
│   └── chroma_db/         # ChromaDB persistence
├── config/
│   ├── .env.example
│   └── settings.py
├── docker/
│   ├── Dockerfile.frontend
│   ├── Dockerfile.backend
│   └── docker-compose.yml
└── requirements.txt
```

### Docker Containerization Approach

#### Multi-Container Setup
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: docker/Dockerfile.frontend
    ports:
      - "8501:8501"
    environment:
      - BACKEND_URL=http://backend:8000
    depends_on:
      - backend
    volumes:
      - ./config:/app/config:ro

  backend:
    build:
      context: .
      dockerfile: docker/Dockerfile.backend
    ports:
      - "8000:8000"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - CHROMA_PERSIST_DIRECTORY=/app/data/chroma_db
    volumes:
      - ./data:/app/data
      - ./config:/app/config:ro

  chroma:
    image: chromadb/chroma:latest
    ports:
      - "8100:8000"
    volumes:
      - ./data/chroma_db:/chroma/chroma
    environment:
      - IS_PERSISTENT=TRUE
```

#### Frontend Dockerfile
```dockerfile
# docker/Dockerfile.frontend
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/frontend ./app/frontend
COPY app/shared ./app/shared
COPY config ./config

EXPOSE 8501

HEALTHCHECK CMD curl --fail http://localhost:8501/_stcore/health

CMD ["streamlit", "run", "app/frontend/main.py", "--server.port=8501", "--server.address=0.0.0.0"]
```

#### Backend Dockerfile
```dockerfile
# docker/Dockerfile.backend
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/backend ./app/backend
COPY app/shared ./app/shared
COPY config ./config

EXPOSE 8000

HEALTHCHECK CMD curl --fail http://localhost:8000/health

CMD ["uvicorn", "app.backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Local Testing Configuration

#### Testing Commands
```bash
# Unit tests
pytest tests/unit/

# Integration tests
pytest tests/integration/

# End-to-end tests
pytest tests/e2e/

# Load testing (basic)
locust -f tests/load/locustfile.py --host=http://localhost:8000
```

#### Test Environment Setup
```bash
# Setup test environment
cp config/.env.example config/.env.test
# Edit .env.test with test-specific values

# Run with test config
ENVIRONMENT=test docker-compose up
```

### Environment Variables and Secrets Management

#### Local .env Structure
```bash
# config/.env
ENVIRONMENT=development
DEBUG=true

# API Keys
ANTHROPIC_API_KEY=your_key_here

# Database
CHROMA_PERSIST_DIRECTORY=./data/chroma_db
CHROMA_HOST=localhost
CHROMA_PORT=8100

# Frontend
STREAMLIT_SERVER_PORT=8501
BACKEND_URL=http://localhost:8000

# Logging
LOG_LEVEL=INFO
LOG_FILE=./logs/farchat.log

# Security
ALLOWED_FILE_TYPES=pdf,txt,docx
MAX_FILE_SIZE_MB=50
RATE_LIMIT_PER_MINUTE=60
```

#### Secrets Management
- Use `.env` files for local development
- Never commit `.env` files to version control
- Provide `.env.example` template
- Use Docker secrets for sensitive data in containers

## 2. CLOUD DEPLOYMENT OPTIONS

### Platform Recommendations

#### Option 1: Streamlit Community Cloud (Recommended for MVP)
**Pros:**
- Free tier available
- Direct GitHub integration
- Simple deployment
- Built-in secrets management

**Cons:**
- Limited to Streamlit apps only
- Resource limitations
- Less control over infrastructure

**Setup:**
```yaml
# .streamlit/config.toml
[server]
port = 8501

[theme]
primaryColor = "#1f77b4"
```

#### Option 2: Railway (Recommended for Full Stack)
**Pros:**
- Full-stack deployment
- Docker support
- Database hosting
- GitHub integration
- Pay-per-use pricing

**Setup:**
```yaml
# railway.toml
[build]
builder = "dockerfile"
dockerfilePath = "docker/Dockerfile.frontend"

[deploy]
healthcheckPath = "/_stcore/health"
healthcheckTimeout = 30
restartPolicyType = "on_failure"
```

#### Option 3: Digital Ocean App Platform
**Pros:**
- Container-based deployment
- Managed databases
- Static site hosting
- Predictable pricing

**Configuration:**
```yaml
# .do/app.yaml
name: farchat
services:
- name: frontend
  source_dir: /
  dockerfile_path: docker/Dockerfile.frontend
  instance_count: 1
  instance_size_slug: basic-xxs
  http_port: 8501
  
- name: backend
  source_dir: /
  dockerfile_path: docker/Dockerfile.backend
  instance_count: 1
  instance_size_slug: basic-xxs
  http_port: 8000
```

### Configuration Requirements

#### Cloud Environment Variables
```bash
# Production environment variables
ENVIRONMENT=production
DEBUG=false
ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
DATABASE_URL=${DATABASE_URL}
CHROMA_HOST=${CHROMA_HOST}
CHROMA_PORT=443
CHROMA_SSL=true
FRONTEND_URL=${FRONTEND_URL}
BACKEND_URL=${BACKEND_URL}
```

#### Health Check Endpoints
```python
# app/backend/health.py
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "version": "0.0.1",
        "services": {
            "chroma": await check_chroma_connection(),
            "anthropic": await check_anthropic_api()
        }
    }
```

### Cost Considerations

#### Estimated Monthly Costs (USD)

**Development/Testing:**
- Streamlit Cloud: Free
- Railway: $5-15/month
- Digital Ocean: $12/month

**Small Production:**
- Railway: $20-50/month
- Digital Ocean: $25-50/month
- AWS/GCP: $30-100/month

**API Costs:**
- Anthropic Claude: $0.80/1M input tokens, $2.40/1M output tokens
- Estimated: $10-50/month for moderate usage

### Scalability Planning

#### Auto-scaling Configuration
```yaml
# Kubernetes deployment example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: farchat-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: farchat-frontend
  template:
    spec:
      containers:
      - name: frontend
        image: farchat:latest
        resources:
          requests:
            cpu: 100m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 512Mi

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: farchat-frontend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: farchat-frontend
  minReplicas: 1
  maxReplicas: 5
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## 3. TECHNICAL REQUIREMENTS

### Dependencies and Requirements Files

#### requirements.txt
```txt
# Core framework
streamlit==1.29.0
fastapi==0.104.1
uvicorn[standard]==0.24.0

# AI and ML
anthropic==0.7.8
chromadb==0.4.18
langchain==0.0.340
sentence-transformers==2.2.2

# Document processing
pypdf2==3.0.1
python-docx==1.1.0
python-multipart==0.0.6

# Database and storage
sqlalchemy==2.0.23
aiosqlite==0.19.0

# Utilities
python-dotenv==1.0.0
pydantic==2.5.0
httpx==0.25.2
python-jose[cryptography]==3.3.0

# Monitoring and logging
structlog==23.2.0
prometheus-client==0.19.0

# Testing
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.25.2
locust==2.17.0
```

#### requirements-dev.txt
```txt
-r requirements.txt

# Development tools
black==23.11.0
isort==5.12.0
flake8==6.1.0
mypy==1.7.1

# Testing
pytest-cov==4.1.0
pytest-mock==3.12.0
factory-boy==3.3.0
```

### Database Persistence Strategy

#### ChromaDB Configuration
```python
# app/shared/database.py
import chromadb
from chromadb.config import Settings

def get_chroma_client():
    if settings.ENVIRONMENT == "production":
        # Cloud-hosted ChromaDB
        client = chromadb.HttpClient(
            host=settings.CHROMA_HOST,
            port=settings.CHROMA_PORT,
            ssl=settings.CHROMA_SSL
        )
    else:
        # Local persistent ChromaDB
        client = chromadb.PersistentClient(
            path=settings.CHROMA_PERSIST_DIRECTORY
        )
    
    return client

# Collection management
def setup_collections():
    client = get_chroma_client()
    
    # FAR documents collection
    far_collection = client.get_or_create_collection(
        name="far_documents",
        metadata={"hnsw:space": "cosine"}
    )
    
    # DFARS documents collection
    dfars_collection = client.get_or_create_collection(
        name="dfars_documents",
        metadata={"hnsw:space": "cosine"}
    )
    
    return far_collection, dfars_collection
```

#### Backup Strategy
```bash
#!/bin/bash
# scripts/backup_chroma.sh

BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

# Copy ChromaDB data
cp -r ./data/chroma_db $BACKUP_DIR/

# Create metadata
echo "Backup created: $(date)" > $BACKUP_DIR/metadata.txt
echo "Version: $(git rev-parse HEAD)" >> $BACKUP_DIR/metadata.txt

# Compress
tar -czf $BACKUP_DIR.tar.gz $BACKUP_DIR/
rm -rf $BACKUP_DIR/

echo "Backup created: $BACKUP_DIR.tar.gz"
```

### File Storage Handling

#### Local Storage Structure
```
data/
├── documents/
│   ├── far/              # FAR regulation files
│   ├── dfars/            # DFARS regulation files
│   └── uploads/          # User-uploaded files
├── chroma_db/            # ChromaDB persistence
├── logs/                 # Application logs
└── backups/              # Database backups
```

#### File Upload Configuration
```python
# app/backend/file_handler.py
ALLOWED_EXTENSIONS = {'.pdf', '.txt', '.docx', '.doc'}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

async def validate_file(file: UploadFile):
    # Check file size
    if file.size > MAX_FILE_SIZE:
        raise HTTPException(400, "File too large")
    
    # Check file type
    suffix = Path(file.filename).suffix.lower()
    if suffix not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, f"File type {suffix} not allowed")
    
    return True
```

### API Key Management

#### Development
```python
# config/settings.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    anthropic_api_key: str
    environment: str = "development"
    debug: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
```

#### Production
```python
# Secure API key handling
import os
from cryptography.fernet import Fernet

class SecureSettings(Settings):
    def __init__(self):
        super().__init__()
        
        # Decrypt API keys in production
        if self.environment == "production":
            key = os.environ.get("ENCRYPTION_KEY")
            if key:
                f = Fernet(key)
                self.anthropic_api_key = f.decrypt(
                    self.anthropic_api_key.encode()
                ).decode()
```

## 4. DEPLOYMENT PIPELINE

### Build Process

#### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy FARchat

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements-dev.txt
    
    - name: Run tests
      run: |
        pytest tests/ --cov=app --cov-report=xml
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Build Docker images
      run: |
        docker build -f docker/Dockerfile.frontend -t farchat-frontend .
        docker build -f docker/Dockerfile.backend -t farchat-backend .
    
    - name: Push to Registry
      run: |
        echo ${{ secrets.REGISTRY_PASSWORD }} | docker login -u ${{ secrets.REGISTRY_USER }} --password-stdin
        docker tag farchat-frontend ${{ secrets.REGISTRY_URL }}/farchat-frontend:${{ github.sha }}
        docker tag farchat-backend ${{ secrets.REGISTRY_URL }}/farchat-backend:${{ github.sha }}
        docker push ${{ secrets.REGISTRY_URL }}/farchat-frontend:${{ github.sha }}
        docker push ${{ secrets.REGISTRY_URL }}/farchat-backend:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to Production
      run: |
        # Deployment script specific to chosen platform
        # Railway example:
        curl -X POST ${{ secrets.RAILWAY_WEBHOOK }}
```

### Testing Before Deployment

#### Pre-deployment Checklist
```bash
#!/bin/bash
# scripts/pre_deploy_check.sh

echo "Running pre-deployment checks..."

# 1. Run all tests
echo "1. Running tests..."
pytest tests/ --cov=app --cov-report=term-missing
if [ $? -ne 0 ]; then
    echo "❌ Tests failed"
    exit 1
fi

# 2. Check code quality
echo "2. Checking code quality..."
black --check app/
isort --check-only app/
flake8 app/

# 3. Security scan
echo "3. Running security scan..."
bandit -r app/

# 4. Check Docker builds
echo "4. Testing Docker builds..."
docker-compose build
if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi

# 5. Integration test
echo "5. Running integration tests..."
docker-compose up -d
sleep 30
curl -f http://localhost:8501/health || exit 1
curl -f http://localhost:8000/health || exit 1
docker-compose down

echo "✅ All pre-deployment checks passed!"
```

### Deployment Steps

#### Manual Deployment Script
```bash
#!/bin/bash
# scripts/deploy.sh

set -e

ENVIRONMENT=${1:-production}
VERSION=$(git rev-parse --short HEAD)

echo "Deploying FARchat v${VERSION} to ${ENVIRONMENT}..."

# 1. Backup current state
echo "Creating backup..."
./scripts/backup_chroma.sh

# 2. Pull latest code
git pull origin main

# 3. Build new images
echo "Building Docker images..."
docker build -f docker/Dockerfile.frontend -t farchat-frontend:${VERSION} .
docker build -f docker/Dockerfile.backend -t farchat-backend:${VERSION} .

# 4. Update environment
echo "Updating environment..."
cp config/.env.${ENVIRONMENT} config/.env

# 5. Deploy with zero-downtime
echo "Deploying..."
docker-compose up -d --no-deps frontend backend

# 6. Health check
echo "Performing health checks..."
sleep 30
./scripts/health_check.sh

echo "✅ Deployment complete!"
```

### Health Checks and Monitoring

#### Health Check Script
```bash
#!/bin/bash
# scripts/health_check.sh

FRONTEND_URL=${FRONTEND_URL:-http://localhost:8501}
BACKEND_URL=${BACKEND_URL:-http://localhost:8000}

echo "Checking application health..."

# Frontend health
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL/_stcore/health)
if [ $FRONTEND_STATUS -ne 200 ]; then
    echo "❌ Frontend health check failed: $FRONTEND_STATUS"
    exit 1
fi

# Backend health
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BACKEND_URL/health)
if [ $BACKEND_STATUS -ne 200 ]; then
    echo "❌ Backend health check failed: $BACKEND_STATUS"
    exit 1
fi

# Database connectivity
CHROMA_RESPONSE=$(curl -s $BACKEND_URL/health | jq -r '.services.chroma')
if [ "$CHROMA_RESPONSE" != "healthy" ]; then
    echo "❌ ChromaDB connection failed"
    exit 1
fi

# API connectivity
ANTHROPIC_RESPONSE=$(curl -s $BACKEND_URL/health | jq -r '.services.anthropic')
if [ "$ANTHROPIC_RESPONSE" != "healthy" ]; then
    echo "❌ Anthropic API connection failed"
    exit 1
fi

echo "✅ All health checks passed!"
```

## 5. SECURITY CONSIDERATIONS

### API Key Protection

#### Environment Variable Security
```python
# app/shared/security.py
import os
from cryptography.fernet import Fernet

class APIKeyManager:
    def __init__(self):
        self.encryption_key = os.environ.get("ENCRYPTION_KEY")
        if self.encryption_key:
            self.cipher = Fernet(self.encryption_key)
    
    def encrypt_key(self, key: str) -> str:
        if self.cipher:
            return self.cipher.encrypt(key.encode()).decode()
        return key
    
    def decrypt_key(self, encrypted_key: str) -> str:
        if self.cipher:
            return self.cipher.decrypt(encrypted_key.encode()).decode()
        return encrypted_key
    
    def get_anthropic_key(self) -> str:
        encrypted_key = os.environ.get("ANTHROPIC_API_KEY")
        return self.decrypt_key(encrypted_key)
```

#### Key Rotation Strategy
```python
# app/shared/key_rotation.py
from datetime import datetime, timedelta
import asyncio

class KeyRotationManager:
    def __init__(self):
        self.key_age_limit = timedelta(days=90)
    
    async def check_key_age(self):
        key_created = datetime.fromisoformat(
            os.environ.get("API_KEY_CREATED_DATE")
        )
        
        if datetime.now() - key_created > self.key_age_limit:
            await self.notify_key_rotation_needed()
    
    async def notify_key_rotation_needed(self):
        # Send notification to administrators
        pass
```

### File Upload Security

#### File Validation
```python
# app/backend/file_security.py
import magic
from pathlib import Path
import hashlib

class FileSecurityManager:
    ALLOWED_MIME_TYPES = {
        'application/pdf',
        'text/plain',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
    
    MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB
    
    def validate_file(self, file_content: bytes, filename: str) -> bool:
        # Check file size
        if len(file_content) > self.MAX_FILE_SIZE:
            raise ValueError("File too large")
        
        # Check MIME type
        mime_type = magic.from_buffer(file_content, mime=True)
        if mime_type not in self.ALLOWED_MIME_TYPES:
            raise ValueError(f"File type {mime_type} not allowed")
        
        # Virus scanning (basic)
        if self.contains_suspicious_patterns(file_content):
            raise ValueError("File contains suspicious content")
        
        return True
    
    def contains_suspicious_patterns(self, content: bytes) -> bool:
        # Basic pattern matching for malicious content
        suspicious_patterns = [
            b'<script>',
            b'javascript:',
            b'eval(',
            b'exec('
        ]
        
        for pattern in suspicious_patterns:
            if pattern in content.lower():
                return True
        
        return False
    
    def generate_file_hash(self, content: bytes) -> str:
        return hashlib.sha256(content).hexdigest()
```

#### Secure File Storage
```python
# app/shared/storage.py
from pathlib import Path
import uuid
import os

class SecureFileStorage:
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        self.base_path.mkdir(parents=True, exist_ok=True)
    
    def store_file(self, content: bytes, original_filename: str) -> str:
        # Generate secure filename
        file_id = str(uuid.uuid4())
        file_extension = Path(original_filename).suffix
        secure_filename = f"{file_id}{file_extension}"
        
        # Create secure path
        file_path = self.base_path / secure_filename
        
        # Write file with restricted permissions
        with open(file_path, 'wb') as f:
            f.write(content)
        
        # Set restrictive permissions (owner read/write only)
        os.chmod(file_path, 0o600)
        
        return str(file_path)
```

### Basic Rate Limiting

#### Rate Limiter Implementation
```python
# app/shared/rate_limiter.py
from collections import defaultdict
from datetime import datetime, timedelta
import asyncio

class RateLimiter:
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)
    
    async def is_allowed(self, client_id: str) -> bool:
        now = datetime.now()
        minute_ago = now - timedelta(minutes=1)
        
        # Clean old requests
        self.requests[client_id] = [
            req_time for req_time in self.requests[client_id]
            if req_time > minute_ago
        ]
        
        # Check if under limit
        if len(self.requests[client_id]) >= self.requests_per_minute:
            return False
        
        # Record new request
        self.requests[client_id].append(now)
        return True

# FastAPI middleware
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, rate_limiter: RateLimiter):
        super().__init__(app)
        self.rate_limiter = rate_limiter
    
    async def dispatch(self, request: Request, call_next):
        client_ip = request.client.host
        
        if not await self.rate_limiter.is_allowed(client_ip):
            raise HTTPException(429, "Rate limit exceeded")
        
        response = await call_next(request)
        return response
```

### Error Handling and Logging

#### Secure Error Handler
```python
# app/shared/error_handler.py
import structlog
from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse

logger = structlog.get_logger()

class SecurityAwareErrorHandler:
    def __init__(self, debug: bool = False):
        self.debug = debug
    
    async def handle_error(self, request: Request, exc: Exception) -> JSONResponse:
        error_id = str(uuid.uuid4())
        
        # Log full error details
        logger.error(
            "Application error",
            error_id=error_id,
            error_type=type(exc).__name__,
            error_message=str(exc),
            path=request.url.path,
            method=request.method,
            client_ip=request.client.host
        )
        
        # Return sanitized error to client
        if self.debug:
            return JSONResponse(
                status_code=500,
                content={
                    "error": str(exc),
                    "error_id": error_id
                }
            )
        else:
            return JSONResponse(
                status_code=500,
                content={
                    "error": "Internal server error",
                    "error_id": error_id
                }
            )
```

## 6. MONITORING AND MAINTENANCE

### Basic Logging Setup

#### Structured Logging Configuration
```python
# app/shared/logging.py
import structlog
import logging
from pathlib import Path
import sys

def setup_logging(log_level: str = "INFO", log_file: str = None):
    # Configure structlog
    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_logger_name,
            structlog.stdlib.add_log_level,
            structlog.stdlib.PositionalArgumentsFormatter(),
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.UnicodeDecoder(),
            structlog.processors.JSONRenderer()
        ],
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )
    
    # Configure stdlib logging
    logging.basicConfig(
        level=getattr(logging, log_level.upper()),
        format="%(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler(log_file) if log_file else logging.NullHandler()
        ]
    )

# Usage in main application
logger = structlog.get_logger("farchat")

# Log application events
logger.info("Application started", version="0.0.1")
logger.error("Query failed", query_id=query_id, user_id=user_id)
```

#### Log Rotation Configuration
```python
# app/shared/log_rotation.py
import logging.handlers
from pathlib import Path

def setup_rotating_logs(log_dir: str = "./logs"):
    log_path = Path(log_dir)
    log_path.mkdir(parents=True, exist_ok=True)
    
    # Application logs
    app_handler = logging.handlers.RotatingFileHandler(
        log_path / "farchat.log",
        maxBytes=10*1024*1024,  # 10MB
        backupCount=5
    )
    
    # Error logs
    error_handler = logging.handlers.RotatingFileHandler(
        log_path / "errors.log",
        maxBytes=10*1024*1024,  # 10MB
        backupCount=10
    )
    error_handler.setLevel(logging.ERROR)
    
    # Access logs
    access_handler = logging.handlers.RotatingFileHandler(
        log_path / "access.log",
        maxBytes=10*1024*1024,  # 10MB
        backupCount=5
    )
    
    return app_handler, error_handler, access_handler
```

### Error Tracking

#### Error Tracking Service Integration
```python
# app/shared/error_tracking.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration

def setup_error_tracking(dsn: str = None, environment: str = "development"):
    if dsn:
        sentry_sdk.init(
            dsn=dsn,
            environment=environment,
            integrations=[
                FastApiIntegration(),
                SqlalchemyIntegration()
            ],
            traces_sample_rate=0.1,
            attach_stacktrace=True,
            send_default_pii=False
        )

# Custom error capture
def capture_error(error: Exception, context: dict = None):
    with sentry_sdk.configure_scope() as scope:
        if context:
            for key, value in context.items():
                scope.set_tag(key, value)
        sentry_sdk.capture_exception(error)
```

#### Health Monitoring
```python
# app/shared/health_monitor.py
from datetime import datetime
import psutil
import asyncio

class HealthMonitor:
    def __init__(self):
        self.start_time = datetime.now()
        self.request_count = 0
        self.error_count = 0
    
    def record_request(self):
        self.request_count += 1
    
    def record_error(self):
        self.error_count += 1
    
    def get_health_metrics(self) -> dict:
        uptime = datetime.now() - self.start_time
        
        return {
            "uptime_seconds": uptime.total_seconds(),
            "requests_total": self.request_count,
            "errors_total": self.error_count,
            "error_rate": self.error_count / max(self.request_count, 1),
            "cpu_usage": psutil.cpu_percent(),
            "memory_usage": psutil.virtual_memory().percent,
            "disk_usage": psutil.disk_usage('/').percent
        }
    
    async def check_dependencies(self) -> dict:
        results = {}
        
        # Check ChromaDB
        try:
            chroma_client = get_chroma_client()
            chroma_client.heartbeat()
            results["chroma"] = "healthy"
        except Exception as e:
            results["chroma"] = f"unhealthy: {str(e)}"
        
        # Check Anthropic API
        try:
            anthropic_client = get_anthropic_client()
            # Test with minimal request
            await anthropic_client.messages.create(
                model="claude-3-haiku-20240307",
                max_tokens=10,
                messages=[{"role": "user", "content": "test"}]
            )
            results["anthropic"] = "healthy"
        except Exception as e:
            results["anthropic"] = f"unhealthy: {str(e)}"
        
        return results
```

### Performance Monitoring

#### Basic Performance Metrics
```python
# app/shared/performance.py
import time
from functools import wraps
from prometheus_client import Counter, Histogram, generate_latest

# Prometheus metrics
REQUEST_COUNT = Counter('farchat_requests_total', 'Total requests', ['method', 'endpoint'])
REQUEST_DURATION = Histogram('farchat_request_duration_seconds', 'Request duration')
QUERY_DURATION = Histogram('farchat_query_duration_seconds', 'Query processing duration')
ERROR_COUNT = Counter('farchat_errors_total', 'Total errors', ['error_type'])

def track_performance(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        start_time = time.time()
        try:
            result = await func(*args, **kwargs)
            REQUEST_DURATION.observe(time.time() - start_time)
            return result
        except Exception as e:
            ERROR_COUNT.labels(error_type=type(e).__name__).inc()
            REQUEST_DURATION.observe(time.time() - start_time)
            raise
    return wrapper

# Metrics endpoint
@app.get("/metrics")
async def get_metrics():
    return Response(
        generate_latest(),
        media_type="text/plain"
    )
```

#### Performance Dashboard (Grafana Configuration)
```json
{
  "dashboard": {
    "title": "FARchat Performance",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(farchat_requests_total[5m])",
            "legendFormat": "Requests/sec"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, farchat_request_duration_seconds_bucket)",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(farchat_errors_total[5m])",
            "legendFormat": "Errors/sec"
          }
        ]
      }
    ]
  }
}
```

### Update and Maintenance Procedures

#### Maintenance Schedule
```yaml
# maintenance/schedule.yml
maintenance_tasks:
  daily:
    - log_rotation
    - health_checks
    - backup_verification
  
  weekly:
    - security_updates
    - dependency_updates
    - performance_review
  
  monthly:
    - full_backup
    - security_audit
    - capacity_planning_review
  
  quarterly:
    - disaster_recovery_test
    - security_penetration_test
    - architecture_review
```

#### Update Procedures
```bash
#!/bin/bash
# scripts/update.sh

set -e

echo "Starting FARchat update procedure..."

# 1. Pre-update checks
echo "Running pre-update checks..."
./scripts/health_check.sh
./scripts/backup_chroma.sh

# 2. Update dependencies
echo "Updating dependencies..."
pip list --outdated --format=json | jq -r '.[] | .name' > outdated_packages.txt

# Check for security vulnerabilities
pip-audit --format=json --output=security_report.json

# 3. Update application code
echo "Pulling latest code..."
git fetch origin
git checkout main
git pull origin main

# 4. Rebuild containers
echo "Rebuilding containers..."
docker-compose build --no-cache

# 5. Run tests
echo "Running tests..."
pytest tests/ --cov=app

# 6. Deploy updates
echo "Deploying updates..."
docker-compose up -d

# 7. Post-update verification
echo "Verifying update..."
sleep 30
./scripts/health_check.sh

echo "✅ Update completed successfully!"
```

#### Rollback Procedures
```bash
#!/bin/bash
# scripts/rollback.sh

BACKUP_VERSION=${1:-"latest"}

echo "Rolling back to version: $BACKUP_VERSION"

# 1. Stop current services
docker-compose down

# 2. Restore from backup
echo "Restoring data from backup..."
tar -xzf backups/${BACKUP_VERSION}.tar.gz -C ./

# 3. Rollback code
git checkout tags/${BACKUP_VERSION}

# 4. Rebuild and start
docker-compose build
docker-compose up -d

# 5. Verify rollback
sleep 30
./scripts/health_check.sh

echo "✅ Rollback completed!"
```

## Conclusion

This deployment strategy provides a solid foundation for FARchat v0.0.1 alpha testing with the flexibility to scale as needed. The approach emphasizes:

1. **Simplicity**: Easy local development and deployment
2. **Reliability**: Comprehensive testing and monitoring
3. **Security**: Basic but effective security measures
4. **Scalability**: Cloud-ready architecture for future growth
5. **Maintainability**: Clear procedures for updates and maintenance

The strategy balances the need for rapid deployment with proper engineering practices, ensuring FARchat can be deployed quickly for alpha testing while maintaining the foundation for future production deployment.

Next steps:
1. Set up the local development environment
2. Implement Docker containerization
3. Choose and configure cloud deployment platform
4. Set up basic monitoring and logging
5. Test deployment pipeline
6. Prepare for alpha user testing

Remember to prioritize security and monitoring even in the alpha phase, as these foundations will be crucial as the application scales.