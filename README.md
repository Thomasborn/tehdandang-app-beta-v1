## Dandang apps

-   ver 0.0.0: mobile-support only

### dev env

-   windows 11
-   visual studio code: 1.84.2
-   google chrome: 119.0.6045.200
-   json-server: 0.17.4
-   github

### dev dependencies

-   vite: 5.0.0
-   vitejs/plugin-vue: 4.5.0
-   sass: 1.69.5

### dependencies

-   vue: 3.3.8
-   vue-router: 4.2.5
-   pinia: 2.1.7
-   primeicons: 6.0.1

### dev and run project locally

1. clone from git using this code:

```
git clone https://github.com/gede-wahyu/dandang-apps.git
```

2. head to the repos

```
cd dandang-apps
```

3. install all dependencies on code editor terminal:

```
npm install
```

4. to start local server run this on terminal:

```
npm run dev
```

or

```
npx vite
```

### expose network and preview on other devices

> [!NOTE]
> make sure all devices needed connected to the same wifi

1. start the local server

```
npm run host
```

or

```
npx vite --host
```

2. visit the link that appear in terminal on other devices

> [!TIP]
> if not working, visit this [link](https://www.youtube.com/watch?v=uRYHX4EwYYA) for tutorial
