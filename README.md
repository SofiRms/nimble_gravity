# Nimble Gravity — Bot Filter Challenge

Aplicación en React que se conecta a la API de Nimble Gravity para listar posiciones abiertas y enviar postulaciones.

---
<img width="1859" height="888" alt="image" src="https://github.com/user-attachments/assets/74e7a9d9-e773-4b95-8220-bbf32d06681d" />
-------------
<img width="1856" height="907" alt="image" src="https://github.com/user-attachments/assets/1f73a76d-7373-4b65-bfce-04831ccdb2f7" />

---
## Datos para testear

| Campo | Valor |
|---|---|
| **Email** | `ramossofiamagali679@gmail.com` |
| **Repo** | `https://github.com/SofiRms/nimble_gravity` |

---

## 🛠 Stack

| Tecnología | Uso |
|---|---|
| **React 19** | UI y manejo de estado |
| **Vite** | Bundler y dev server |
| **Tailwind CSS v3** | Estilos |
| **Lucide React** | Iconografía |

---

## Estructura del proyecto

```
src/
├── App.jsx                       
├── hooks/
│   └── useJobs.js
├── config/
│   └── api.js                       
├── services/
│   ├── candidateService.js          
│   └── jobsService.js               
├── components/
│   ├── CandidateForm.jsx           
│   ├── CandidateCard.jsx          
│   ├── JobsList.jsx                 
│   ├── JobCard.jsx                  
│   └── StatusBadge.jsx            
└── utils/
    ├── email-regex.js            
    ├── github-url.js                     
```

---

##  Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Instalar y configurar Tailwind v3
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# Correr en desarrollo
npm run dev
```

Asegurarse de que `src/index.css` tenga:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Y que `tailwind.config.js` tenga:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

---

## 🔄 Flujo de la aplicación

1. **Verificar candidato** — ingresás el email  a testear y la app consulta la API para obtener aus datos (`uuid`, `candidateId`, `applicationId`)
2. **Ingresar repo** — una vez verificado el candidato, debe proceder a ingresar la URL del repositorio de GitHub y validarla
3. **Postularse** — cada posición tiene un botón Submit que envía el POST con el body completo a la API

---

## API

Base URL: `https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/candidate/get-by-email?email=` | Obtener datos del candidato |
| `GET` | `/api/jobs/get-list` | Listar posiciones disponibles |
| `POST` | `/api/candidate/apply-to-job` | Enviar postulación |


![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white&labelColor=20232a)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-38BDF8?style=flat&logo=tailwindcss&logoColor=white&labelColor=0f172a)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black&labelColor=1e1e1e)




