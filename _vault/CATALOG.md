# 🗂️ Skill Vault Catalog (ดัชนีค้นหาสกิลสำรอง)

เอกสารฉบับนี้รวบรวมรายชื่อและคีย์เวิร์ดของสกิลทั้งหมด **336 สกิล** ที่เก็บอยู่ใน `_vault/skills/` โดย AI จะใช้เอกสารนี้เพื่อ **ค้นหาและดึงสกิลมาใช้งานให้อัตโนมัติทันที** เมื่อผู้ใช้สั่งงานเกี่ยวกับหัวข้อนั้นๆ

---

## 1. ภาษาและเฟรมเวิร์กยอดนิยม (Languages & Frameworks)

### 🐍 Python
- **`python-patterns`** / **`python-testing`**: แนวทางเขียน Python แบบ Modern และเขียน Test ด้วย pytest
- **`fastapi-patterns`**: ออกแบบ REST API ด้วย FastAPI, Pydantic, และ Async
- **`django-patterns`** / **`django-celery`** / **`django-security`** / **`django-tdd`** / **`django-verification`**: สกิลครบวงจรสำหรับ Django

### 🦀 Rust
- **`rust-patterns`**: Best practices การเขียน Rust, Memory Safety, Lifetimes, Traits
- **`rust-testing`**: การเขียน Unit Test, Integration Test และ Benchmark ใน Rust

### 🐹 Go (Golang)
- **`golang-patterns`**: Idiomatic Go, Goroutines, Channels, Interface design
- **`golang-testing`**: Unit test, Fuzzing, Table-driven tests ใน Go

### ⚡ C & C++
- **`cpp-coding-standards`**: Modern C++ (C++17/20), Smart pointers, RAII
- **`cpp-testing`**: GoogleTest, Catch2, CMake testing

### 🎯 C# & .NET / F#
- **`dotnet-patterns`**: ASP.NET Core, Dependency Injection, Clean Architecture
- **`csharp-testing`**: xUnit, NUnit, Moq
- **`fsharp-testing`**: Functional testing ใน F#

### ☕ Java & JVM Ecosystem
- **`java-coding-standards`**: Modern Java, Concurrency, Stream API
- **`springboot-patterns`** / **`springboot-security`** / **`springboot-tdd`** / **`springboot-verification`**: ชุดสกิลสำหรับ Spring Boot
- **`quarkus-patterns`** / **`quarkus-security`** / **`quarkus-tdd`**: สำหรับ Cloud-native Quarkus
- **`jpa-patterns`** / **`mybatis-patterns`**: ORM และ Database Access ใน Java

### 🟣 Kotlin
- **`kotlin-patterns`** / **`kotlin-testing`**: Idiomatic Kotlin
- **`kotlin-coroutines-flows`**: การจัดการ Concurrency ด้วย Coroutines และ Reactive Flows
- **`kotlin-ktor-patterns`**: พัฒนา Backend ด้วย Ktor
- **`kotlin-exposed-patterns`**: SQL library สำหรับ Kotlin

### 🐘 PHP & Laravel
- **`laravel-patterns`** / **`laravel-security`** / **`laravel-tdd`** / **`laravel-verification`**: ชุดสกิลพัฒนาเว็บด้วย Laravel

### 💎 Ruby & Rails
- **`rails-patterns`**: Ruby on Rails Best Practices, Active Record, MVC

### 🐫 Perl
- **`perl-patterns`** / **`perl-security`** / **`perl-testing`**

---

## 2. เว็บและฟรอนต์เอนด์ (Frontend & Web Ecosystem)

- **React:** `react-patterns`, `react-performance`, `react-testing`
- **React Native:** `react-native-patterns`
- **Vue.js:** `vue-patterns`, `ui-to-vue`
- **Next.js & Turbopack:** `nextjs-turbopack`
- **Nuxt:** `nuxt4-patterns`
- **Angular:** `angular-developer`
- **Vite & Bun:** `vite-patterns`, `bun-runtime`

---

## 3. โมบายล์แอปพลิเคชัน (Mobile Development)

- **iOS & Swift:** `swiftui-patterns`, `swift-concurrency-6-2`, `swift-actor-persistence`, `swift-protocol-di-testing`, `ios-icon-gen`
- **Android:** `android-clean-architecture`, `compose-multiplatform-patterns`
- **Flutter & Dart:** `dart-flutter-patterns`, `flutter-dart-code-review`

---

## 4. ฐานข้อมูลและแคช (Databases & Cache)

- **`prisma-patterns`**: Prisma ORM ใน Node.js / TypeScript
- **`redis-patterns`**: In-memory Caching, Redis Pub/Sub, Data Structures
- **`mysql-patterns`**: MySQL Schema, Indexing, Performance
- **`clickhouse-io`**: High-performance Analytics DB
- **`database-migrations`**: เครื่องมือและแพทเทิร์นการทำ Database Schema Migration

---

## 5. DevOps, Cloud & Network

- **`kubernetes-patterns`**: Kubernetes manifests, Deployments, Services, Helm
- **`deployment-patterns`**: CI/CD, Blue-Green, Canary deployments
- **`cisco-ios-patterns`** / **`netmiko-ssh-automation`**: สคริปต์ควบคุมอุปกรณ์ Network
- **Homelab:** `homelab-network-setup`, `homelab-pihole-dns`, `homelab-wireguard-vpn`, `homelab-vlan-segmentation`

---

## 6. AI, Machine Learning & Data Science

- **`pytorch-patterns`**: Deep learning with PyTorch
- **`mle-workflow`**: Machine Learning Engineering lifecycle
- **`recsys-pipeline-architect`**: Recommendation systems
- **`data-scraper-agent`**: Web scraping pipelines
- **`deepseek-harness-setup`**: LLM Evaluation & Harness

---

## 7. วิดีโอ กราฟิก และแอนิเมชัน (Media & Video)

- **`video-editing`** / **`videodb`**: ตัดต่อและจัดการวิดีโอผ่านโค้ด
- **`remotion-video-creation`**: สร้างวิดีโอด้วย React (Remotion)
- **`manim-video`**: สร้างคณิตศาสตร์และ Animation ด้วย Manim (เหมือน 3Blue1Brown)
- **`blender-motion-state-inspection`**: 3D & Blender scripts

---

## 8. ระบบออร์เคสเตรตฟีเจอร์ของ ECC (Feature Orchestrators)

- **`orch-build-mvp`**: ออร์เคสเตรตสร้างแอป MVP ใหม่ตั้งแต่ต้น
- **`orch-add-feature`**: เพิ่มฟีเจอร์ใหม่ลงในระบบเดิม
- **`orch-fix-defect`**: แก้ไขข้อผิดพลาดเชิงลึก
- **`orch-refine-code`**: ปรับปรุงโครงสร้างโค้ด Refactor
