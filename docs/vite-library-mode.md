# Create Design System Library using Vite Library Mode

React 애플리케이션에서 사용 가능한 디자인 시스템 라이브러리를 만들어보자

## 1. Create new Vite project

```bash
mkdir design-system
cd design-system
pnpm init   # Create package.json
pnpm i -D vite
```

프로젝트 루트에 `vite.config.ts` 파일을 추가한다.

```ts
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({})
```


## 2. Setup TypeScript

```bash
pnpm i -D typescript
pnpm tsc --init # Create tsconfig.json
```

다음과 같이 `tsconfig.json` 파일을 구성합니다.
```json
{
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"],
  "compilerOptions": {
    "lib": ["DOM", "DOM.Iterable", "ESNext"],   /* 프로젝트에 포함할 라이브러리 타입 선언 파일을 선택할 수 있다. */
    "skipLibCheck": true,                       /* 선언 파일의 타입 검사를 하지 않는다. */
    "isolatedModules": true,                    /* 각 파일이 다른 파일의 정보에 의존하지 않고, 독립적으로 트랜스파일될 수 있도록 보장한다. */             
    "moduleDetection": "force",                 /* 프로젝트의 함수와 변수의 범위를 결정한다. force 옵션은 import와 export 구문 존재 여부 상관없이 모든 TS 파일을 스크립트가 아닌 모듈로 처리한다. */
    "esModuleInterop": true,                    /* CommonJS와 ESModule 간의 호환성을 높인다. CommonJS 모듈을 ESModule에서 쉽게 가져올 수 있도록 컴파일 시 JS 코드를 추가한다. */
    "allowImportingTsExtensions": true,         /* import 문에서 타입스크립트 파일 확장자를 포함할 수 있다. */
    "jsx": "react-jsx",                         /* JSX 구문을 처리하는 방법을 지정한다. 타입스크립트는 JSX 구문의 트랜스파일링을 기본적으로 지원한다. */
    "moduleResolution": "Bundler",              /* 각 import가 어떤 모듈을 가리키는지 해석하는 방법을 지정한다. 번들러가 처리하는 방식과 유사한 방식으로 모듈을 해석하도록 설정한다. */
    "resolveJsonModule": true,                  /* JSON 파일을 TS 프로젝트로 가져올 수 있다. */
    "module": "ESNext",                         /* 트랜스파일 수행 시 사용할 모듈 시스템을 지정한다. */
    "target": "ESNext",                         /* JS 코드를 생성할 때 타겟팅하는 ECMAScript 버전을 지정한다. */
    "strict": true,                             /* 엄격한 타입 검사를 활성화한다. */                          
    "noEmit": true,                             /* JS 파일을 생성하지 말라고 지시한다. 만약 외부 도구를 사용해 트랜스파일한다면 이 옵션을 활성화해 tsc를 트랜스파일러가 아닌 린터로 활용할 수 있다. */
    /* Path alias */
    "paths": { 
      "~/*": ["./src/*"]
    }
  }
}
```

### skipLibCheck

- 선언 파일의 타입 검사를 하지 않는다.
- 프로젝트에 포함되는 선언 파일의 수가 많을 때 이 설정을 추가하면 컴파일 속도를 높일 수 있다. 타사 라이브러리의 선언 파일 타입 오류로 인해 프로젝트가 컴파일되지 않은 상황을 피할 수 있다.
- 한계: 본인이 작성한 선언 파일에 대한 타입 검사도 하지 않기 때문에 선언 파일을 작성할 때 실수를 하면 이를 감지할 수 없다.

### isolatedModules

- 각 파일이 다른 파일의 정보에 의존하지 않고, 독립적으로 트랜스파일될 수 있도록 보장한다.
- `tsc` CLI를 활용해 JS 코드를 생성할 수 있지만, `esbuild`, `babel`, `swc`와 같은 도구를 이용해 트랜스파일을 수행할 수 있다.
    - 하지만 이들은 각 파일을 독립적으로 JS 코드로 변환하기 때문에 전체 타입 시스템을 이해하는데 의존하는 코드 변환에 적용할 수 없다.
    - 이러한 제약사항으로 인해 `const enums`와 네임스페이스와 같은 일부 타입스크립트 기능에서 런타임 문제가 발생할 수 있다.
- `isolatedModules` 옵션을 설정하면 단일 파일 변환 프로세스로 변환할 수 없는 TypeScript 기능을 사용할 경우 경고가 표시된다.


### jsx

- `preserve`: JSX 구문을 그대로 유지한다.
- `react`: JSX를 `React.createElement` 호출로 변환한다. React 16 이전 버전에 유용하다.
- `react-jsx`: JSX를 `_jsx` 호출로 변환하고, `react/jsx-runtime`에서 자동으로 가져온다. React 17 이상 버전에 유용하다.


## 3. Setup React and Vanilla Extract

```bash
pnpm i --save-peer react react-dom # add packages to peer dependencies and install them as dev dependencies
pnpm i -D @types/react @types/react-dom
pnpm i -D @vanilla-extract/css
```

`peerDependencies` 란 패키지가 의존하지만, 최종 사용자가 직접 설치해야 하는 의존성을 말한다. JavaScript 패키지에서 특정 라이브러리나 프레임워크와 함께 동작해야 하는 경우 이를 명시적으로 지정하기 위해 사용된다. 동일한 라이브러리나 프레임워크가 여러 버전으로 중복 설치되는 것을 방지한다.

## 4. Basic Build Setup

### Add Plugins

```bash
pnpm i -D @vitejs/plugin-react @vanilla-extract/vite-plugin vite-plugin-dts vite-tsconfig-paths
```

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    tsconfigPaths(),
    dts({ include: ['src'] }),
  ],
})
```

- [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts): 타입 선언 파일을 생성한다.
- [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths): Vite가 path alias를 해석할 수 있도록 한다.


### Setup build option 

> 참고: https://ko.vite.dev/guide/build#library-mode

Vite의 Library mode를 활용해 빌드 옵션을 구성한다.
- `build.lib` 옵션을 사용해 엔트리 파일과 파일 이름 및 형식을 지정한다.
- `build.rollupOptions.external` 옵션을 사용해 라이브러리에 번들링하고 싶지 않은 종속성을 외부화한다.


```ts
export default defineConfig({
  // ...
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    }
  }
})
```

## Import and Split up CSS

### Import CSS file

[vite-plugin-lib-inject-css](https://github.com/emosheeep/vite-plugin-lib-inject-css) 플러그인을 사용해 번들 JS 파일 상단에 CSS 파일 임포트문을 추가한다.

```bash
pnpm i -D vite-plugin-lib-inject-css
```

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    // ...
    libInjectCss(),
  ],
})
```

### Split up CSS

라이브러리에서 무언가를 import할 때 모든 스타일이 담긴 CSS 파일이 번들에 포함된다.

`libInjectCSS` 플러그인은 각 청크에 대해 별도의 CSS 파일을 생성하고 각 청크의 출력 파일 시작 부분에 가져오기 문을 포함한다. 따라서 JavaScript 코드를 분리하면 해당 JavaScript 파일을 가져올 때만 필요한 별도의 CSS 파일이 생긴다. (CSS Code Spliting)

모든 파일을 rollup 진입 지점으로 번환해보자.

> 참고: https://rollupjs.org/configuration-options/#input


```bash
pnpm i -D glob
```

```ts
export default defineConfig({
  // ...
  build: {
    // ...
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob
          .sync('src/**/*.{ts,tsx,css}', {
            ignore: ['src/**/*.d.ts'],
          })
          .map((file) => [
            // 1. The name of the entry point
            relative('src', file.slice(0, file.length - extname(file).length)),
            // 2. The absolute path to the entry file
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].[format].js',
      },
    },
  },
});
```


## Update package.json to publish the package

- `type` 필드는 모듈 시스템을 결정한다. `commonjs` (기본값) 혹은 `module`로 지정할 수 있다.
- `main` 필드와 `exports` 필드를 사용해 패키지의 진입점을 설정한다. `exports` 필드는 `main` 필드와 다르게 여러 개의 진입점을 설정할 수 있다.
- `module` 필드는 `main` 필드와 유사한 목적으로 사용된다. ES6과 호환되는 환경에서 패키지를 사용할 때 진입 되는 경로이다. 
- `types` 필드를 사용해 타입 선언 파일 경로를 지정한다.
- `files` 필드는 패키지가 설치될 때 포함될 항목을 가리킨다.
- `sideEffects` 필드는 특정 파일이나 모듈이 부수 효과(side effect)가 있는지 여부를 명시하는 데 사용된다. 주로 트리 쉐이킹 최적화를 위해 사용되며, 번들러가 부수 효과가 없는 코드를 안전하게 제거하도록 돕는 설정이다.
  - 부수 효과란, 프로그램에서 함수나 표현식이 반환값 외에 외부/전역 상태를 변경하거나 영향을 미치는 것을 말한다. 예를 들어, 모듈 내에서 전역 변수를 수정한다면 부수효과가 있다고 본다.
  - `false`: 패키지 내의 모든 파일이 부수 효과가 없음을 나타낸다. 즉, 가져오지 않은 코드라면 안전하게 제거할 수 있다.
  - 파일 배열: 특정 파일이나 패턴만 부수 효과가 있음을 지정할 수 있다. 나머지 파일은 부수 효과가 없다고 간주되기 때문에 해당 파일에 대해서는 트리 쉐이킹이 적용된다.
  - 트리 쉐이킹으로 인해 CSS 파일이 실수로 제거되는 것을 방지하기 위해 이 필드에 모든 CSS 파일을 지정한다.

```json
{
  "name": "design-system",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js"
    },
    "./theme.css": "./dist/assets/theme.css.ts.css",
    "./reset.css": "./dist/assets/styles/reset.css"
  },
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
}
```
