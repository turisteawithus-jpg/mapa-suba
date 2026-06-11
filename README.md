# Mapa Tecnologico de Suba

Aplicacion web interactiva con un mapa tecnologico, holografico y futurista de la localidad de Suba (Bogota, Colombia). Visualiza pines informativos georreferenciados sobre un mapa oscuro estilo cyberpunk, con poligonos de UPZ en colores neon, busqueda inteligente y tarjetas de informacion holograficas con imagenes y video embebido.

## Caracteristicas

- **Mapa interactivo** con Leaflet y capa CartoDB Dark Matter
- **Poligonos de UPZ** de Suba con colores neon semitransparentes
- **Pines interactivos** con flyTo cinematico
- **Tarjeta holografica lateral** con Framer Motion (imagen, video embebido, descarga)
- **Buscador inteligente** de UPZ, barrios y direcciones
- **Panel de administracion** (/admin) con formulario CRUD protegido por Clerk
- **Sincronizacion en tiempo real** con Supabase Realtime
- **Autenticacion perimetral** con Clerk (Restricted Mode + Allowlist)

## Stack Tecnologico

- React + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Leaflet.js (mapas)
- Framer Motion (animaciones)
- Supabase (base de datos + realtime)
- Clerk (autenticacion)
- React Router (navegacion)

## Configuracion de Variables de Entorno

Crea un archivo `.env` en la raiz del proyecto con las siguientes variables:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...

# Supabase Database
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

## Instalacion Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para produccion
npm run build
```

---

# GUIA DETALLADA DE DESPLIEGUE PARA PRINCIPIANTES

## Paso 1: Subir el codigo a GitHub

### 1.1 Crear un repositorio en GitHub
1. Ve a [github.com](https://github.com) e inicia sesion en tu cuenta.
2. Haz clic en el boton **"+"** en la esquina superior derecha y selecciona **"New repository"**.
3. Escribe un nombre para tu repositorio, por ejemplo: `mapa-tecnologico-suba`.
4. Deja el repositorio como **Public** (o Private si prefieres).
5. **NO** inicialices el repositorio con README, .gitignore ni licencia (ya tenemos estos archivos).
6. Haz clic en **"Create repository"**.
7. Copia la URL del repositorio (por ejemplo: `https://github.com/TUUSUARIO/mapa-tecnologico-suba.git`).

### 1.2 Subir el codigo desde tu computadora

**Si estas usando la terminal:**

```bash
# Navega a la carpeta del proyecto
cd /ruta/al/proyecto

# Inicializa Git
git init

# Agrega todos los archivos
git add .

# Crea el primer commit
git commit -m "Primer commit: Mapa Tecnologico de Suba"

# Conecta con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TUUSUARIO/mapa-tecnologico-suba.git

# Sube el codigo
git push -u origin main
```

**Si estas usando GitHub Desktop:**
1. Abre GitHub Desktop.
2. Ve a File > Add local repository.
3. Selecciona la carpeta del proyecto.
4. Escribe un mensaje de commit y haz clic en "Commit to main".
5. Haz clic en "Publish repository".
6. Ingresa el nombre del repositorio y haz clic en "Publish Repository".

---

## Paso 2: Conectar a Vercel (Gratuito)

### 2.1 Crear cuenta en Vercel
1. Ve a [vercel.com](https://vercel.com).
2. Haz clic en **"Sign Up"** y registrate con tu cuenta de GitHub.
3. Autoriza a Vercel para acceder a tus repositorios de GitHub.

### 2.2 Importar el proyecto
1. En el dashboard de Vercel, haz clic en **"Add New..."** > **"Project"**.
2. Busca y selecciona el repositorio `mapa-tecnologico-suba`.
3. Vercel detectara automaticamente que es un proyecto Vite/React.

### 2.3 Configurar variables de entorno
1. En la pantalla de configuracion, expande la seccion **"Environment Variables"**.
2. Agrega las siguientes variables (las obtendras en los pasos 3 y 4):

| Nombre | Valor | Cuando obtener |
|--------|-------|----------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | `pk_test_...` | Paso 3 (Clerk) |
| `VITE_SUPABASE_URL` | `https://...` | Paso 4 (Supabase) |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | Paso 4 (Supabase) |

3. Haz clic en **"Deploy"**.
4. Espera unos minutos a que el despliegue termine.
5. Vercel te dara una URL (por ejemplo: `https://mapa-tecnologico-suba.vercel.app`).

**IMPORTANTE:** La primera vez que despliegues, la app funcionara pero no tendra autenticacion ni base de datos. Los pasos 3 y 4 son obligatorios.

---

## Paso 3: Configurar Clerk (Autenticacion)

### 3.1 Crear aplicacion en Clerk
1. Ve a [clerk.com](https://clerk.com) e inicia sesion.
2. Haz clic en **"Create Application"**.
3. Escribe un nombre: `Mapa Tecnologico Suba`.
4. Selecciona **"Next.js"** como framework (aunque usemos Vite, las credenciales funcionan igual).
5. Copia el **Publishable Key** (empieza con `pk_test_` o `pk_live_`).

### 3.2 Activar Restricted Mode (OBLIGATORIO)
1. En el dashboard de Clerk, ve a **"User & Authentication"** > **"Restrictions"**.
2. Activa **"Restrict mode"** (o "Restricted Mode").
3. Esto bloquea el registro publico. Solo los usuarios que tu autorices podran registrarse.

### 3.3 Configurar Allowlist (OBLIGATORIO)
1. Ve a **"User & Authentication"** > **"Restrictions"** > **"Allowlist"**.
2. Activa la opcion **"Allowlist"**.
3. Haz clic en **"Add email"**.
4. Ingresa **TU correo electronico personal** (el unico que tendra acceso).
5. Guarda los cambios.

### 3.4 Obtener las credenciales
1. Ve a la pagina principal de tu aplicacion en Clerk.
2. En **"API Keys"**, copia:
   - **Publishable Key**: `pk_test_...` (o `pk_live_...` para produccion)

### 3.5 Agregar variables en Vercel
1. Ve a tu proyecto en [vercel.com](https://vercel.com).
2. Ve a **"Settings"** > **"Environment Variables"**.
3. Agrega: `VITE_CLERK_PUBLISHABLE_KEY` = tu Publishable Key.
4. Haz clic en **"Save"**.
5. Ve a **"Deployments"** y haz clic en los tres puntos de la ultima version > **"Redeploy"**.

---

## Paso 4: Configurar Supabase (Base de Datos Gratuita)

### 4.1 Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com) e inicia sesion.
2. Haz clic en **"New Project"**.
3. Selecciona tu organizacion.
4. Configura:
   - **Name**: `mapa-tecnologico-suba`
   - **Database Password**: Crea una contrasena segura (guardala bien)
   - **Region**: Selecciona la mas cercana a Bogota (East US o similar)
5. Haz clic en **"Create new project"**.
6. Espera unos minutos a que se cree.

### 4.2 Crear la tabla pines_mapa
1. En el dashboard de Supabase, ve a **"SQL Editor"** (en el menu lateral).
2. Haz clic en **"New query"**.
3. Pega el siguiente codigo SQL:

```sql
-- Tabla para almacenar los pines interactivos
create table public.pines_mapa (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descripcion text,
  latitud float8 not null,
  longitud float8 not null,
  upz text not null,
  barrio text not null,
  direccion_referencia text,
  imagen_url text not null,
  imagen_descarga_url text not null,
  video_url text,
  creado_at timestamptz default now()
);

-- Habilitar Row Level Security (RLS)
alter table public.pines_mapa enable row level security;

-- Política de lectura libre para todo el público
create policy "Lectura pública de pines"
  on public.pines_mapa for select
  using (true);

-- Política de modificación exclusiva para usuarios autenticados
create policy "Modificación exclusiva para administrador"
  on public.pines_mapa for all
  to authenticated
  using (true)
  with check (true);
```

4. Haz clic en **"Run"** (boton verde).
5. Deberias ver un mensaje de exito.

### 4.3 Habilitar Realtime
1. Ve a **"Database"** > **"Replication"** (en el menu lateral).
2. En la seccion **"Realtime"**, haz clic en el toggle para habilitarlo si esta desactivado.
3. Ve a **"Database"** > **"Tables"**.
4. Busca la tabla `pines_mapa`.
5. Haz clic en el icono de **"Realtime"** al lado de la tabla para habilitarlo.

### 4.4 Obtener las credenciales de API
1. Ve a **"Project Settings"** (icono de engranaje) > **"API"**.
2. Copia los siguientes valores:
   - **URL**: `https://tu-proyecto.supabase.co`
   - **anon public**: `eyJ...` (esta es la `VITE_SUPABASE_ANON_KEY`)

### 4.5 Agregar variables en Vercel
1. Ve a tu proyecto en [vercel.com](https://vercel.com).
2. Ve a **"Settings"** > **"Environment Variables"**.
3. Agrega:
   - `VITE_SUPABASE_URL` = tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY` = tu anon key
4. Haz clic en **"Save"**.
5. Ve a **"Deployments"** y haz clic en **"Redeploy"** para aplicar los cambios.

---

## Paso 5: Verificar que todo funciona

### 5.1 Probar la aplicacion publica
1. Abre la URL de Vercel en tu navegador.
2. Deberias ver el mapa de Suba con los poligonos de UPZ en colores neon.
3. Intenta usar el buscador para buscar una UPZ como "Niza" o "Tibabuyes".
4. Si hay pines en la base de datos, deberias verlos en el mapa.

### 5.2 Probar el panel de administracion
1. Ve a `/admin` en tu aplicacion (ej: `https://mapa-tecnologico-suba.vercel.app/admin`).
2. Deberia redirigirte a la pagina de inicio de sesion de Clerk.
3. **IMPORTANTE**: Solo TU correo electronico (el que agregaste en el Allowlist) podra registrarse e iniciar sesion.
4. Despues de iniciar sesion, deberias ver el panel de administracion con el formulario.
5. Intenta agregar un pin haciendo clic en el mapa (captura coordenadas automaticamente).

### 5.3 Probar Realtime
1. Abre la aplicacion en dos navegadores diferentes (o una ventana normal y una incognito).
2. En el navegador donde estas logueado como admin, agrega un nuevo pin.
3. En el otro navegador (sin iniciar sesion), el pin deberia aparecer automaticamente en el mapa sin necesidad de recargar la pagina.

---

## Estructura de Archivos

```
src/
├── components/
│   ├── Buscador.tsx          # Buscador inteligente
│   ├── InfoCard.tsx           # Tarjeta holografica lateral
│   ├── LeyendaUPZ.tsx         # Leyenda de UPZ
│   ├── MapaSuba.tsx           # Componente principal del mapa (Leaflet)
│   └── Navbar.tsx             # Barra de navegacion
├── data/
│   └── upz-data.ts            # Datos de UPZ (coordenadas, colores, barrios)
├── hooks/
│   └── usePines.ts            # Hook para CRUD + realtime de pines
├── lib/
│   └── supabase.ts            # Cliente Supabase + operaciones CRUD
├── pages/
│   ├── Admin.tsx              # Panel de administracion
│   └── Home.tsx               # Pagina principal (mapa)
├── types/
│   └── index.ts               # Tipos TypeScript
├── App.tsx                    # Componente raiz con rutas
├── index.css                  # Estilos globales + tema cyberpunk
└── main.tsx                   # Punto de entrada
```

---

## Resolucion de Problemas Comunes

### Error: "No se pueden cargar los pines"
- Verifica que las variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` esten correctamente configuradas en Vercel.
- Verifica que la tabla `pines_mapa` exista en Supabase (SQL Editor).

### Error: "No puedo iniciar sesion en /admin"
- Verifica que `VITE_CLERK_PUBLISHABLE_KEY` este configurada.
- Verifica que el Restricted Mode y Allowlist esten activados en Clerk.
- Verifica que tu correo este en el Allowlist.

### Los cambios no se reflejan en tiempo real
- Verifica que Realtime este habilitado en Supabase (Database > Replication).
- Verifica que la tabla `pines_mapa` tenga el realtime habilitado.

### Error de CORS
- En Supabase, ve a **"Project Settings"** > **"API"** > **"CORS"**.
- Agrega la URL de tu aplicacion en Vercel.
