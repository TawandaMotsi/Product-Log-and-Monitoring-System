# 📦 Product Log and Monitoring System

## 🧠 Overview
A microservice-based Product Log System that tracks all changes related to products — such as creation, updates, deletions, price changes, and stock adjustments. The goal is to ensure traceability, accountability, and auditing capabilities for product management in enterprise systems.


## 🚀 Features
- ✅ Product Catalog Management (CRUD)
- ✅ LogService to track changes (who, what, when, why)
- ✅ Log Viewer Dashboard (filterable)
- ✅ Optional user authentication
- ✅ Load testing with K6
- ✅ Python scripts for data seeding/export


## 🧱 Microservices
1. **ProductService**
   - Manages product data
   - Exposes CRUD APIs
2. **LogService**
   - Receives events from ProductService
   - Stores logs in a dedicated database
3. **UserService** (Optional)
   - Manages user sessions (for audit trail)


## 🛠️ Tech Stack
| Component      | Technology               |
|----------------|---------------------------|
| Backend        | Java (Spring Boot)        |
| Frontend       | JavaScript (ES6 or React) |
| Logging        | Custom Java Service       |
| Scripting      | Python                    |
| Container      | Docker                    |
| Orchestration  | Kubernetes                |
| Load Testing   | K6                        |
| Database       | PostgreSQL or MongoDB     |


## 🔄 Example Log Entry

{
  "productId": "12345",
  "action": "UPDATE",
  "fieldChanged": "price",
  "oldValue": "€19.99",
  "newValue": "€24.99",
  "timestamp": "2025-08-07T14:23:54Z",
  "user": "admin_user"
}
