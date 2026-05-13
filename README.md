# V&B Certifica — Plataforma Web Corporativa

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=flat-square&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel)

Rediseño completo de la plataforma web para **V&B Certifica**, organismo de certificación 
ISO y calidad turística en Chile. Proyecto desarrollado como primer trabajo freelance real, 
aplicando stack moderno y herramientas de IA para optimizar el desarrollo.

## 🌐 Demo en producción

[vyb-certifica.vercel.app](https://vyb-certifica.vercel.app)

## ✨ Funcionalidades implementadas

- **Sitio corporativo completo** con 6 páginas: Inicio, Nosotros, Servicios ISO, 
  Calidad Turística, Guías de Turismo y Contacto
- **Diseño Mobile-First** con animaciones profesionales (Framer Motion)
- **Andinita** — mascota chatbot flotante con respuestas automáticas por palabras clave, 
  lista para conectar a Claude API
- **Formulario de contacto** con envío de emails reales (Resend) y 
  guardado en base de datos (PostgreSQL/Neon)
- **Rate limiting** con Upstash Redis — protección contra bots y spam
- **Panel de administración** protegido con sidebar, estadísticas, buscador, 
  filtros y botón marcar como leída
- **SEO optimizado** con metadata por ruta
- **Deploy automático** en Vercel desde GitHub

## 🛠 Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 16, React 19, TypeScript |
| Estilos | Tailwind CSS v4, Framer Motion |
| Base de datos | PostgreSQL (Neon) + Prisma ORM |
| Emails | Resend |
| Rate Limiting | Upstash Redis |
| Deploy | Vercel |
| Control de versiones | Git + GitHub |

## 🤖 IA utilizada en el desarrollo

Este proyecto fue desarrollado con apoyo de **Claude (Anthropic)** como asistente 
de desarrollo, aplicando un enfoque pedagógico donde cada decisión técnica fue 
explicada y comprendida, no solo copiada. El uso de IA permitió:

- Acelerar el desarrollo manteniendo comprensión del código
- Resolver errores complejos de compatibilidad (Tailwind v4, Prisma v7, Next.js 16)
- Aplicar buenas prácticas de arquitectura desde el inicio
- Aprender conceptos de Full Stack en un contexto real

## 📁 Estructura del proyecto

vyb-certifica/
├── app/
│   ├── admin/          # Panel de administración protegido
│   ├── api/            # Route handlers (contacto, consultas)
│   ├── contacto/       # Página de contacto con formulario
│   ├── nosotros/       # Historia y valores de la empresa
│   └── servicios/      # ISO, Turismo, Guías
├── components/
│   ├── Navbar.tsx      # Navegación con dropdown y menú móvil
│   ├── Footer.tsx      # Footer con info de contacto
│   └── Andinita.tsx    # Mascota chatbot flotante
└── prisma/
└── schema.prisma   # Modelo de base de datos

## 👨‍💻 Autor

**Joaquín Licanqueo Irribarra**  
Estudiante de último año de Ingeniería en Informática — INACAP  
Desarrollador Web Freelance  

[![GitHub](https://img.shields.io/badge/GitHub-jlicanqueo-black?style=flat-square&logo=github)](https://github.com/jlicanqueo)
[![Email](https://img.shields.io/badge/Email-j.licanqueo.irribarra@gmail.com-red?style=flat-square&logo=gmail)](mailto:j.licanqueo.irribarra@gmail.com)

---

*Proyecto desarrollado en Mayo 2026*