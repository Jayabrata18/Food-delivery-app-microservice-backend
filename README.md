#   ALL THE COMAMDS

# 1. nest new odering-app
# 2. nest new generate app orders
# 3. nest new g app users
# 4. docker volume create postgres-data
# 5. nest generate app delivery-partners

 docker system prune -a -f --volumes
 add datadog promethus grafana
 load balanceing
 dicovery
 canary management
 monitoring observability
 config management
 kuber
 ddos
 
NODE_ENV= development
NATS_URI=nats://nats
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
HTTP_PORT=3000

# API documentation

# Admin Service

User Management

GET /admin/users
POST /admin/users
GET /admin/users/{id}
PUT /admin/users/{id}
DELETE /admin/users/{id}

Restaurant Management

GET /admin/restaurants
POST /admin/restaurants
GET /admin/restaurants/{id}
PUT /admin/restaurants/{id}
DELETE /admin/restaurants/{id}

Delivery Partner Management

GET /admin/delivery-partners
POST /admin/delivery-partners
GET /admin/delivery-partners/{id}
PUT /admin/delivery-partners/{id}
DELETE /admin/delivery-partners/{id}

Analytics

GET /admin/analytics/orders: Retrieve order statistics.
GET /admin/analytics/users: Retrieve user statistics.
GET /admin/analytics/restaurants: Retrieve restaurant statistics.
GET /admin/analytics/delivery-partners: Retrieve delivery partner statistics.
GET /admin/analytics/revenue: Retrieve revenue statistics.




# Restaurant Service
1. Apply for restaurants

Menu Management


GET /restaurants/{id}/menu ✅
POST /restaurants/{id}/menu ✅
GET /restaurants/{id}/menu/{itemId}✅
PUT /restaurants/{id}/menu/{itemId}✅
PUT update price of menu✅
DELETE /restaurants/{id}/menu/{itemId}✅
PUT /restaurants/{id}/menu/{itemId} isAvailable or is not available✅

Order Management

GET /restaurants/{id}/orders✅
GET /restaurants/{id}/orders/{orderId}✅
PUT /restaurants/{id}/orders/{orderId}✅

Analytics

GET /restaurants/{id}/analytics/orders: Retrieve order statistics.✅
GET /restaurants/{id}/analytics/revenue: Retrieve revenue statistics.✅


User Service

User Profile

GET /users/{id}
PUT /users/{id}

Order Management

GET /users/{id}/orders
POST /users/{id}/orders
GET /users/{id}/orders/{orderId}
PUT /users/{id}/orders/{orderId}


Payment Management

POST /users/{id}/payments
GET /users/{id}/payments/{paymentId}
Notifications

GET /users/{id}/notifications: Retrieve notifications for the user.
POST /users/{id}/notifications: Send a notification to the user.

# Delivery Partner Service

Profile Management

GET /delivery-partners/{id}
PUT /delivery-partners/{id}
Order Management

GET /delivery-partners/{id}/orders
PUT /delivery-partners/{id}/orders/{orderId}
Analytics

GET /delivery-partners/{id}/analytics/orders: Retrieve order statistics.

# Order Service
Order Processing

GET /orders/{orderId}
PUT /orders/{orderId}
DELETE /orders/{orderId}
Order Tracking

GET /orders/{orderId}/tracking
Notifications

POST /orders/{orderId}/notifications: Send a notification related to an order.
General APIs
# Authentication

POST /auth/login
POST /auth/register
POST /auth/logout
Search

GET /search/restaurants
GET /search/menu-items

# Analytics Service
General Analytics
GET /analytics/overview: Retrieve an overview of all statistics.
GET /analytics/orders: Retrieve order statistics.
GET /analytics/users: Retrieve user statistics.
GET /analytics/restaurants: Retrieve restaurant statistics.
GET /analytics/delivery-partners: Retrieve delivery partner statistics.
GET /analytics/revenue: Retrieve revenue statistics.

# Notifications Service
Send Notifications
POST /notifications: Send a notification.
Retrieve Notifications
GET /notifications/{userId}: Retrieve notifications for a specific user.